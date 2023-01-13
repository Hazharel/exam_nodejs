import express from "express";
import hashPass from "../middlewares/hashPass.js"
import userExists from "../utils/userExists.js"
import UserModel from "../Models/user.model.js"
import signInController from "../controllers/signIn.js";
import {loginPage, login} from "../controllers/login.js";
import authVerif from "../middlewares/authVerif.js"
import dashboardController from "../controllers/dashboard.js"

const router = express.Router();

router.get("/", loginPage);
router.get("/signIn", signInController);
router.get('/dashboard', authVerif, dashboardController);
router.post("/login", hashPass, login);
router.post("/signIn", hashPass, async(req, res) => {   
    const { firstName, lastName, mail } = req.body;
    try {
        const user = await userExists(mail);
        if (user)
            res.redirect('/signIn');
        else
        {    await UserModel.create({
                firstName,
                lastName,
                password: req.password,
                mail
            });
            delete req.password;
            res.redirect(`/`);
        }
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
    }
})

export default router;
