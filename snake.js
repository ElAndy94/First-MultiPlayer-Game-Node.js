var express = require('express'); //require the express package
var app = express();  //use the express package
var server = require("http").Server(app);  //require http
app.use(express.static("client"));  //use the client file, which contails index.html
var mysql = require("mysql"); //requires the mysql package
var connection = mysql.createConnection({ //connects to database
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'phpdb' //my db name in localhost 
});
//var connection = mysql.createConnection({multipleStatements: true});
connection.connect();

server.listen(8081);   //listens to the localhost:8081 
console.log("Server started.");  //Sends "sever started" to the server, so i can see when ive connected.

var SOCKET_LIST = {};   // List of socket, eg. players

var Entity = function(){  //entity share a lot with players, this will help when creating other things in the game.
    var self = {   //self all these are shared with players.
        x:Math.floor(400 * Math.random()), //random location for player
		y:Math.floor(400 * Math.random()),
        spdX:0,  //speed x starts at 0 until direction is pressed
        spdY:0,  
        id:"",
		maximum_length: 8, //maximun length is 8 until you eat some food
		tail: new Array(), //tail array
    }
    self.update = function(){ //update position function
        self.updatePosition(); //update position
    }
    self.updatePosition = function(){  //update position function
        self.x += self.spdX;
        self.y += self.spdY;
		self.tail.push( { x: self.x, y: self.y } );	//the tail on the x: y: of the player(snake)
		
			if (self.tail.length > self.maximum_length) //setting the length of the tail
			{
				self.tail.shift(); //not letting the snake keep adding the tail
			}
			
			//if self touches the food then create new food, adds maximun length, adds one to the score and adds one to the counter
				if(Math.sqrt(Math.pow(self.x-food.x, 2) + Math.pow(self.y-food.y, 2)) < 20 )
				{
						food = {
							x:Math.floor(400 * Math.random()), //random location for the food
							y:Math.floor(400 * Math.random())	//random location for the food
						};
							self.maximum_length++;
							self.score++;
							self.levelCounter++;
						
							if(self.levelCounter == 5)
							{
								self.level++;
								self.maxSpd++;
								self.levelCounter = 0;
							}
						}
						
					if(self.x <= 2 || self.x >= 498 || self.y <= 2 || self.y >= 498 ) //this is the collision to the edges
		{
			self.x = 70;
			self.y = 70;
			self.spdX = 0;
			self.spdY = 0;
			self.pressingRight = false;  //pressing right false, until pressed
			self.pressingLeft = false; //pressing left false, until pressed
			self.pressingUp = false;  //pressing up false, until pressed
			self.pressingDown = false; //pressing down false, until pressed
			
			//this query gets the username the level and the score and interts it in the database then, after that it all resets
			connection.query('INSERT INTO game (user_Tag, user_level, user_score) VALUES ("'+ self.username + '",' + self.level + ',' + self.score + ');', function (error, results) {
			
			if (error) throw error;
			  
			});
			
			// AFTER Score and Level has been inserted in the database then it does this -> 
			
			self.score = 0;
			self.level = 1;
			self.maximum_length = 8;
			self.tail.length = 8;
			self.maxSpd = 7;
			}
    }
    return self;
}

var food = {
	x:Math.floor(400 * Math.random()), //random location for the food
	y:Math.floor(400 * Math.random())  //random location for the food
}


var Player = function(id,name){  //player function
    var self = Entity();   //entity connected to players because they share same things
        self.id = id;  //player ID
        self.pressingRight = false;  //pressing right false, until pressed
        self.pressingLeft = false; //pressing left false, until pressed
        self.pressingUp = false;  //pressing up false, until pressed
        self.pressingDown = false; //pressing down false, until pressed
        self.maxSpd = 7;  //starts with the speed of 7
		self.score = 0;
		self.level = 1;
		self.levelCounter = 0;
		self.username = name; //this changes to the username of the player when he logs in
        
    var super_update = self.update;  //updates itself
    self.update = function() { //self update function
        self.updateSpd();  //updates the speed of the player
        super_update();  //keeps the update going on and on
    }
    
    self.updateSpd = function(){ //update speed function.
        if(self.pressingRight)
		{
			self.spdX = 0; // I have put 0 here
			self.spdY = 0; // and 0 here so when you change directions it does not go horizontal for example, repeated this on all directions
            self.spdX = self.maxSpd;
		}
        else if(self.pressingLeft)
		{
			self.spdX = 0;
			self.spdY = 0;
            self.spdX = -self.maxSpd;
		}
        else
		{}
        if(self.pressingUp)
		{
			self.spdY = 0;
			self.spdX = 0;
            self.spdY = -self.maxSpd;
		}
        else if(self.pressingDown)
		{
			self.spdY = 0;
			self.spdX = 0;
            self.spdY = self.maxSpd;
		}
        else 
		{}
    }
    
    Player.list[id] = self;  
    return self;
}

