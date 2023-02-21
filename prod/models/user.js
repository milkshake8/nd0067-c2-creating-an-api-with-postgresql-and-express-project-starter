"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
//Import environment variables for hashing & salting
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
class UserStore {
    async index() {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`Unable to get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `SELECT * FROM users WHERE id=${id}`;
            const conn = await database_1.client.connect();
            const results = await conn.query(sql);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to get user:${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            //Hashing the given password for more secure
            const password_digest = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const sql = 'INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const sql_check = `SELECT * FROM users WHERE firstname='${u.firstname}'`;
            const conn = await database_1.client.connect();
            //check if a user with this firstname already exist
            const result_check = await conn.query(sql_check);
            if (!result_check.rows[0]) {
                const results = await conn.query(sql, [
                    u.firstname,
                    u.lastname,
                    password_digest
                ]);
                conn.release();
                return results.rows[0];
            }
            else {
                console.log('a user with this firstname already exists');
                return null;
            }
        }
        catch (err) {
            throw new Error(`Could not create user: ${u.firstname}. Error: ${err}`);
        }
    }
    async update(new_lastname, id) {
        try {
            const sql = `UPDATE users SET lastname='${new_lastname}' WHERE id=${id};`;
            const conn = await database_1.client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to update the lastname of the user: ${id}. Error: ${err}`);
        }
    }
    async authenticate(firstname, password) {
        try {
            const conn = await database_1.client.connect();
            const sql = `SELECT * FROM users WHERE firstname='${firstname}'`;
            //@ts-ignore
            const result = await conn.query(sql);
            console.log(password + pepper);
            if (result.rows) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not find user: ${firstname} with password: ${password}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
