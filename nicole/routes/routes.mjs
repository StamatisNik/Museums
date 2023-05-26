import  express  from "express";
import * as db_model from "../model/model.mjs";
import multer from "multer"
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

const lay2 = "main2.hbs";
const lay3 = "main3.hbs";
const lay4 = "main4.hbs"
const lay5="main5.hbs"; 
const lay6="main6.hbs";


router.post("/register", async (req, res)=>
{
  const RegisterData = req.body;
  const firstname = RegisterData.firstname ;
  const lastname = RegisterData.lastname ;
  const email = RegisterData.email ;
  const confEmail = RegisterData.confEmail ;
  const password = RegisterData.password ;
  const date = RegisterData.dob ;
  
  
    await db_model.UserValidationRegister(firstname,lastname,email,confEmail, password,date,req,res);
  
})


router.get("/register", async (req, res)=>
{
  
  const firstname = req.session.firstname;
  const lastname = req.session.lastname;
  const email = req.session.email;
  const confEmail = req.session.confirmEmail;
  const date = req.session.dateOfBirth;
  const error = req.query.error;
  console.log(firstname);

  res.render("register", {
    layout:lay2,
    style: "/public/css/registerstyles.css",
    script: "/public/js/registerscript.js",
    error: error,
    errorMessage: "Email already exists,please try a new one!",
    firstname: firstname,
    lastname: lastname,
    email: email,
    emailconf: confEmail,
    dob: date,
  });
  
})



router.post("/login", async (req, res) => {
  const loginData = req.body;
  const email = loginData.email;
  const password = loginData.password;
  console.log(email);
  console.log(password);
  
  await db_model.UserValidationLogin(email, password, req, res);
});




router.get("/login", async (req, res) => {

  const logInEmail=req.session.email
  const passwordError = req.query.password;
  const emailError=req.query.email;
  
  res.render('login', {
    style: "/public/css/loginstyles.css",
    layout: lay2, 
    email:logInEmail,
    passwordError:passwordError,
    emailError:emailError,
    errorEmail:"Email is invalid or it dosen't exists!",
    errorPassword:"Password is invalid"
    
  });
})


router.post('/tickets', async (req, res) => {
    const formData = req.body;
    const Ticket = formData.Ticket;
    const email=req.session.email;
    console.log(email);
    await db_model.insertDataIntoTable(Ticket);
    const ExhibitionObj=await db_model.getExhibitions(Ticket);
  
    await db_model.update(email,ExhibitionObj.name,ExhibitionObj.price);
    console.log('Data inserted successfully.');

   res.redirect("/user-info");
 
});


router.get("/tickets", isAuth, (req, res) =>{
  
  res.render("ticketsandprices",{
      title:"Tickets and Prices",
      layout:lay3,
      header: "partials/header",
      style: "public/css/Tickets-and-Prices-Styles.css",
      link1:"/",
      link2:"/whatson",
      link3:"/explore",
      name1:"Home",
      name2:"What's on",
      name3:"Explore",
      footer: "partials/tapfooter",
      script:"public/js/tickets-and-prices-script.js",
      userLoggedIn:req.session.isAuth})
});

router.post("/user-info", async (req,res)=>
{
  console.log("it is",req.session.firstname)
  const userInfo=req.body;
  const date=userInfo.date;
  const time=userInfo.time;
  const country=userInfo.country;
  const ticketType=userInfo.ticketType;
  const email=req.session.email;
  const firstname=req.session.firstname
  const lastname=req.session.lastname
  console.log(userInfo);
  await db_model.insertUserData(firstname,lastname,date,time,country,ticketType,email);
  res.redirect("/card-info");
})


router.get("/user-info" ,isAuth,(req,res)=>
{
  res.render('ticketform', {
    layout:lay5,
    style: "/public/css/ticket-form-style.css",
    script: "/public/js/ticket-form-script.js"
   
  });
})
  

  router.get("/card-info",isAuth, (req, res) => {
    res.render("cardinfo", {
      title:"card-info",
      layout: lay6,
      style:"public/css/card-info-styles.css",
      script: "public/js/card-info-script.js",  
    })
  });
  

  
  router.get("/", (req,res)=>{
  
    res.render("home",{
      title:"Museum Official Website",
      header: "partials/header",
      style:"public/css/stylehome.css",
      link1:"/tickets",
      link2:"/whatson",
      link3:"/explore",
      name1:"Book a Ticket",
      name2:"What's on",
      name3:"Explore",
      footer: "partials/footer",
      script:"public/js/scripthome.js",
      username:req.session.firstname,
      userLoggedIn:req.session.isAuth
    });
     

  
 
});
  
  router.get("/whatson" , (req, res) =>{
      res.render("whatson",{
          title:"What's on",
          //lay1,
          header:"partials/header",
          style:"public/css/stylewhatson.css",
          link1:"/",
          link2:"/tickets",
          link3:"/explore",
          name1:"Home",
          name2:"Book a Ticket",
          name3:"Explore",
          footer: "partials/footer",
          script:"public/js/scriptfooter.js",
          userLoggedIn:req.session.isAuth});
  });
  
  
  router.get("/explore" , (req, res) =>{
      res.render("explore",{
          title:"Explore",
         // lay1,
          header: "partials/header",
          style:"public/css/styleexplore.css",
          link1:"/",
          link2:"/tickets",
          link3:"/whatson",
          name1:"Home",
          name2:"Book a Ticket",
          name3:"What's on",
          footer:"partials/footer",
          script:"public/js/scriptfooter.js",
          userLoggedIn:req.session.isAuth});
  });
  


  router.post("/profile", async (req,res)=>
  {
    const profileData=req.body
    const email=profileData.email
    const emailToChange=req.session.email

    await db_model.UpdateProfile(emailToChange,email)

  })
  
  
  
  router.get("/profile",isAuth,(req,res) =>{
    res.render("profile",{
      title:"profile", 
      layout: lay2, 
      header:"partials/profileheader",
      footer: "partials/footerempty",
      style:"public/css/profile.css",
      script:"public/js/scriptprofile.js",
      email: req.session.email,
      //username: req.session.firstname,
     // userlastname: req.session.lastname,
      userLoggedIn:req.session.isAuth

    });
  });
  
  
  
  router.get("/passwordsettings",isAuth,(req,res) =>{
    res.render("changepassword",{
      title:"change password", 
      layout: lay2, 
      header:"partials/profileheader",
      footer: "partials/footerempty",
      style:"public/css/changepassword.css",
      script:"public/js/changepassword.js",
    });
  });
  
  

  router.post("/logout" ,(req,res)=>
{
  req.session.destroy((err)=>
  {
    if (err) throw err;
    res.redirect("/")
  })
})
  

export {router};