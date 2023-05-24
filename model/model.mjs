import mysql from "mysql2/promise";
import faker from "faker";

const connection = await mysql.createConnection({
  host: 'localhost',
  database: 'museum_database',
  user: 'root',
  password: 'password',
  insecureAuth: true
});

const generateFakeEmail = (name, surname) => {
  const domain = 'email.com';
  const randomNumber = Math.floor(Math.random() * 1000);
  const formattedName = name.toLowerCase();
  const formattedSurname = surname.toLowerCase();
  return `${formattedName}.${formattedSurname}${randomNumber}@${domain}`;
};


const generateFakeTicketId = () => {
    const prefix = 'TICKET-';
    const randomNumber = Math.floor(Math.random() * 1000000);
    const ticketNumber = prefix + randomNumber.toString().padStart(6, '0');
    return ticketNumber;
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

  const exhibits = {
    a: 20,
    b: 35,
    c: 45,
    d: 60
  };
  
  const getRandomExhibit = () => {
    const exhibitKeys = Object.keys(exhibits);
    const randomIndex = Math.floor(Math.random() * exhibitKeys.length);
    const randomExhibit = exhibitKeys[randomIndex];
    return randomExhibit;
  };
  
  const selectedExhibit = getRandomExhibit();
  const selectedExhibitPrice = exhibits[selectedExhibit];

  const countries = [
    'Argentina',
    'Brazil',
    'Canada',
    'Cyprus',
    'Denmark',
    'Egypt',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Italy',
    'India',
    'Japan',
    'Kenya',
    'Mexico',
    'Norway',
    'Portugal',
    'Russia',
    'Spain',
    'Turkey',
    'United Kingdom',
    'United States',
    'Zimbabwe'
  ];
  
  const getRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  };

  const getRandomFutureDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const futureYear = Math.floor(Math.random() * (2027 - currentYear + 1)) + currentYear;
    const futureMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const futureDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const futureHours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const futureMinutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const futureSeconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  
    const futureDate = `${futureYear}-${futureMonth}-${futureDay} ${futureHours}:${futureMinutes}:${futureSeconds}`;
  
    return futureDate;
  };

  const getRandomTicketNumber = () => {
    const min = 1;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  

  const getRandomPastDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const pastYear = Math.floor(Math.random() * (currentYear - 2020 + 1)) + 2020;
    const pastMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const pastDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const pastHours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const pastMinutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const pastSeconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  
    const pastDate = `${pastYear}-${pastMonth}-${pastDay} ${pastHours}:${pastMinutes}:${pastSeconds}`;
  
    return pastDate;
  };

try {
  // Generate fake data
  for (let i = 0; i <100; i++) {
  
  const fakeName = faker.name.firstName();
  const fakeSurname = faker.name.lastName();
  const fakeEmail = generateFakeEmail(fakeName, fakeSurname);
  const fakeCardNumber = generateRandomCardNumber();
  const fakeTicketId = generateFakeTicketId();
  const selectedCountry = getRandomCountry();
  const randomFutureDate = getRandomFutureDate();
  const randomPastDate = getRandomPastDate();
  const randomNumber = getRandomNumber();
  const selectedExhibit = getRandomExhibit();
  const fakeTicketNumber = getRandomTicketNumber();
  const selectedExhibitPrice = exhibits[selectedExhibit];

  // Insert data into Visitor table
  const insertVisitorQuery = `INSERT INTO Visitor (email, firstname, lastname, exhibit_name, card_no) VALUES (?, ?, ?, ?, ?)`;
  await connection.execute(insertVisitorQuery, [fakeEmail, fakeName, fakeSurname, selectedExhibit, fakeCardNumber]);

  // Insert data into Payment table
  const insertPaymentQuery = `INSERT INTO Payment (card_no, card_owner, cvv, end_date) VALUES (?, ?, ?, ?)`;
  await connection.execute(insertPaymentQuery, [fakeCardNumber, fakeName + ' ' + fakeSurname, randomNumber, randomFutureDate]);

  // Insert data into Ticket table
  const insertTicketQuery = `INSERT INTO Ticket (id, firstname, lastname, ticket_no, email_user, card_no, price, book_date, book_time, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await connection.execute(insertTicketQuery, [fakeTicketId, fakeName, fakeSurname, fakeTicketNumber, fakeEmail, fakeCardNumber, selectedExhibitPrice, randomPastDate, randomFutureDate, selectedCountry]);

  console.log(`Data ${i + 1} inserted successfully!`);}
} catch (error) {
  console.error('Error inserting data:', error);
} finally {
  connection.end();
}

export { connection };
