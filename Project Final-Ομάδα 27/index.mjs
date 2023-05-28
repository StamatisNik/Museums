//starting file 
//import modules 
import express from "express";
import { engine } from "express-handlebars";
import { router } from "./routes/routes.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import dotenv from 'dotenv';
dotenv.config();

//make dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//start express
const app = express();
//body parsers to read data from forms or JSON files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files(css,js,images)
app.use("/public",express.static(path.join(__dirname, '/public')));

//storing sessions in database,using MySQLStore
const MySQLStore = MySQLStoreFactory(session);
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'museum_database',
  createDatabaseTable: true,
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
}

});
//initialising session information and cookie parameters 
app.use(session({
  //store sensitive info in .env file for gitignore
  key:process.env.KEY,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    //cookie max age and expiration date
    originalMaxAge: 86400000, 
    expires: new Date(Date.now() + 86400000), 
    httpOnly: true
  }
}));


//start template engine
app.engine("hbs",engine({extname: ".hbs"}));
app.set("view engine","hbs");

//main route
app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port',process.env.PORT || 3000);
});