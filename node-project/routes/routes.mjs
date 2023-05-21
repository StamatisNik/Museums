import  express from "express"

const router = express.Router();
//const lay1 = "main.hbs";
const lay2 = "main2.hbs";
const lay3 = "main3.hbs";
const lay4 = "main4.hbs" 

router.get("/", (req,res)=>{
    res.render("home",{
        title:"Museum Official Website",
        //lay1, 
        header: "partials/header",
        csslink:"public/css/stylehome.css",
        link1:"/TicketsandPrices",
        link2:"/whatson",
        link3:"/explore",
        name1:"Book a Ticket",
        name2:"What's on",
        name3:"Explore",
        footer: "partials/footer",
        jslink:"public/js/scripthome.js"});
});

router.get("/whatson" , (req, res) =>{
    res.render("whatson",{
        title:"What's on",
        //lay1,
        header:"partials/header",
        csslink:"public/css/stylewhatson.css",
        link1:"/",
        link2:"/TicketsandPrices",
        link3:"/explore",
        name1:"Home",
        name2:"Book a Ticket",
        name3:"Explore",
        footer: "partials/footer",
        jslink:"public/js/scriptfooter.js"});
});


router.get("/explore" , (req, res) =>{
    res.render("explore",{
        title:"Explore",
       // lay1,
        header: "partials/header",
        csslink:"public/css/styleexplore.css",
        link1:"/",
        link2:"/TicketsandPrices",
        link3:"/whatson",
        name1:"Home",
        name2:"Book a Ticket",
        name3:"What's on",
        footer:"partials/footer",
        jslink:"public/js/scriptfooter.js"});
});

router.get("/TicketsandPrices", (req, res) =>{
  res.render("ticketsandprices",{
      title:"Tickets and Prices",
      layout:lay3,
      header: "partials/header",
      csslink: "public/css/Tickets-and-Prices-Styles.css",
      link1:"/",
      link2:"/whatson",
      link3:"/explore",
      name1:"Home",
      name2:"What's on",
      name3:"Explore",
      footer: "partials/tapfooter",
      jslink:"public/js/tickets-and-prices-script.js"});
});


router.get("/profile",(req,res) =>{
  res.render("profile",{
    title:"profile", 
    layout: lay2, 
    header:"partials/profileheader",
    footer: "partials/footerempty",
    csslink:"public/css/profile.css",
    jslink:"public/js/scriptprofile.js"
  });
});


router.get("/card-info", (req, res) => {
  res.render("card-info", {
    title:"card-info",
    layout: lay4,
    header: "partials/headertickets",
    footer: "partials/tapfooter",
    csslink:"public/css/card-info-styles.css",
    jslink: "public/js/card-info-script.js",  
  });
});


router.get("/register",(req,res) =>{
  res.render("register",{
    title:"Sign Up", 
    layout: lay2, 
    header:"partials/profileheader",
    footer: "partials/footerempty",
    csslink:"public/css/register.css",
    jslink:"public/js/register.js"
  });
});

/*
router.get("login", (req, res) => {
    res.render("login", {
        title:"login",
        layout: lay2,
        header: "partials/header",
        footer: "partials/footer",
        style:"loginstyles.css",
    });
    });
    
/*
router.get("/register", (req, res) => {

    res.render('register', {
          style:"registerstyles.css",
          script:"registerscript.js",
  
        });
    });
  
    

/*
router.post('/user-info', (req, res) => {
    const formData = req.body;
    const Ticket = formData.Ticket;
  
    insertDataIntoTable(Ticket, (error, results) => {
      if (error) {
        // Handle the error...
        console.error(error);
        return;
      }
  
      // Handle the successful insertion...
      console.log(results);
  
      res.render('ticketform', {
        style: "ticket-form-style.css",
        script: "ticket-form-script.js"
      });
    });
  });
*/
  


export {router}; 
