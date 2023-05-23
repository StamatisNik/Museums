import mysql from "mysql2"
import bcrypt from "bcrypt";
import MySQLStore from "express-mysql-session";
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
        const sql = 'SELECT user_password FROM visitor WHERE email = ?';
        const result=await connection.promise().query(sql, [email]);
        return result;
      } catch (error) {
        throw error;
      }
     }
  
      
     async function UserValidationRegister(firstname,lastname,email,confirmEmail,password,passwordConfirm,dateOfBirth, req, res) {
      
        let exists = await checkEmailExists(email);
        console.log(exists[0]);
    
        if (exists[0].length > 0) {
          req.session.registrationData = {
            firstname,
            lastname,
            email,
            confirmEmail,
            dateOfBirth
          };
          return res.redirect("/register?error=true");
        
        }
        try{
          const hash = await bcrypt.hash(password, 10);
          const sql = "INSERT INTO visitor(email, user_password) VALUES (?, ?)";
          const result = await connection.promise().query(sql, [email, hash]);
          res.redirect("/login");
          return result;

        }
       catch (error) {
        throw error
      }
     }
    
  
  

     async function UserValidationLogin(email, password, req, res) {
      let exists = await checkEmailExists(email);
      const userPassword = await retreivePassword(email);
     
      if (!exists[0].length) {
        req.session.SignInData = {
          email
        };
        return res.redirect("/login?email=invalid");
      }
     
      

      if (!userPassword[0][0].user_password) {
        req.session.SignInData = {
          email
        };
      
        return res.redirect("/login?password=invalid");
      }

      const hashedPassword=userPassword[0][0].user_password;
      try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch);
        if (!isMatch) {
          req.session.SignInData = {
            email
          };
           return res.redirect("/login?password=invalid");
        }
          req.session.isAuth=true;
          return res.redirect("/tickets");
        }  
        catch (error) {
        throw error;
      }
    }
  
      

    
  
      
   
      
    
export {insertDataIntoTable,UserValidationRegister,UserValidationLogin};
