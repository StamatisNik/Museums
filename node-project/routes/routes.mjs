import  express from "express"

const router = express.Router();

router.get("/", (req,res)=>{
    res.render("partials/home",{
       layout:"mainhome.hbs",
       header: "partials/headerhome",
       footer: "partials/footer"});
})

router.get("/whatson" , (req, res) =>{
    res.render("partials/whatson",{
        layout :"mainwhatson.hbs",
        header: "partials/headerwhatson",
        footer: "partials/footer"});
});


router.get("/explore" , (req, res) =>{
    res.render("partials/explore",{
        layout :"mainexplore.hbs",
        header: "partials/headerexplore",
        footer: "partials/footer"});
});


router.get("/profile" , (req, res) =>{
    res.send("profile");
});

export {router}; 