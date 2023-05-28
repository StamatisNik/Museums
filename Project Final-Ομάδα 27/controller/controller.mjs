//controller: using the data from database to display it to the screen when user interacts with the website.
//import modules and functions from model
//using session storage and handlebars to manipulate the website 
import moment from "moment";
import * as db_model from "../model/model.mjs";

//declare layouts
const lay2 = "main2.hbs";
const lay3 = "main3.hbs";
const lay5="main5.hbs"; 
const lay6="main6.hbs";

//handle post requests in register route 
async function PostRegister(req,res){
    const RegisterData = req.body;
  const firstname = RegisterData.firstname ;
  const lastname = RegisterData.lastname ;
  const email = RegisterData.email ;
  const confEmail = RegisterData.confEmail ;
  const password = RegisterData.password ;
  const date = RegisterData.dob ;
  await db_model.UserValidationRegister(firstname,lastname,email,confEmail, password,date,req,res);

}


//handle get requests in register route 
async function getRegister(req,res){

    const firstname = req.session.firstname;
  const lastname = req.session.lastname;
  const email = req.session.email;
  const confEmail = req.session.confirmEmail;
  const date = req.session.dateOfBirth;
  const error = req.query.error;


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

}
//handle post requests in login route 
async function postLogin(req,res)
{
    const loginData = req.body;
    const email = loginData.email;
    const password = loginData.password;
    console.log(email);
    console.log(password);
    
    await db_model.UserValidationLogin(email, password, req, res);

}

//handle get requests in login route
async function getLogin(req,res)
{
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
}

//handle post requests in tickets route 
async function postTickets(req,res)
{
    const formData = req.body;
    const Ticket = formData.Ticket;
    const email=req.session.email;
    const firstname=req.session.firstname;
    const lastname=req.session.lastname;
    req.session.ticket=Ticket;
    const ExhibitionObj=await db_model.getExhibitions(Ticket);
    await db_model.InsertExhibitionAndPrice(email,ExhibitionObj.name,ExhibitionObj.price);
    await db_model.insertBookingData(firstname,lastname,Ticket,email);
    console.log('Data inserted successfully.');

   res.redirect("/user-info");
}


//handle get requests in tickets route 
async function getTickets(req,res)
{
    
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
    userLoggedIn:req.session.isAuth,
    username:req.session.firstname})
}
//handle post requests in userinfo route 
async function postUserInfo(req,res)
{
    const userInfo=req.body;
    const date=userInfo.date;
    const time=userInfo.time;
    const country=userInfo.country;
    const ticketType=userInfo.ticketType;
    const email=req.session.email;
    req.session.date=date;
    req.session.time=time;
    const ExhibitionObj=await db_model.getExhibitions(req.session.ticket);
    const count=await db_model.insertUserDataInTickets(date,time,country,ticketType,email,ExhibitionObj.price,req,res);
      res.redirect("/card-info");
    

}
//handle get requests in userinfo route 
async function getUserInfo(req,res)
{
    res.render('ticketform', {
        layout:lay5,
        style: "/public/css/ticket-form-style.css",
        script: "/public/js/ticket-form-script.js"
       
      });
}

//handle get requests in cardinfo  route 
async function getCardInfo(req,res)
{
    res.render("cardinfo", {
        title:"card-info",
        layout: lay6,
        style:"/public/css/card-info-styles.css",
        script:"/public/js/card-info-script.js",  
      })
}
//handle post requests in cardinfo route 
async function postCardInfo(req,res)
{
    const email=req.session.email;
    const CardInfo=req.body;
    const card_no=CardInfo.cardNo;
    const expDate=CardInfo.expDate;
    const formattedDate = moment(expDate, 'MM/YY').format('YYYY/MM/DD');
    const cvv=CardInfo.cvv;
    const cardholderName=CardInfo.cardholderName;
    await db_model.insertCardInfo(card_no,cardholderName,cvv,formattedDate,email);
    res.redirect("/tickets");
}

//handle get requests in / route 
async function getHome(req,res)
{
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
}
//handle get requests in whatson route 
async function getWhatsOn(req,res)
{
    res.render("whatson",{
        title:"What's on",
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
        username:req.session.firstname,
        userLoggedIn:req.session.isAuth});
}

//handle get requests in explore route
async function getExplore(req,res)
{
    res.render("explore",{
        title:"Explore",
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
        userLoggedIn:req.session.isAuth,
        username:req.session.firstname});
}
//handle post requests in profile route 
async function postProfile(req,res)
{
    const profileData=req.body;
    const email=profileData.email;
    const firstname=profileData.firstname;
    const lastname=profileData.lastname;
    const emailToChange=req.session.email;
    
    await db_model.UpdateProfile(email,firstname,lastname,emailToChange,req,res)
    console.log('Data updated successfully.');
}

//handle get requests in tickets route 
async function getProfile(req,res)
{
  const error = req.query.error;
  const success = req.query.success;

  res.render("profile",{

    title:"profile", 
    layout: lay2, 
    header:"partials/profileheader",
    footer:"partials/footerempty",
    style:"public/css/profile.css",
    script:"public/js/scriptprofile.js",
    error:error,
    errorMessage: "Email already exists,please try a new one!",
    success:success,
    successMessage: "Data updated successfully!",
    email: req.session.email,
    username: req.session.firstname,
    userlastname: req.session.lastname,
    userLoggedIn:req.session.isAuth
   
  });
     
    
}

//handle get requests in passwordsettings route 
async function getPasswordSettings(req,res)
{
    const error = req.query.error;
    const same_password = req.query.same_password;
    const success=req.query.success;
    res.render("changepassword",{
      title:"change password", 
      layout: lay2, 
      header:"partials/profileheader",
      footer: "partials/footerempty",
      style:"public/css/changepassword.css",
      script:"public/js/changepassword.js",
      success:success,
      succesMessage:"Password changed successfully!",
      error:error,
      errorMessage: "Invalid current password!",
      same_password:same_password, 
      errorMessage2: "New password can't be the same with the Old Password!"
    });
}

//handle post requests in passwordsettings route 
async function postPasswordSettings(req,res)
{
    const passwordData=req.body;
    const currentPassword=passwordData.currentpassword;
    const password=passwordData.password;
    const emailToChange=req.session.email;
    await db_model.UpdatePassword(currentPassword,password,emailToChange,req,res);
}

//user logout, destroy cookie and remove session from database
async function logout(req,res)
{
    const sessionId = req.session.id;
    console.log(sessionId);
  
    req.session.destroy(async (err) => {
      if (err) throw err;
      
      await db_model.deleteSession(sessionId);
  
      res.redirect("/");
    });
}







export{PostRegister,getRegister,postLogin,getLogin,postTickets,
    getTickets,postUserInfo,getUserInfo,getCardInfo,postCardInfo,getHome,getWhatsOn,
    getExplore,postProfile,getProfile,getPasswordSettings,postPasswordSettings,logout}