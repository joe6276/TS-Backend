"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurations = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// connect to db
exports.configurations = {
    server: process.env.Server,
    user: process.env.User,
    database: process.env.Database,
    password: process.env.Password,
    options: {
        encrypt: false,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
mssql_1.default.connect(exports.configurations).then(pool => {
    if (pool.connecting) {
        console.log('connecting to the database');
    }
    if (pool.connected) {
        console.log("connected");
    }
}).catch(e => console.log(e));
exports.default = exports.configurations;
