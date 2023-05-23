import  express  from "express";
import * as db_model from "../model/model.mjs";
const router=express.Router();



const isAuth=(req,res,next)=>
{
  if(req.session.isAuth)
  {
    next()
  }
  else
  {
    res.redirect("/login");
  }
}

router.get('/tickets', isAuth, async (req, res) => {
  res.render('ticketsandprices', {
    style: "Tickets-and-Prices-Styles.css",
    script:"tickets-and-prices-script.js"
    
  });
   
  
  
  
});

/*
router.post('/user-info', async (req, res) => {
  try {
    const formData = req.body;
    const Ticket = formData.Ticket;

    await db_model.insertDataIntoTable(Ticket);

    console.log('Data inserted successfully.');

    res.render('ticketform', {
      style: "ticket-form-style.css",
      script: "ticket-form-script.js"
    });
  } catch (error) {

    console.error(error);
   
  }
});
*/

router.post("/login", async (req, res) => {
  const LoginData = req.body;
    const email =LoginData.email;
    const password=LoginData.password;
    console.log(email);
    console.log(password);
    await db_model.UserValidationLogin(email,password,req,res);
 
  
});


router.get("/login", async (req, res) => {
  const SignInData = req.session.SignInData;
  const logInEmail=SignInData ? SignInData.email : "";
  const passwordError = req.query.password;
  const emailError=req.query.email;
  res.render('login', {
    style: "loginstyles.css",
    email:logInEmail,
    passwordError:passwordError,
    emailError:emailError,
    errorEmail:"Email is invalid or it dosen't exists!",
    errorPassword:"Password is invalid"
    
  });
})

  router.post("/register", async (req, res)=>
{
  const RegisterData = req.body;
  const firstname = RegisterData.firstname ;
  const lastname = RegisterData.lastname ;
  const email = RegisterData.email ;
  const confEmail = RegisterData.confEmail ;
  const password = RegisterData.password ;
  const passConf = RegisterData.passwordConfirm 
  const date = RegisterData.dob ;
  
  
    await db_model.UserValidationRegister(firstname,lastname,email,confEmail, password,passConf,date,req,res);
  
  
})


router.get("/register", async (req, res)=>
{
  const registrationData = req.session.registrationData;
  const firstname = registrationData ? registrationData.firstname : "";
  const lastname = registrationData ? registrationData.lastname : "";
  const email = registrationData ? registrationData.email : "";
  const confEmail = registrationData ? registrationData.confirmEmail : "";
  const date = registrationData ? registrationData.dateOfBirth : "";
  const error = req.query.error;
  

  res.render("register", {
    style: "registerstyles.css",
    script: "registerscript.js",
    error: error,
    errorMessage: "Email already exists,please try a new one!",
    firstname: firstname,
    lastname: lastname,
    email: email,
    emailconf: confEmail,
    dob: date,
  });
  
})
router.post("/logout" ,(req,res)=>
{
  req.session.destroy((err)=>
  {
    if (err) throw err;
    res.redirect("/")
  })
})



  

  /*router.get("/card-info", (req, res) => {
    res.render('partials/cardinfo', {
      style:"card-info-styles.css",
      script:"card-info-script.js",  
    });
  });
  
  router.get("/whatson", (req, res) => {
    res.render('partials/ticketform', {
      
    });
  });

  router.get("/explore", (req, res) => {
    res.send("card");
  });*/

export {router};