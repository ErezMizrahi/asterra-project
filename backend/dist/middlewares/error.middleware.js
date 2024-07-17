"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHanlder = void 0;
const custom_error_1 = require("../errors/custom.error");
const errorHanlder = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        res.status(err.statusCode).json({ errors: err.serialzeErrors() });
        return;
    }
    console.error(err);
    res.status(400).json({ errors: [{ message: err.message }] });
};
exports.errorHanlder = errorHanlder;
