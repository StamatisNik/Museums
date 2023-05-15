
CREATE TABLE IF NOT EXISTS  Visitor (
	email varchar(255) NOT NULL PRIMARY KEY,
	firstname varchar(255),
	lastname varchar(255),
    country varchar(255),
    exhibit_name  varchar(255),
    card_no varchar(255),
	FOREIGN KEY (exhibit_name) REFERENCES Exhibit(exhibit_name),
    FOREIGN KEY (card_no) REFERENCES Payment(card_no)
	
);

CREATE TABLE IF NOT EXISTS  Payment (
	card_no varchar(255) NOT NULL PRIMARY KEY,
	card_owner varchar(255),
	cvv varchar(255),
	end_date datetime
    
);

CREATE TABLE IF NOT EXISTS Ticket (
	QR_code varchar(255) NOT NULL PRIMARY KEY,
	firstname varchar(255),
	lastname varchar(255),
	ticket_no varchar(255),
    email_user varchar(255),
    card_no varchar(255),
	price real,
    book_date datetime,
	book_time datetime,
    FOREIGN KEY (email_user) REFERENCES Visitor(email),
    FOREIGN KEY (card_no) REFERENCES Payment(card_no)
);

CREATE TABLE IF NOT EXISTS  Exhibit (
	exhibit_name varchar(255) NOT NULL PRIMARY KEY,
	price real
);





