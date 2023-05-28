
//model manipulation and extraction of database information
//import modules
import mysql from "mysql2"
import bcrypt from "bcrypt";
import crypto from "crypto";
//Start connection with database
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'museum_database'});
  
      connection.connect(function(err) {
        if (err) {
          console.error('Error connecting to MySQL server: ' + err.message);
          return;
        }
        console.log('Connected to MySQL server.');
      });
      

    
    
      //insert card data in database
      async function insertCardInfo(cardNumber,CardholderName,cvv,expiration,email) {
        try {
          //encrypt sensitive information
          const encryptedCard=cardEncryptionData(cardNumber);
          const encryptedCardholderName=cardEncryptionData(CardholderName);
          const encryptedCvv=cardEncryptionData(cvv);
          const cardExists=await checkCardExists(encryptedCard);
          //if card number  exists update it  
          if (cardExists[0].length > 0) {
            const visitorCardUpdate = "UPDATE visitor SET card_no = ? WHERE email = ?";
            const result2 = await connection.promise().query(visitorCardUpdate, [encryptedCard, email]);
    
            const TicketCardUpdate = "UPDATE ticket SET card_no_book = ? WHERE book_email = ?";
            const result3 = await connection.promise().query(TicketCardUpdate, [encryptedCard, email]);

          }
          //if card number dosen't exist insert card information
          else{
            const cardInfoSql = "INSERT INTO payment (card_no, cardholder_name, cvv, end_date) VALUES (?, ?, ?, ?)";
            const result1 = await connection.promise().query(cardInfoSql, [encryptedCard,encryptedCardholderName,encryptedCvv,expiration]);
            //insert card data to other tables that need it 
          const visitorCardUpdate = "UPDATE visitor SET card_no = ? WHERE email = ?";
          const result2 = await connection.promise().query(visitorCardUpdate, [encryptedCard, email]);
  
          const TicketCardUpdate = "UPDATE ticket SET card_no_book = ? WHERE book_email = ?";
          const result3 = await connection.promise().query(TicketCardUpdate, [encryptedCard, email]);

          }

        } catch (error) {
          throw error;
        }
       
      }

   
        

      

      //insert booking data
      async function insertBookingData(firstname,lastname,ticketType,email) {
        try {
          const sql = 'INSERT INTO ticket(book_firstname,book_lastname,ticket_type,book_email) VALUES (?,?,?,?)';
          const result = await connection.promise().query(sql, [firstname,lastname,ticketType,email]);
        
         
        } catch (error) {
          throw error;
        }
       
      }
      
      //get exhibitions from database
      async function getExhibitions(ticket) {
        try {
          const sql = 'SELECT * FROM exhibition';
          const result = await connection.promise().query(sql);
          if(ticket==="Early Access Ticket")
          {
            console.log(result[0][0]);
            return {
              name: result[0][0].name,
              price: result[0][0].exhibition_price
            };
  
          }

          if(ticket==="Turn The lights On")
          {
            console.log(result[0][1]);
            return {
              name: result[0][1].name,
              price: result[0][1].exhibition_price
            };
          }

          if(ticket==="Skip-The-Ticket-Line-Tour")
          {
            console.log(result[0][2]);
            return {
              name: result[0][2].name,
              price: result[0][2].exhibition_price
            };
          }

          if(ticket==="Standard Ticket")
          {
            console.log(result[0][3]);
            return {
              name: result[0][3].name,
              price: result[0][3].exhibition_price
            };
          }
          
         
        } catch (error) {
          throw error;
        }
       
      }



      //check if email exists in the database
     async function checkemailExists(email) {
      try
      {
        const sql = 'SELECT email FROM visitor WHERE email = ?';
        const result=await connection.promise().query(sql, [email]);
        return result;
      } catch (error) {
        throw error;
      }
     }

     //check if card exists in the database
     async function checkCardExists(cardNo) {
      try
      {
        const sql = 'SELECT card_no FROM payment WHERE card_no = ?';
        const result=await connection.promise().query(sql, [cardNo]);
        return result;
      } catch (error) {
        throw error;
      }
     }

     //retreive password from database 
     async function retreivePassword(email) {
      try
      {
        const sql = 'SELECT visitor_password FROM visitor WHERE email = ?';
        const result=await connection.promise().query(sql, [email]);
        return result;
      } catch (error) {
        throw error;
      }
     }
  
    //validate register form and insert registration data in the database
     async function UserValidationRegister(firstname,lastname,email,confirmEmail,password,dateOfBirth, req, res) {
      
        let emailExists = await checkemailExists(email);

        //if email exists redirect to /register with url query  and display the error in the screen 
        if (emailExists[0].length > 0) {
          //store data in session storage
            req.session.firstname=firstname,
            req.session.lastname=lastname,
            req.session.email=email,
            req.session.confirmEmail=confirmEmail,
            req.session.dateOfBirth=dateOfBirth
          
          
          return res.redirect("/register?error=true");
        
        }
        try{
          //encrypt sesitive password data and insert info in database 
          const hash = await bcrypt.hash(password, 10);
          const sql_ticket = "INSERT INTO visitor(email,firstname,lastname,visitor_password,date_of_birth) VALUES (?,?,?,?,?)";
          const result_tick = await connection.promise().query(sql_ticket, [email,firstname,lastname,hash,dateOfBirth]);
          //store data in session storage
          res.redirect("/login");

        }
       catch (error) {
        throw error
      }
     }


     //exctract data from the database(firstname and lastname)
     async function getData(email) {
      try {
        const getUsername = "SELECT firstname,lastname FROM visitor WHERE email = ?";
        const result1 = await connection.promise().query(getUsername, [email]);
        console.log();
       return {
       firstname: result1[0][0].firstname,
       lastname: result1[0][0].lastname
       }
      } catch (error) {
        throw error;
      }
    }
  
  
    //validate login information and insert it in the database 
     async function UserValidationLogin(email, password, req, res) {
      let emailExists = await checkemailExists(email);
      const userPassword = await retreivePassword(email);
       //if email exists redirect to /login with url query  and display the error in the screen 
      if (!emailExists[0].length) {
        req.session.email = email
        
        return res.redirect("/login?email=invalid");
      }
     
      
      //if this password dont exist in the database redirect to /login with url query  and display the error in the screen 
      if (!userPassword[0][0].visitor_password) {
        req.session.email = email
        
      
        return res.redirect("/login?password=invalid");
      }

      const hashedPassword=userPassword[0][0].visitor_password;
      try {
        // if  the login password and the password in the database are the same start session and authenticate user 
        //else  redirect to /login with url query  and display the error in the screen
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch);
        if (!isMatch) {
          req.session.email = email
           return res.redirect("/login?password=invalid");
        }
        const data= await getData(email);
        req.session.firstname=data.firstname;
        req.session.lastname= data.lastname;
        req.session.email=email
          req.session.isAuth=true;
          return res.redirect("/tickets");
        }  
        catch (error) {
        throw error;
      }
    }


    //insert data in ticket table
    async function insertUserDataInTickets(date,time,country,ticketType,email,price,req,res) {
      try {
        //check if booking data is empty 
        const check ="SELECT COUNT(*) AS total FROM ticket WHERE book_time IS NULL";
        const getcount=await connection.promise().query(check);
        //if booking data is empty just update the existing  user in tickets else insert new ticket 
        if(getcount[0][0].total)
        {
          if(ticketType==="Adult Ticket")
          {
            const updateTicket="UPDATE ticket SET book_date=?,book_time=?,country=?,ticket_discount=?,price=? WHERE book_email = ? AND book_time IS NULL";
            const upd=await connection.promise().query(updateTicket,[date,time,country,ticketType,price,email]);
            return upd;
          }
          else if(ticketType==="Student Ticket")
          {
            const updateTicket="UPDATE ticket SET book_date=?,book_time=?,country=?,ticket_discount=?,price=?  WHERE book_email = ? AND book_time IS NULL";
            const upd=await connection.promise().query(updateTicket,[date,time,country,ticketType,(price-0.5*price),email]);
            return upd;
          }
          else if(ticketType==="Under 15")
          {
            const updateTicket="UPDATE ticket SET book_date=?,book_time=?,country=?,ticket_discount=?,price=?  WHERE book_email = ? AND book_time IS NULL";
            const upd=await connection.promise().query(updateTicket,[date,time,country,ticketType,(price-0.4*price),email]);
            return upd;
          }
          
        }
        else{
          if(ticketType==="Adult Ticket")
          {
            const getBookInfo = "SELECT book_firstname, book_lastname, ticket_type, price, book_email FROM ticket WHERE book_email=?";
            const bookData = await connection.promise().query(getBookInfo, [email]);
            
            const insertNewTicketSql="INSERT INTO ticket(book_firstname, book_lastname, ticket_type,book_time,book_date,country,ticket_discount,price, book_email) VALUES(?,?,?,?,?,?,?,?,?)"
            const insertNewTicket = await connection.promise().query(insertNewTicketSql, [bookData[0][0].book_firstname,
            bookData[0][0].book_lastname,req.session.ticket,time,date,country,ticketType,price,email]);
            return bookData
          }
          else if(ticketType==="Student Ticket")
          {
            
            const getBookInfo = "SELECT book_firstname, book_lastname, ticket_type, price, book_email FROM ticket WHERE book_email=?";
            const bookData = await connection.promise().query(getBookInfo, [email]);
            const insertNewTicketSql="INSERT INTO ticket(book_firstname, book_lastname, ticket_type,book_time,book_date,country,ticket_discount,price, book_email) VALUES(?,?,?,?,?,?,?,?,?)"
            const insertNewTicket = await connection.promise().query(insertNewTicketSql, [bookData[0][0].book_firstname,
            bookData[0][0].book_lastname,req.session.ticket,time,date,country,ticketType, (price-0.5*price),email]);
            return bookData
          }
          else if(ticketType==="Under 15")
          {
            
            const getBookInfo = "SELECT book_firstname, book_lastname, ticket_type, price, book_email FROM ticket WHERE book_email=?";
            const bookData = await connection.promise().query(getBookInfo, [email]);
            const insertNewTicketSql="INSERT INTO ticket(book_firstname, book_lastname, ticket_type,book_time,book_date,country,ticket_discount,price, book_email) VALUES(?,?,?,?,?,?,?,?,?)"
            const insertNewTicket = await connection.promise().query(insertNewTicketSql, [bookData[0][0].book_firstname,
            bookData[0][0].book_lastname,req.session.ticket,time,date,country,ticketType, (price-0.4*price),email]);
            return bookData
          }
         

        }
       
       
      } catch (error) {
        throw error;
      }
     
    }

    //insert exhibition name and price to tables visitor and ticket
    async function InsertExhibitionAndPrice(email, exhibitName,price) {
      try {
        const visitorExhibitionUpdate = "UPDATE visitor SET exhibit_name = ? WHERE email = ?";
        const result1 = await connection.promise().query(visitorExhibitionUpdate, [exhibitName, email]);
       
        const ticketPriceUpdate = "UPDATE ticket SET price = ? WHERE book_email = ?";
        const result2 = await connection.promise().query(ticketPriceUpdate, [price, email]);
      } catch (error) {
        throw error;
      }
    }

    //update profile information
    async function UpdatePassword(currentPassword, password, emailToChange, req, res) {
      
      console.log(currentPassword);
      const userPassword = await retreivePassword(emailToChange);
      const passwordsMatch = await bcrypt.compare(currentPassword, userPassword[0][0].visitor_password);
      //if passwords dont match redirect to /passwordsettings with url query  and display the error in the screen
      if (!passwordsMatch) {
        return res.redirect("/passwordsettings?error=true");
      }
      //if current password is equal to new password redirect
      //to /passwordsettings with url query  and display the error in the screen
      if (currentPassword === password) {
        return res.redirect("/passwordsettings?same_password=true");
      }
      //else hash the new password and update the database  using the session storage email
      try {
        const newHashedPassword = await bcrypt.hash(password, 10);
        const updatePass = 'UPDATE visitor SET visitor_password=? WHERE email = ?';
        const result = await connection.promise().query(updatePass, [newHashedPassword, emailToChange]);
        return res.redirect("/passwordsettings?success=true");
      } catch (error) {
        throw error;
      }
    }
    
  


