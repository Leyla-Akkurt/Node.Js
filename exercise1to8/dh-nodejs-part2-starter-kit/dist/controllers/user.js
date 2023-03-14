var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "./../db.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = db.one(`SELECT * FROM users WHERE username=$1`, username);
    if (user && user.password === password) {
        const { SECRET = " " } = process.env;
        const payload = {
            id: user.id,
            username
        };
        const token = jwt.sign(payload, SECRET);
        yield db.one(`UPDATE user SET token=$2 WHERE id=$1`, [user.id, token]);
        res.status(200).json({ id: user.id, username, token });
    }
    else
        res.status(400).json({ msj: " username or password is incorrect" });
});
export { logIn };
