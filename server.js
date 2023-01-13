import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import mongoose from"mongoose";
import MongoStore from "connect-mongo";
import route from "./routes/router.js";
import flash from "connect-flash";

mongoose.connect('mongodb://localhost:27017/students', {useNewUrlParser: true, useUnifiedTopology: true }).then(init);

dotenv.config();

const { APP_HOSTNAME, APP_PORT, NODE_ENV, APP_SECRET} = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "pug");

app.locals.pretty = (NODE_ENV !== 'production');

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  name: "loginPage",
  secret: APP_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/students'}),     cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.flash_message = req.flash("success_message");
  res.locals.message = [];
  next();
})
app.use("/", route);

async function init (){
  app.listen(APP_PORT, () => {
  });
}
