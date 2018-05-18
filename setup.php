<!DOCTYPE html>
<html>
  <head>
    <title>Setting up database</title>
  </head>
  <body>

    <h3>Setting up...</h3>

<?php 
  require_once 'functions.php'; //requires the functions page
  //this creates the tables and sets it all up, not much i can say about this one

  createTable('rnmembers',
              'user VARCHAR(16),
              pass VARCHAR(16),
			  email VARCHAR(26),
              INDEX(user(6))');

  createTable('messages', 
              'id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              auth VARCHAR(16),
              recip VARCHAR(16),
              pm CHAR(1),
              time INT UNSIGNED,
              message VARCHAR(4096),
              INDEX(auth(6)),
              INDEX(recip(6))');

  createTable('friends',
              'user VARCHAR(16),
              friend VARCHAR(16),
              INDEX(user(6)),
              INDEX(friend(6))');

  createTable('rnprofiles',
              'user VARCHAR(16),
              text VARCHAR(4096),
              INDEX(user(6))');
			  
  createTable('logs',
              'user_send INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              user_recieve VARCHAR(255),
              message VARCHAR (4096)');	
			  
  createTable('userinfo',
              'user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			  user_name VARCHAR(26),
			  user_pass VARCHAR(26),
			  user_firstname VARCHAR(40),
			  user_surname VARCHAR(40),
              dob date');
			  
  createTable('game',
              'gameid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			  user_Tag VARCHAR(26),
			  user_level INT(26),
			  user_score INT(40)');
			  
?>

    <br>...done.
  </body>
</html>
