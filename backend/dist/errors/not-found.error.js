"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom.error");
class NotFoundError extends custom_error_1.CustomError {
    constructor() {
        super('Route Not Found');
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialzeErrors() {
        return [{ message: 'Route Not Found' }];
    }
}
exports.NotFoundError = NotFoundError;
