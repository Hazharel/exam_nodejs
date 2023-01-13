import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const {APP_SECRET} = process.env;

const hashPass = (req, res, next) => {
    const { password } = req.body;
    const sha256Hasher = crypto.createHmac("sha256", APP_SECRET);
    const hash = sha256Hasher.update(password).digest("hex");
    req.password = hash;

    next();
};

export default  hashPass;