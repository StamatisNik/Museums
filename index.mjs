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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/public",express.static(path.join(__dirname, '/public')))
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

app.use(session({
  key:process.env.KEY,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    originalMaxAge: 86400000, 
    expires: new Date(Date.now() + 86400000), 
    httpOnly: true,
  }
}));

console.log(process.env.KEY);
sessionStore.onReady().then(() => {
	console.log('MySQLStore ready');
}).catch(error => {
	console.error(error);
});
  


app.engine("hbs",engine({extname: ".hbs"}));
app.set("view engine","hbs");


app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port',process.env.PORT || 3000);
});