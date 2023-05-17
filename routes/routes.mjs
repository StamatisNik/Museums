import  express  from "express";
import { insertDataIntoTable } from "../model/model.mjs";
const router=express.Router();

router.get("/login", (req, res) => {
  res.render('partials/login', {
    style:"loginstyles.css",
  });
  });
  
  router.get("/register", (req, res) => {
   
    res.render('register', {
      style:"registerstyles.css",
      script:"registerscript.js",
    });
  });

 

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

  
  


  router.get("/card-info", (req, res) => {
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
  });

export {router};