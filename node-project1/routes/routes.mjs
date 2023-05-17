import  express from "express"

const router = express.Router();


router.get("/", (req,res)=>{
    res.render("partials/home",{       
    });
});

router.get("/whatson" , (req, res) =>{
    res.render("partials/whatson",{
        header: "partials/headerwhatson",
        footer: "partials/footer"});
});


router.get("/explore" , (req, res) =>{
    res.render("partials/explore",{
        header: "partials/headerexplore",
        footer: "partials/footer"});
});


router.get("/profile" , (req, res) =>{
    res.send("profile");
});

export {router}; 