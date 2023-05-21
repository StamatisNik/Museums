import mysql from "mysql2"
//import bcrypt from "bcrypt"

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'Nicname200!1233',
    database: 'museum_database'});

    connection.connect(function(err){
        if(err){
            console.error('Error connecting to MySQL server: ' + err.message);
            return;
        }
        console.log('Connected to MySQL server: ');
    });

        /*
async function checkEmailExists(email){
    try{
        const sql = 'SELECT email FROM  visitor WHERE  email = ?';
        const result = await connection.promise().query(sql, email);
        return result; 
    }catch (error){
        throw error; 
    }
}

async function UserValidationRegister(email,password,req,res){
    let exists = await checkEmailExists(email);
    console.log(exists[0]);

    if(!email || !password){
        throw new Error("Missing email or password!");

    }
    else if(exists[0].length>0){
        res.redirect("/profile?errorMessage=Email%20alredy%20exists!")
        
        return; 
    }

    try{
        const  hash = await bcrypt.hash(password,10);
        const sql = "INSERT INTO visitor(email,user_password) VALUES (?,?)"
        const result = await connection.promise().query(sql,[email,hash]);
        return result; 
    }catch(error){
        throw error; 
    }
}*/