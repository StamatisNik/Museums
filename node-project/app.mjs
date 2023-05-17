import  express  from "express";
import  {engine} from "express-handlebars";
import  {router}  from "./routes/routes.mjs";

const app = express();

app.use("/public",express.static("public"))
app.use(express.urlencoded({extended: false}))

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')

app.use("/", router)

app.listen(3000);
