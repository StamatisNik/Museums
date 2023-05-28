//import modules and functions from controller
import  express  from "express";
import * as controller from"../controller/controller.mjs"

const router=express.Router();

//middleware to protect the routes that user needs authentication 
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


//routes and asynchronous controller function

router.post("/register", async (req, res)=>
{
  await controller.PostRegister(req,res);
  
})


router.get("/register", async (req, res)=>
{
  
  await controller.getRegister(req,res)
  
})



router.post("/login", async (req, res) => {
 await controller.postLogin(req,res)
});




router.get("/login", async (req, res) => {

 await controller.getLogin(req,res)
})


router.post('/tickets', isAuth, async (req, res) => {
   await controller.postTickets(req,res);
 
});



router.get("/tickets", isAuth, async (req, res) =>{

  await controller.getTickets(req,res);
  
});


router.post("/user-info",isAuth, async (req,res)=>
{
 await controller.postUserInfo(req,res)
  
})


router.get("/user-info" ,isAuth,async(req,res)=>
{
  
 await controller.getUserInfo(req,res)
})
  

  router.get("/card-info",isAuth, async (req, res) => {

    await controller.getCardInfo(req,res)
  
  });


  router.post("/card-info",isAuth, async(req,res)=>
  {
    await controller.postCardInfo(req,res);


  })
  
  

  
  router.get("/",async (req,res)=>{
  
    await controller.getHome(req,res)
     
 
});
  
  router.get("/whatson" ,async (req, res) =>{
     await controller.getWhatsOn(req,res)
  });
  
  
  router.get("/explore" , async (req, res) =>{
     await controller.getExplore(req,res)
  });
  
 

  router.post("/profile",isAuth, async(req,res) =>{
   await controller.postProfile(req,res);
    
  });
  
  
  router.get("/profile",isAuth, async (req,res) =>{
   await controller.getProfile(req,res);
  });
  
  
  
  router.get("/passwordsettings",isAuth, async(req,res) =>{
    await controller.getPasswordSettings(req,res);
  });

  router.post("/passwordsettings",isAuth,async (req,res) =>{
   await controller.postPasswordSettings(req,res);
   
  });
  

  router.post("/logout",isAuth, async (req, res) => {
   await controller.logout(req,res);
  });
  
  
//export router
export {router};