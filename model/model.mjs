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
        const sql = 'SELECT password FROM visitor WHERE email = ?';
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
         
          //const sql_card = "INSERT INTO payment(card_no,cardholder_name,cvv,end_date) VALUES (?,?,?,?)";
          //const result_card = await connection.promise().query(sql_card, [2,"test",3,'0000/12/01']);

          const sql_ticket = "INSERT INTO visitor(email,firstname,lastname,password,date_of_birth) VALUES (?,?,?,?,?)";
          const result_tick = await connection.promise().query(sql_ticket, [email,firstname,lastname,hash,dateOfBirth]);
       
          res.redirect("/login");

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
     
      

      if (!userPassword[0][0].password) {
        req.session.SignInData = {
          email
        };
      
        return res.redirect("/login?password=invalid");
      }

      const hashedPassword=userPassword[0][0].password;
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

    async function insertUserData(date,time,country,ticketType) {
      try {
        const sql = 'INSERT INTO ticket(date,time,country,ticket_discount) VALUES (?,?,?,?)';
        const result = await connection.promise().query(sql, [date,time,country,ticketType]);
        return result;
      } catch (error) {
        throw error;
      }
     
    }
  
      
    async function ticketQuantityCheck(date,time,country,ticketType)
    {
      try {
        const sql = 'INSERT INTO ticket(date,time,country,ticket_discount) VALUES (?,?,?,?)';
        const result = await connection.promise().query(sql, [date,time,country,ticketType]);
        return result;
      } catch (error) {
        throw error;
      }

    }
    
  
      
   
      
    
export {insertDataIntoTable,UserValidationRegister,UserValidationLogin,insertUserData};
