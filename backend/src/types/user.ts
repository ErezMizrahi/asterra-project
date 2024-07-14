import { Hobbies } from "./hobbies";

export interface User {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    hobbies?: Hobbies;
}