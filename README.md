create database fbi_db; 

create table login (
	id SERIAL PRIMARY KEY, 
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	PASSWORD VARCHAR(50) NOT NULL
); 

insert into login (EMAIL, PASSWORD) VALUES
('who@fbi.com', 'me'),
('where@fbi.com', 'there'),
('how@fbi.com', 'exactly'); 

select * from login;
