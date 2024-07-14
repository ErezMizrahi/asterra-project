import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
import { pool } from "../repository/db.connection";
import { Hobbies } from "../types/hobbies";
import { User } from "../types/user";

class UserService {

    async getUserByPhoneNumber(phoneNumber: string) {
        const query = `SELECT * FROM "EREZ_MIZRAHI"."USERS" WHERE PHONE_NUMBER = $1;`
        const result = await pool.query(query, [phoneNumber]);
        return result.rows[0];
    }

    async addUser(user: User) {
        const exisitingUser = await this.getUserByPhoneNumber(user.phoneNumber);
        if(exisitingUser) throw new BadRequestError(`user already exists with phone number ${user.phoneNumber}`);

        const insertUserQuery = `
        INSERT INTO "EREZ_MIZRAHI"."USERS" (FIRST_NAME, LAST_NAME, ADDRESS, PHONE_NUMBER)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;
        const {firstName, lastName, address, phoneNumber} = user;
        const values = [firstName, lastName, address, phoneNumber];

        const result = await pool.query(insertUserQuery, values);
        if(result.rows.length < 1) throw new BadRequestError('cant add user');
        console.log('User added:', result.rows[0]);
        return result.rows[0];
    }

    async deleteUserById(userId: string) {
        const userHobbies = await this.getUserHobbies(userId);
        if(userHobbies) {
            const deleteHobbiesQuery = `DELETE FROM "EREZ_MIZRAHI"."HOBBIES" WHERE USER_ID = $1;`
            await pool.query(deleteHobbiesQuery, [userId]);
            console.log(`Deleted hobbies for user with ID ${userId}`);
        }
        const deleteQuery = `
        DELETE FROM "EREZ_MIZRAHI"."USERS" WHERE ID = $1;`
        try {
            await pool.query(deleteQuery, [userId]);
            console.log('User deleted:', userId);
            return;
        } catch (err) {
            console.error('Error deleting user', userId, err);
            throw err;
        }
    }

    async getUserHobbies(userId: string) {
        const query = `SELECT * FROM "EREZ_MIZRAHI"."HOBBIES" WHERE USER_ID = $1;`
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    }

    async addHobbiesToUser(hobbies: Hobbies) {
        const userHobbies = await this.getUserHobbies(hobbies.userId);
        let query = '';
        let values = [];

        if(!userHobbies) {
            //insert
            query = `
                INSERT INTO "EREZ_MIZRAHI"."HOBBIES" (USER_ID, HOBBY)
                VALUES ($1, $2)
                RETURNING *;
                `;
                values = [hobbies.userId, hobbies.hobbies];
        } else {
            //update
            query = `
                UPDATE "EREZ_MIZRAHI"."HOBBIES" SET HOBBY = $1 WHERE USER_ID = $2
                RETURNING *;
                `;
                values = [hobbies.hobbies, hobbies.userId];

        }

        const result = await pool.query(query, values);
        if(result.rows.length < 1) throw new BadRequestError('cant add user hobbies');
        console.log('User hobbies added:', result.rows[0]);
        return result.rows[0];
    }
}

const userService = new UserService();
export default userService;