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
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
const pg_repo_1 = require("./repository/pg.repo");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('starting up');
    try {
        if (!process.env.PG_USER)
            throw new Error('PG_USER must be defiend');
        if (!process.env.PG_HOST)
            throw new Error('PG_HOST must be defiend');
        if (!process.env.PG_DATABASE)
            throw new Error('PG_DATABASE must be defiend');
        if (!process.env.PG_PASSWORD)
            throw new Error('PG_PASSWORD must be defiend');
        yield pg_repo_1.pgRepository.connect();
        app_1.app.listen(4000, () => {
            console.log('listening on port 4000');
        });
    }
    catch (e) {
        console.error(e);
    }
});
start();
