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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserHobbies = exports.deleteUser = exports.createUser = exports.getUserByPhoneNumber = exports.getUsers = exports.getAll = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_service_1.default.getAllUsers();
    res.status(200).json(allUsers);
});
exports.getAll = getAll;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.default.getAllUsers();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserByPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.params.phone;
    const user = yield user_service_1.default.getUserByPhoneNumber(phone);
    res.status(200).json({ message: user });
});
exports.getUserByPhoneNumber = getUserByPhoneNumber;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const newUser = yield user_service_1.default.addUser(user);
    res.status(200).json({ message: newUser });
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    yield user_service_1.default.deleteUserById(userId);
    res.status(200).end();
});
exports.deleteUser = deleteUser;
const addUserHobbies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hobbies = req.body;
    const userHobbies = yield user_service_1.default.addHobbiesToUser(hobbies);
    res.status(200).json(userHobbies);
});
exports.addUserHobbies = addUserHobbies;
