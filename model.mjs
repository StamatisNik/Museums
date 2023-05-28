import mysql from "mysql2/promise";
import faker from 'faker';

const connection = await mysql.createConnection({
  host: 'localhost',
  database: 'museum_database',
  user: 'root',
  password: 'password',
  insecureAuth: true
});

connection.connect(function(err){
  if(err){
      console.error('Error connecting to MySQL server: ' + err.message);
      return;
  }
  console.log('Connected to MySQL server: ');
});




const generateFakeEmail = (name, surname) => {
  const domain = 'email.com';
  const randomNumber = Math.floor(Math.random() * 1000);
  const formattedName = name.toLowerCase();
  const formattedSurname = surname.toLowerCase();
  return `${formattedName}.${formattedSurname}${randomNumber}@${domain}`;
};

function generateFakeBirthdate() {
  
  const birthdate = faker.date.between('1933-01-01', '2003-12-31');
  const formattedBirthdate = birthdate.toISOString().slice(0, 10).replace(/-/g, '/');

  return formattedBirthdate;
}


const generateFakeTicketId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber;
  };
  
  const mastercardCheck = /^(?:5[1-5][0-9]{14})$/;
  const visaCheck = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const amexCheck = /^(?:3[47][0-9]{13})$/;
  const dinersClubCheck = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
  
  const cardNumberRegexes = [mastercardCheck, visaCheck, amexCheck, dinersClubCheck];
  
  const generateRandomCardNumber = () => {
    const randomIndex = Math.floor(Math.random() * cardNumberRegexes.length);
    const selectedRegex = cardNumberRegexes[randomIndex];
    let cardNumber = '';
  
    for (let i = 0; i < 16; i++) {
      if (selectedRegex.test(cardNumber + '0')) {
        cardNumber += '0';
      } else if (selectedRegex.test(cardNumber + '1')) {
        cardNumber += '1';
      } else {
        cardNumber += Math.floor(Math.random() * 10).toString();
      }
    }
  
    return cardNumber;
  };

  const getRandomExhibition = () => {
    const exhibitionKeys = Object.keys(exhibitions);
    const randomIndex = Math.floor(Math.random() * exhibitionKeys.length);
    const randomExhibition = exhibitionKeys[randomIndex];
    return randomExhibition;
  };


  // Exhibit data
  const exhibitions = {
    Standard: 20,
    Early_Access: 35,
    Turn_the_Lights_On: 45,
    Skip_the_Line_Tour: 60
    };


  
  const selectedExhibit = getRandomExhibition();
  const selectedExhibitPrice = exhibitions[selectedExhibit];


  const getRandomNumber = () => {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  };

  const getRandomFutureDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const futureYear = Math.floor(Math.random() * (2027 - currentYear + 1)) + currentYear;
    const futureMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const futureDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  
    const futureDate = `${futureYear}-${futureMonth}-${futureDay}`;
  
    return futureDate;
  };


  function selectRandomTimeZone() {
    const timeZones = [
      '9:00-12:00',
      '12:00-15:00',
      '15:00-18:00'
    ];
  
    
    const randomIndex = Math.floor(Math.random() * timeZones.length);
    
    const randomTimeZone = timeZones[randomIndex];
  
    return randomTimeZone;
  }

  function selectRandomDiscount() {
    const discounts = [
      0,
      40,
      50
    ];

    const randomIndex = Math.floor(Math.random() * discounts.length);
  
    const randomDiscount = discounts[randomIndex];
  
    return randomDiscount;
  }
  

  

try {
  //Generate fake data

  for (let i = 0; i <10; i++) {
  
  const fakeName = faker.name.firstName();
  const fakeSurname = faker.name.lastName();
  const fakeEmail = generateFakeEmail(fakeName, fakeSurname);
  const fakepassword = faker.internet.password();
  const fakeBirthdate = generateFakeBirthdate();
  const fakeCardNumber = generateRandomCardNumber();
  const fakeTicketId = generateFakeTicketId();
  const selectedCountry = faker.address.country();
  const randomFutureDate = getRandomFutureDate();
  const randomNumber = getRandomNumber();
  const selectedExhibition = getRandomExhibition();
  const timezone = selectRandomTimeZone();
  const randomDiscount = selectRandomDiscount(); 
  const selectedExhibitionPrice = exhibitions[selectedExhibition];
  const fakeprice = selectedExhibitPrice -(selectedExhibitPrice*randomDiscount/100);
 
 // Insert data into Visitor table
 const insertVisitorQuery = `INSERT INTO Visitor (email, firstname, lastname, visitor_password, date_of_birth, exhibit_name, card_no) VALUES (?, ?, ?, ?, ?, ?, ?)`;
await connection.execute(insertVisitorQuery, [fakeEmail, fakeName, fakeSurname, fakepassword, fakeBirthdate, selectedExhibition, fakeCardNumber]);

// Insert data into Payment table
const insertPaymentQuery = `INSERT INTO Payment (card_no, cardholder_name, cvv, end_date)
 VALUES (?, ?, ?, ?)`;
await connection.execute(insertPaymentQuery, [fakeCardNumber, fakeName + ' ' + fakeSurname, randomNumber, randomFutureDate]);

// Insert data into Ticket table
const insertTicketQuery = `INSERT INTO Ticket (ticket_id, book_firstname, book_lastname, ticket_type, book_time, book_date, country, ticket_discount, price, book_email, card_no_book) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
await connection.execute(insertTicketQuery, [fakeTicketId, fakeName, fakeSurname, selectedExhibition, timezone, randomFutureDate, selectedCountry, randomDiscount, fakeprice, fakeEmail, fakeCardNumber]);

console.log(`Data ${i + 1} inserted successfully!`);

}
} catch (error) {
console.error('Error inserting data:', error);
} finally {
connection.end();
}

export { connection };
