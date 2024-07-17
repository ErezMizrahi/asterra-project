"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
exports.usersRouter = router;
router.get('/', users_controller_1.getAll);
router.get('/:phone', users_controller_1.getUserByPhoneNumber);
router.post('/create', [
    (0, express_validator_1.body)('firstName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage("first name is invalid"),
    (0, express_validator_1.body)('lastName')
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage("last name is invalid"),
    (0, express_validator_1.body)('address')
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage("address is invalid"),
    (0, express_validator_1.body)('phone')
        .isMobilePhone('he-IL')
        .withMessage("phone is invalid"),
], users_controller_1.createUser);
router.delete('/delete/:userId', users_controller_1.deleteUser);
router.post('/hobby', [
    (0, express_validator_1.body)('userId')
        .trim()
        .notEmpty()
        .isFloat()
        .withMessage("userId is invalid"),
    (0, express_validator_1.body)('hobby')
        .trim()
        .notEmpty()
        .withMessage("hobby is invalid"),
], users_controller_1.addUserHobbies);
