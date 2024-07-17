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
exports.pgRepository = void 0;
const pg_1 = require("pg");
class PGRepository {
    get pool() {
        if (!this._pool)
            throw new Error('Cannot access pg pool before connecting!');
        return this._pool;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this._pool = new pg_1.Pool({
                user: process.env.PG_USER,
                host: process.env.PG_HOST,
                database: process.env.PG_DATABASE,
                password: process.env.PG_PASSWORD,
                port: 5432,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            try {
                const client = yield this._pool.connect();
                client.release();
            }
            catch (err) {
                console.error('Error connecting to the database', err);
                throw err;
            }
        });
    }
}
exports.pgRepository = new PGRepository();