Player.list = {};  //players list


Player.onConnect = function(socket,name){  //player on connect when player gets through the logging in.
    var player = Player(socket.id,name);  //gives it a socket.id and name.
    socket.on('keyPress',function(data){  //gets the keypressed functions from index.html page
        if(data.inputId === 'left')							//LEFT
            player.pressingLeft = data.state;  //SET AS FALSE UNTIL PRESSED.
        else if(data.inputId === 'right')  //RIGHT
            player.pressingRight = data.state; //SET AS FALSE UNTIL PRESSED.
        else if(data.inputId === 'up')  //UP
            player.pressingUp = data.state; //SET AS FALSE UNTIL PRESSED.
        else if(data.inputId === 'down')  //DOWN
            player.pressingDown = data.state; //SET AS FALSE UNTIL PRESSED.
    });
}

Player.onDisconnect = function(socket){ //If player disconnect function then - 
    delete Player.list[socket.id];  //Deletes player from playerlist + socket.id!
}

Player.update = function(){ //Player update function
    var pack = [];  //pack containing player info 
    for(var i in Player.list) { // players list
        var player = Player.list[i]; // player list array.
        player.update();  // calls for player update function
        pack.push({
            x:player.x,
            y:player.y,
			tail: player.tail,
			fx:food.x,
			fy:food.y,
			score:player.score,
			level:player.level
        });
    }
    return pack;
}

var DEBUG = true; //keep this false so players cant delete database or playerlists etc etc!

var isCorrectPassword = function (data,cb){ //searches for any matches of the username and password you have entered in the client side
	connection.query('SELECT * FROM `userinfo` WHERE `user_name` = "' + data.username + '" AND `user_pass` = "' + data.password + '";', function (err, res) {
		if(res.length >0){
			//if there is a match, then it will be true
				cb(true);
			}
			else {
				//no match will mean that username or password is incorrect, making it false
				cb(false);
			}
		});
}


var io = require("socket.io")(server);  //calls the server io from index.html
io.sockets.on('connection', function(socket){ //if connected - 
    socket.id = Math.random();    //creates a random socket.id, currently has no perameaters!
    SOCKET_LIST[socket.id] = socket;  
    
    socket.on('signIn', function(data){  //this sign in function reads it from the index.html
        isCorrectPassword(data,function(res){
            if(res){
                Player.onConnect(socket,data.username); //if everything is correct it connects you, and creates a player id etc etc...
                socket.emit('signInResponse',{success:true}); //means youve connected.
            } else {
                socket.emit('signInResponse',{success:false}); //else false, which then gives you the message that i set in the index.html page = alert "Sign in was unsuccessful!"
            }
        });    
    });
    
    
    socket.on('disconnect',function(){  //listens for dissconnect
        delete SOCKET_LIST[socket.id];  //deletes it from the socket list.
        Player.onDisconnect(socket);  //calls for the player function, on disconnect
    });
    
    socket.on('sendMsgToSever',function(data){  //sends message in the chat
        var playerName = ("" + socket.id).slice(2,7);  
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);   //the players name + the message
        }
        
    });
    
    socket.on('evalServer',function(data){  //Evaluate server function e.g can evaluate /Player.list 
        if(!DEBUG)  //DEBUG, allways keep it false up on the top if this gets set up to server
            return;
        
        var res = eval(data);  //evaluates comands 
        socket.emit('evalAnswer',res); //emits the evaluation answer to the console.
    });
    
});

setInterval(function(){  //function which sets the interval
    var pack = Player.update();  //calls for the player pack
    
       for(var i in SOCKET_LIST){
           var socket = SOCKET_LIST[i];
           socket.emit('newPositions',pack); //keeps refreshing all positions and the players pack
       }
    },1000/25);   //fps
