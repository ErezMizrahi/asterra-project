import { Request, Response } from "express";
import userService from "../services/user.service";
import { User } from "../types/user";
import { Hobbies } from "../types/hobbies";

export const getAll = async (req: Request, res: Response) => {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
}

export const getUserByPhoneNumber = async (req: Request, res: Response) => {
    const phone = req.params.phone;
    const user = await userService.getUserByPhoneNumber(phone);
    res.status(200).json({message: user});
}
export const createUser = async (req: Request, res: Response) => {
    const user: User = req.body;
    const newUser = await userService.addUser(user);
    res.status(200).json({message: newUser});
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    await userService.deleteUserById(userId);
    res.status(200).end();

}

export const addUserHobbies = async (req: Request, res: Response) => {
    const hobbies: Hobbies = req.body;
    const userHobbies = await userService.addHobbiesToUser(hobbies);
    res.status(200).json({message: userHobbies});

}