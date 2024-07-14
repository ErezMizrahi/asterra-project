import { Router } from "express";
import { body } from "express-validator";
import { addUserHobbies, createUser, deleteUser, getAll, getUserByPhoneNumber } from "../controllers/users.controller";

const router = Router();

router.get('/', getAll);
router.get('/:phone', getUserByPhoneNumber);
router.post('/create',
[
    body('firstName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min: 2})
        .withMessage("first name is invalid"),
    body('lastName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min: 2})
        .withMessage("last name is invalid"),
    body('address')
        .trim()
        .notEmpty()
        .isString()
        .isLength({min: 2})
        .withMessage("address is invalid"),
    body('phone')
        .isMobilePhone('he-IL')
        .withMessage("phone is invalid"),
    
], createUser);

router.delete('/delete/:userId', deleteUser);

router.post('/hobbies',
    [
        body('userId')
            .trim()
            .notEmpty()
            .isFloat()
            .withMessage("userId is invalid"),
        body('hobbies')
            .isArray()
            .withMessage("hobbies is invalid"),
    ], addUserHobbies);

export { router as usersRouter };