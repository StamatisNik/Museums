import mysql from "mysql2"
import bcrypt from "bcrypt";
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
    

      
      async function insertDataIntoTable(values) {
        try {
          const sql = 'INSERT INTO ticket(ticket_type) VALUES (?)';
          const result = await connection.promise().query(sql, values);
          return result;
        } catch (error) {
          throw error;
        }
       
      }

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




     async function checkEmailExists(email) {
      try
      {
        const sql = 'SELECT email FROM visitor WHERE email = ?';
        const result=await connection.promise().query(sql, [email]);
        return result;
      } catch (error) {
        throw error;
      }
     }


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
  
      
     async function UserValidationRegister(firstname,lastname,email,confirmEmail,password,dateOfBirth, req, res) {
      
        let exists = await checkEmailExists(email);
        console.log(exists[0]);
    
        if (exists[0].length > 0) {
          
            req.session.firstname=firstname,
            req.session.lastname-lastname,
            req.session.email=email,
            req.session.confirmEmail=confirmEmail,
            req.session.dateOfBirth=dateOfBirth

          
          return res.redirect("/register?error=true");
        
        }
        try{
          const hash = await bcrypt.hash(password, 10);
          const sql_ticket = "INSERT INTO visitor(email,firstname,lastname,visitor_password,date_of_birth) VALUES (?,?,?,?,?)";
          const result_tick = await connection.promise().query(sql_ticket, [email,firstname,lastname,hash,dateOfBirth]);
       
          res.redirect("/login");

        }
       catch (error) {
        throw error
      }
     }

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
  
  

     async function UserValidationLogin(email, password, req, res) {
      let exists = await checkEmailExists(email);
      const userPassword = await retreivePassword(email);
     
      if (!exists[0].length) {
        req.session.email = email
        
        return res.redirect("/login?email=invalid");
      }
     
      

      if (!userPassword[0][0].visitor_password) {
        req.session.email = email
        
      
        return res.redirect("/login?password=invalid");
      }

      const hashedPassword=userPassword[0][0].visitor_password;
      try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch);
        if (!isMatch) {
          req.session.email = email
           return res.redirect("/login?password=invalid");
        }
        req.session.email = email;
          const data=await getData(email);
          const firstname=data.firstname
          const lastname=data.lastname
          req.session.firstname=firstname
          req.session.lastname=lastname
          req.session.isAuth=true;
          return res.redirect("/tickets");
        }  
        catch (error) {
        throw error;
      }
    }



    async function insertUserData(firstname,lastname,date,time,country,ticketType,email) {
      try {
        const sql = 'INSERT INTO ticket(book_date,book_time,country,ticket_discount) VALUES (?,?,?,?)';
        const result = await connection.promise().query(sql, [firstname,lastname,date,time,country,ticketType,email]);
        return result;
      } catch (error) {
        throw error;
      }
     
    }

   
  
      
    async function ticketQuantityCheck(firstname,lastname,date,time,country,ticketType,email)
    {
      try {
        const sql = 'INSERT INTO ticket(firstname,lastname,date,time,country,ticket_discount,bookemail) VALUES (?,?,?,?,?,?,?)';
        const result = await connection.promise().query(sql, [firstname,lastname,date,time,country,ticketType,email]);
        return result;
      } catch (error) {
        throw error;
      }

    }

    
    async function update(email, exhibitName,price) {
      try {
        const visitorUpdate = "UPDATE visitor SET exhibit_name = ? WHERE email = ?";
        const result1 = await connection.promise().query(visitorUpdate, [exhibitName, email]);
       
        const ticketUpdate = "UPDATE ticket SET price = ? WHERE book_email = ?";
        const result2 = await connection.promise().query(ticketUpdate, [price, email]);
      } catch (error) {
        throw error;
      }
    }

    async function UpdateProfile(email,firstname,lastname,emailToChange,password,req,res) {
      
      let exists = await checkEmailExists(email);
      console.log(exists[0]);
  
      if (exists[0].length > 0) {
        req.session.firstname=firstname,
            req.session.lastname-lastname,
            req.session.email=email
       
        return res.redirect("/profile?error=true");
      }

      try{
       console.log(emailToChange);
       console.log(password);
       const hashNewPass = await bcrypt.hash(password, 10);
       const update_prof = "UPDATE visitor SET email=?, firstname=?, lastname=?,visitor_password=? WHERE email=?";
        const result_tick = await connection.promise().query(update_prof, [email,firstname,lastname,hashNewPass,emailToChange]);
        req.session.email=email
        req.session.firstname=firstname
        req.session.lastname=lastname
        res.redirect("/profile");
        return result_tick;
       

      }
     catch (error) {
      throw error
    }
   }

    
    
  
      
   
      
    
export {insertDataIntoTable,UserValidationRegister,UserValidationLogin,insertUserData,getExhibitions,update,UpdateProfile};
