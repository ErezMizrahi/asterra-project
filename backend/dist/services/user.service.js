"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = require("../errors/bad-request.error");
const pg_repo_1 = require("../repository/pg.repo");
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pg_repo_1.pgRepository.pool.query('SELECT * FROM "EREZ_MIZRAHI"."USERS" as us left join "EREZ_MIZRAHI"."HOBBIES" as hb on us.id = hb.USER_ID;');
            return result.rows.map(row => ({
                id: row.id,
                firstName: row.first_name,
                lastName: row.last_name,
                address: row.address,
                phoneNumber: row.phone_number,
                hobbies: row.hobby
            }));
        });
    }
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "EREZ_MIZRAHI"."USERS" WHERE PHONE_NUMBER = $1;`;
            const result = yield pg_repo_1.pgRepository.pool.query(query, [phoneNumber]);
            return result.rows[0];
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exisitingUser = yield this.getUserByPhoneNumber(user.phoneNumber);
            if (exisitingUser)
                throw new bad_request_error_1.BadRequestError(`user already exists with phone number ${user.phoneNumber}`);
            const insertUserQuery = `
        INSERT INTO "EREZ_MIZRAHI"."USERS" (FIRST_NAME, LAST_NAME, ADDRESS, PHONE_NUMBER)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;
            const { firstName, lastName, address, phoneNumber } = user;
            const values = [firstName, lastName, address, phoneNumber];
            const result = yield pg_repo_1.pgRepository.pool.query(insertUserQuery, values);
            if (result.rows.length < 1)
                throw new bad_request_error_1.BadRequestError('cant add user');
            console.log('User added:', result.rows[0]);
            return result.rows[0];
        });
    }
    deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userHobbies = yield this.getUserHobbies(userId);
            if (userHobbies) {
                const deleteHobbiesQuery = `DELETE FROM "EREZ_MIZRAHI"."HOBBIES" WHERE USER_ID = $1;`;
                yield pg_repo_1.pgRepository.pool.query(deleteHobbiesQuery, [userId]);
                console.log(`Deleted hobbies for user with ID ${userId}`);
            }
            const deleteQuery = `
        DELETE FROM "EREZ_MIZRAHI"."USERS" WHERE ID = $1;`;
            try {
                yield pg_repo_1.pgRepository.pool.query(deleteQuery, [userId]);
                console.log('User deleted:', userId);
                return;
            }
            catch (err) {
                console.error('Error deleting user', userId, err);
                throw err;
            }
        });
    }
    getUserHobbies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM "EREZ_MIZRAHI"."HOBBIES" WHERE USER_ID = $1;`;
            const result = yield pg_repo_1.pgRepository.pool.query(query, [userId]);
            return result.rows[0];
        });
    }
    addHobbiesToUser(hobbies) {
        return __awaiter(this, void 0, void 0, function* () {
            const userHobbies = yield this.getUserHobbies(hobbies.userId);
            let query = '';
            let values = [];
            if (!userHobbies) {
                //insert
                query = `
                INSERT INTO "EREZ_MIZRAHI"."HOBBIES" (USER_ID, HOBBY)
                VALUES ($1, $2)
                RETURNING *;
                `;
                values = [hobbies.userId, hobbies.hobby];
            }
            else {
                //update
                query = `
                UPDATE "EREZ_MIZRAHI"."HOBBIES" SET HOBBY = $1 WHERE USER_ID = $2
                RETURNING *;
                `;
                values = [[userHobbies.hobby, hobbies.hobby].join(', '), hobbies.userId];
            }
            const result = yield pg_repo_1.pgRepository.pool.query(query, values);
            if (result.rows.length < 1)
                throw new bad_request_error_1.BadRequestError('cant add user hobbies');
            console.log('User hobbies added:', result.rows[0]);
            return result.rows[0];
        });
    }
}
const userService = new UserService();
exports.default = userService;
