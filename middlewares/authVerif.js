import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {APP_SECRET} = process.env;

export default function authVerif(req, res, next){
    if (!req.session.token) {
        return res.status(403).json({
          message: 'Connection et token requis'
        });
    }
    
    try {
        const verifToken = jsonwebtoken.verify(req.session.token, APP_SECRET);
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}