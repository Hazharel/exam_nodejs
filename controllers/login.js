import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"

dotenv.config();

const {APP_SECRET} = process.env;

export function loginPage(req, res) {
  res.render("login");
}

export async function login (req, res){
  const user = await UserModel.find({ mail: req.body.mail }, { password: 1 });
  if(user[0].password === req.password){
    const token = jsonwebtoken.sign(
      {mail: req.body.mail, role: 'user' },
      APP_SECRET,
      { expiresIn: '24h' }
    );
    req.session.token = token;

    req.flash('flash_message', 'identification ok');
    res.redirect('/dashboard');
  } else {
    req.flash('flash_message', 'identification ratée');
    res.redirect('/');
  }
}