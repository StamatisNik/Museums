import  express from "express"

const router = express.Router();

router.get("/", (req,res)=>{
    res.render("partials/home",{
        title:"Museum Official Website",
        header: "partials/header",
        csslink:"public/css/stylehome.css",
        link1:"/",
        link2:"/whatson",
        link3:"/explore",
        name1:"Book a Ticket",
        name2:"What's on",
        name3:"Explore",
        footer: "partials/footer",
        jslink:"public/js/scripthome.js"});
});

router.get("/whatson" , (req, res) =>{
    res.render("partials/whatson",{
        title:"What's on",
        header: "partials/header",
        csslink:"public/css/stylewhatson.css",
        link1:"/",
        link2:"/",
        link3:"/explore",
        name1:"Home",
        name2:"Book a Ticket",
        name3:"Explore",
        footer: "partials/footer",
        jslink:"public/js/scriptfooter.js"});
});


router.get("/explore" , (req, res) =>{
    res.render("partials/explore",{
        title:"Explore",
        header: "partials/header",
        csslink:"public/css/styleexplore.css",
        link1:"/",
        link2:"/",
        link3:"/explore",
        name1:"Home",
        name2:"Book a Ticket",
        name3:"What's on",
        footer: "partials/footer",
        jslink:"public/js/scriptfooter.js"});
});


router.get("/profile" , (req, res) =>{
    res.send("profile");
});

export {router}; 