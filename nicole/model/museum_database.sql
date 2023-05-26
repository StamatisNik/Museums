USE museum_database;

CREATE TABLE IF NOT EXISTS  Visitor (
	email varchar(255) NOT NULL PRIMARY KEY,
	firstname varchar(255),
	lastname varchar(255),
    visitor_password varchar(255),
    date_of_birth date,
    card_no int,
    exhibition_name varchar(255)
);

CREATE TABLE IF NOT EXISTS  Payment (
	card_no int NOT NULL PRIMARY KEY,
	cardholder_name varchar(255),
	cvv varchar(10),
	end_date date
);

CREATE TABLE IF NOT EXISTS Ticket (
	ticket_id varchar(255) NOT NULL PRIMARY KEY,
	firstname varchar(255),
	lastname varchar(255),
    ticket_type  varchar(255),
    book_date datetime,
	book_time varchar(255),
	ticket_discound varchar(255),
	country varchar(255),
    price float,
    book_email varchar(255),
    card_no_book int
);

CREATE TABLE IF NOT EXISTS  Exhibition (
	exibition_name varchar(255) NOT NULL PRIMARY KEY,
	exhibition_price float
);