//edit profile data 
async function UpdateProfile(email, firstname, lastname, emailToChange, req, res) {
  let emailExists = await checkemailExists(email);
  
  if (emailExists[0].length > 0 && email !== emailToChange) {
    return res.redirect("/profile?error=true");
  }

  try {
    const update_prof = "UPDATE visitor SET email=?, firstname=?, lastname=? WHERE email=?";
    const result_tick = await connection.promise().query(update_prof, [email, firstname, lastname, emailToChange]);

    req.session.email = email;
    req.session.firstname = firstname;
    req.session.lastname = lastname;
    console.log(req.session.email);
    
    return res.redirect("/profile?success=true");
  } catch (error) {
    throw error;
  }
}
    
    



  //delete session when the user logouts
   async function deleteSession(sessionID) {
    try {
      const deleteSess = 'DELETE FROM sessions WHERE session_id = ?';
      const result = await connection.promise().query(deleteSess, [sessionID]);
      return result;
    } catch (error) {
      throw error;
    }
   
  }
    //function to encrypt the sensitive card information using AES-256-CBC encryption
    function  cardEncryptionData(data)
   {
    //store sensitive data in enviromental variables
    const secretKey=process.env.ENCRYPTION_KEY;
    const secretIv=process.env.SECRET_IV;
    const encryptionMethod="AES-256-CBC";
    const key = crypto.createHash("sha512").update(secretKey, "utf-8").digest("hex").slice(0, 32);
    const iv = crypto.createHash("sha512").update(secretIv, "utf-8").digest("hex").slice(0, 16);
    const encryptor=crypto.createCipheriv(encryptionMethod,key,iv);
    const aes_encrypted=encryptor.update(data,"utf8","base64")+encryptor.final("base64");
    return Buffer.from(aes_encrypted).toString("base64");

   }
   //delete tickets in database when times passes 20:00
   async function deleteTickets() {
    const currentHour = new Date().getHours();
    if (currentHour >= 20) {
      try {
        const deleteQuery = "DELETE FROM ticket";
        const result = await connection.promise().query(deleteQuery);
        return result;
      } catch (error) {
        throw error;
      }
    }
  
   
  }



 
 
await deleteTickets();

    
//export functions
export {UserValidationRegister,UserValidationLogin,
  insertUserDataInTickets,getExhibitions,InsertExhibitionAndPrice,UpdateProfile,insertCardInfo,
  insertBookingData,deleteSession,UpdatePassword};
