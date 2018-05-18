<?php 
  $dbhost  = 'localhost';    //connection to the database
  $dbname  = 'phpdb';   //database name here
  $dbuser  = 'root';   
  $dbpass  = '';   
  $appname = "Andrew's Web"; 

  $connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname); //makes the connection
  if ($connection->connect_error) die($connection->connect_error); //connection = error then it will kill the connection

  function createTable($name, $query)
  {
    queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
    echo "Table '$name' created or already exists.<br>";
  }

  function queryMysql($query) 
  {
    global $connection;  // this is a very important one, makes $connection global! 
    $result = $connection->query($query);
    if (!$result) die($connection->error);
    return $result;
  }

  function destroySession() //distory sessions function
  {
    $_SESSION=array();

    if (session_id() != "" || isset($_COOKIE[session_name()]))
      setcookie(session_name(), '', time()-2592000, '/');

    session_destroy(); //kills the cookie which stores the session
  }

  function sanitizeString($var) 
  {
    global $connection;  // this is a very important one, makes $connection global! 
    $var = strip_tags($var);
    $var = htmlentities($var);
    $var = stripslashes($var);
    return $connection->real_escape_string($var);
  }

  function showProfile($user)  //Not used by me, came with it.
  {
    if (file_exists("$user.jpg"))  //Not used by me, came with it.
      echo "<img src='$user.jpg' style='float:left;'>";  

    $result = queryMysql("SELECT * FROM rnprofiles WHERE user='$user'"); 

    if ($result->num_rows) //Not used by me, came with it.
    {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      echo stripslashes($row['text']) . "<br style='clear:left;'><br>";
    }
  }
?>
