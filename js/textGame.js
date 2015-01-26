window.onload = init;

/**************************************************************************game settings***************************************************************************/
var gCanvas;
var g2d;
var WIDTH = 854;
var HEIGHT = 480;
var gameState = 0; //gamestate 0 for start
var retryPass = 0; //if reaches three, game over
var tooManyPasswordAttempts = 0;
/**
for boolean representation in respose from game 0 = false 1 = true
*/
var notCap = 0;
var noPass = 0;
var noPassRe = 0;
var searchBodies = 0;
var searchStorage = 0;

/******************************************************************************text*******************************************************************************/
var titleText = "The Only One Left";
var introText = 
			"Welcome, you are a computer engineer that has been embarked on an adventure to inspect the far moon Triaxis that orbits around the planet D6. There has been a mysterious break in communications between the mining colony that is scavaging the moon and your home base. Your objective was to get there, examine the issue and report back, but something has gone terribly wrong. Once the ship started to orbit the moon and prepared for landing all the electronics fased out, like you had suffered an EMP attack. The ships vitals had became usless, flew off course and is floating endlessly further into deep. That is when you noticed the crew started to get sick. If that wasnt bad enought, off in the distance a strange figure appears. A black hole, about 5 days away at your current speed, but you are heading right for it. The whole crew has now died of this mysterious sickness and you can feel it coming on too. It is only a matter of time before you are too close to that black hole. Gain the trust of Scarlett, the on board super computer to learn more about the strange sickness, the break in communication and engines failures, and the black hole before the ship, Scarlett, and yourself are twisted into time and space for all of eternity.";
var BeginningText = 
			"\"Hello?! Is any body left? Something has gone terribly wrong.\" *cough*cough* \"I am starting to get sick too.\" You yell into the communications monitor. CRASH The ship is spinning around sending debris flying inside as you hang on to the front consol of the ship hoping for anything to hear you on the other side of the monitor. \"HELLO?!\" you yell again. \"Hello Captain, what can I do for you?\" you hear coming from the monitor. It appears that the only thing other than yourself on this ship alive is the AI computer Scarlett. ";
var noPassReenterText = 
			"You decide not to attempt the password again in case the security protocols initiate. \"Oh, well that is unfortunate\" exclaims Scarlett \"I really thought you could have been the captain, I am of no use to you as you are no use to me without the proper credentials, begining shut down sequence.\" You see her terminal starting to shut down, *cough**cough*. You are getting sicker by the minute and your only hope of surviving is to try to convince this computer you are worth giving access. How smart can she be?";
var avoidPassText = 
			"\"Oh, well that is unfortunate\" exclaims Scarlett \"Since you dont't have the password I can assume you are not the captain and I am of no use to you and you are no use to me without the proper credentials, begining shut down sequence.\" You see her terminal starting to shut down, *cough**cough*. You are getting sicker by the minute and your only hope of surviving is to try to convince this computer you are worth giving access. How smart can she be?";
var notCaptainText =
			"\"Oh, well that is unfortunate\" exclaims Scarlett, \"Then there is nothing further I can help you with. Begining shut down sequence\". You see her terminal starting to shut down, *cough**cough*. You are getting sicker by the minute and your only hope of surviving is to try to convince this computer you are worth giving access. How smart can she be?";
var yellWait = 
			"You see the terminal screen come back to life. \"What can I help you with? do you have the password yet?\" Scarlett says. \"No I do not, but you are an intelligent being, can you tell me what is going on on this ship? How is everyone dying? Am I dying too? Can we stop the ship before it hits that black hole?\" you ask her frantically. \"I have been programmed to be observant to all the conditions in the ship, but I am only able to report to the proper rank. Please Enter the password.\" You are frustrated and have very little time left. Its obvious she has no emotions and wont budge without the password...it must be somewhere.";
var captainsWallet = 
			"inside the captains wallet you find pictures of his family, poor guy. In the deepest part of the wallet there is a little red peice of paper with FOR EMERGANCY written on it. You unfold it to uncover just one word.. \"eleventhdoctor\". I wonder what that could be?";
var theSickness = 
			"\"The data that I have collected as we passed the mining colony depicts a large amount of a foreign gass called hydromagnicide. It is invisible, tastless and has became airborn because the mining colony has drilled into the center of the moon Triaxis.\" you learn from Scarlett. \"When breathed it collapses the lungs due to its density, blocking the instake of oxygen and suffocating you, you are lucky to be alive still captain.\" I am lucky alright, you think to yourself. ";
var theShip=
			"\"captain, the data that I have collected as we passed the mining colony depicts a large amount of a foreign gass called hydromagnicide, that is invisible and tastless and has became airborn when the colony drilled into the center of the moon.\" you learn from Scarlett. \"Due to its magnetic properties, it has corrupted most of the computers hardware. I have survived due to my superior hardware, resistant to EMP and magnetic attacks.\"	";
var theCure = 
			"\"There is no known cure, at this rate the whole in the moon will leak the gas and in 48 hours it will reach the planet D6, whiping out its population in a matter of hours.\" Scarlett explains. You start to panic. It becomes overwhelmingly obvious that there is only one option, you must save the planet. ";
var savePlanet = 
			"\"By my calculation captain, we might be able to spark the engines for just long enough to give ourselves a perfect trajectory into the hole the has is excreting from, at the speed we will be traveling it should collapse it and stop the gas from reaching the planet.\" Great, a suicide mission. It is up to you to save the people of the planet D6, it is your destiny.";
var sparkEngines = 
			"It works! The ships engines are kicked into hyperdrive for only a second and die again. It gives you enough boost the have a straight trajectory to the moon Triaxis. As the ship is heading there you look to Scarlett. \"Well Scarlett, it has been fun... Goodbye\". You say to the computer monitor.\"Goodbye Captain\"";
/****************************************************************************traits*******************************************************************************/
var whiplash = 0; // 0 = none; 1 = some;


function init() {
	gCanvas = document.getElementById("gameCanvas");
	gCanvas.width = WIDTH;
	gCanvas.height = HEIGHT;
	
	g2d = gCanvas.getContext("2d");
	g2d.imageSmoothingEnabled = false; //IE graphic handling
	g2d.webkitImageSmoothEnabled = false; //Chrome graphic handling
	g2d.webkitImageSmoothEnabled = false; //moz graphic handling

	console.log("Game canvas initialized");
	draw();
}

function wrapText(context, text, x, y, maxWidth, fontSize, fontFace){
  var words = text.split(' ');
  var line = '';
  var lineHeight=fontSize;

  context.font=fontSize+" "+fontFace;

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if(testWidth > maxWidth) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
  return(y);
}

function draw(){
	switch(gameState){
		case 0: // starting -- Play or Exit
			g2d.font = "20px Courier New";
			g2d.fillStyle = "#FFFFFF";
			g2d.fillText(titleText, (WIDTH / 2) - (g2d.measureText(titleText).width / 2), 30);
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#CCCCCC";
			wrapText(g2d, introText, 15, 60, 830, 15, 14);
			g2d.font = "20px Courier New";
			g2d.fillText("1. Play Game", (WIDTH / 2) - (g2d.measureText("1. Play Game").width / 2), 300);
			g2d.fillText("2. Exit Game", (WIDTH / 2) - (g2d.measureText("2. Exit Game").width / 2), 330);
			g2d.fillStyle = "#FF0000";
			g2d.fillText("Type reset in any menu to come back to the start", (WIDTH / 2) - (g2d.measureText("Type reset in any menu to come back to the start").width / 2), 360);		
			break;
		case 1:	// first gamestate: exit screen -- reset to go back to starting
			g2d.font = "20px Inconsolota";
			g2d.fillStyle = "#FFFFFF";
			g2d.fillText("Thanks for Playing", (WIDTH / 2) - (g2d.measureText("Thanks for Playing").width / 2), 30);
			g2d.fillText("Created by Kyle Kilbride - 040 637 169", (WIDTH / 2) - (g2d.measureText("Created by Kyle Kilbride - 040 637 169").width / 2), 60);
			g2d.fillText("For Sci-Fi Final Project", (WIDTH / 2) - (g2d.measureText("For Sci-Fi Final Project").width / 2), 90);		
			break;
		case 2: // second gameState: beginning of story
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#CCCCCC";
			wrapText(g2d, BeginningText, 15, 60, 830, 15, 14);
			g2d.font = "20px Courier New";
			g2d.fillText("1. Ask to contact home base", (WIDTH / 2) - (g2d.measureText("1. Ask to contact home base").width / 2), 200);
			g2d.fillText("2. Demand to know whats going on", (WIDTH / 2) - (g2d.measureText("2. Demand to know whats going on").width / 2), 230);
			g2d.fillText("3. Tell her you are not the captain", (WIDTH / 2) - (g2d.measureText("3. Tell her you are not the captain").width / 2), 260);
			break;
		case 3: // third gamestate: requesting password from captain
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#CCCCCC";
			if(whiplash == 1){ //with some sasss!
				wrapText(g2d, "Do not make demands sir! I am merely here to aid the captain with intergalactic travels. If you are the Captain please enter the password to verify your rank.", 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Enter Password", (WIDTH / 2) - (g2d.measureText("1. Enter Password").width / 2), 230);
				g2d.fillText("2. Avoid entering password", (WIDTH / 2) - (g2d.measureText("2. Avoid entering password").width / 2), 260);
			}else{
				wrapText(g2d, "I am only permited to take orders from the captain, to ensure your rank please enter the password", 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Enter Password", (WIDTH / 2) - (g2d.measureText("1. Enter Password").width / 2), 230);
				g2d.fillText("2. Avoid entering password", (WIDTH / 2) - (g2d.measureText("2. Avoid entering password").width / 2), 260);
			}
			break;
		case 4: // fourth gamestate: entering the password
			g2d.font = "25px Courier New";
			g2d.fillStyle = "#CCCCCC";
			g2d.fillText("ENTER PASSWORD", (WIDTH / 2) - (g2d.measureText("ENTER PASSWORD").width / 2), 75);
			break;
		case 5: // fifth gameState: password retry
			g2d.font = "25px Courier New";
			g2d.fillStyle = "#FF0000";
			g2d.fillText("Wrong Password", (WIDTH / 2) - (g2d.measureText("Wrong Password").width / 2), 75);
			g2d.fillStyle = "#CCCCCC";
			g2d.fillText("Try Again?", (WIDTH / 2) - (g2d.measureText("try Again?").width / 2), 105);
			g2d.fillText("1. Yes", (WIDTH / 2) - (g2d.measureText("1. Yes").width / 2), 230);
			g2d.fillText("2. No", (WIDTH / 2) - (g2d.measureText("2. No").width / 2), 260);
			break;
		case 6: //sixth game state: password wrong continue with story
			if(notCap){
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, notCaptainText, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Yell \"Wait!\"", (WIDTH / 2) - (g2d.measureText("1. Yell \"Wait!\"").width / 2), 230);
				g2d.fillText("2. *Smash your fist on the terminal*", (WIDTH / 2) - (g2d.measureText("2. *Smash your fist on the terminal*").width / 2), 260);				
			}else if(noPassRe){
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, noPassReenterText, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Yell \"Wait!\"", (WIDTH / 2) - (g2d.measureText("1. Yell \"Wait!\"").width / 2), 230);
				g2d.fillText("2. *Smash your fist on the terminal*", (WIDTH / 2) - (g2d.measureText("2. *Smash your fist on the terminal*").width / 2), 260);
				g2d.fillText("3. Hit the red button...", (WIDTH / 2) - (g2d.measureText("3. Hit the red button...").width / 2), 290);
			}else if(noPass){
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, avoidPassText, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Yell \"Wait!\"", (WIDTH / 2) - (g2d.measureText("1. Yell \"Wait!\"").width / 2), 230);
				g2d.fillText("2. *Smash your fist on the terminal*", (WIDTH / 2) - (g2d.measureText("2. *Smash your fist on the terminal*").width / 2), 260);				
			}
			notCap = noPassRe = noPass = 0;	
			break;
		case 7:
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#CCCCCC";		
			wrapText(g2d, yellWait, 15, 60, 830, 15, 14);		
			g2d.font = "20px Courier New";
			g2d.fillText("1. Search Bodies", (WIDTH / 2) - (g2d.measureText("1. Search Bodies").width / 2), 230);
			g2d.fillText("2. Search storage", (WIDTH / 2) - (g2d.measureText("2. Search storage").width / 2), 260);
			g2d.fillText("3. Yell at Scarlett", (WIDTH / 2) - (g2d.measureText("3. Yell at Scarlett").width / 2), 290);			
			break;
		case 8:
			if(searchBodies == 1){
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, "You find the captains wallet", 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Search the captains wallet", (WIDTH / 2) - (g2d.measureText("1. Search Bodies").width / 2), 230);				
			}else if(searchStorage == 1){
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, "You find nothing of use", 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Search Bodies", (WIDTH / 2) - (g2d.measureText("1. Search Bodies").width / 2), 230);
				g2d.fillText("2. Yell at Scarlett", (WIDTH / 2) - (g2d.measureText("2. Search storage").width / 2), 260);
			}
			break;	
		case 9: // yelling at scarlett state
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#FF0000";			
			wrapText(g2d, "Emergancy shutdown, shutting down to prevent loss of critical content or theft. GAME OVER", 15, 60, 830, 30, 14);			
			break;
		case 10:
			g2d.font = "15px Courier New";
			g2d.fillStyle = "#CCCCCC";			
			wrapText(g2d, captainsWallet, 15, 60, 830, 30, 14);	
			g2d.font = "20px Courier New";
			g2d.fillText("1. Attempt Password", (WIDTH / 2) - (g2d.measureText("1. Search Bodies").width / 2), 230);			
			break;	
		case 11:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, "ACCESS GRANTED. Welcome back Captain, it is good to see you. What may I assist you with?", 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Tell me about the sickness", (WIDTH / 2) - (g2d.measureText("1. tell me about the sickness").width / 2), 230);	
				g2d.fillText("2. tell me about the ship and communications", (WIDTH / 2) - (g2d.measureText("2. tell me about the ship and communications").width / 2), 260);						
			break;	
		case 12:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, theSickness, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. How can we cure it?", (WIDTH / 2) - (g2d.measureText("1. How can we cure it?").width / 2), 230);	
			break;	
		case 13:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, theCure, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. How can we save the planet?!", (WIDTH / 2) - (g2d.measureText("1. How can we save the planet?!").width / 2), 230);	
				g2d.fillText("2. Be a coward and let the ship take its course into the black hole", (WIDTH / 2) - (g2d.measureText("2. Be a coward and let the ship take its course into the black hole").width / 2), 260);	
			break;	
		case 14:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, savePlanet, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Spark the engines", (WIDTH / 2) - (g2d.measureText("1. Spark the engines").width / 2), 230);	
				g2d.fillText("2. Think about it for a while", (WIDTH / 2) - (g2d.measureText("2. Think about it for a while").width / 2), 260);	
			break;
		case 15:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, sparkEngines, 15, 60, 830, 15, 14);		
			break;	
		case 16:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#CCCCCC";		
				wrapText(g2d, theShip, 15, 60, 830, 15, 14);		
				g2d.font = "20px Courier New";
				g2d.fillText("1. Tell me about the sickness", (WIDTH / 2) - (g2d.measureText("1. Spark the engines").width / 2), 230);					
			break;
		case 96:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#FF0000";		
				wrapText(g2d, "Time has run out, there is no longer time to spark the engines and the black hole's gravitational pull sucks you in. MISSION FAILED GAME OVER", 15, 60, 830, 15, 14);				
			break;
		case 97:
				g2d.font = "15px Courier New";
				g2d.fillStyle = "#FF0000";		
				wrapText(g2d, "You lay on your back and wait for your and the planets enevitable death. GAME OVER", 15, 60, 830, 15, 14);					
			break;	
		case 98:
			document.getElementById("terminal").style.backgroundImage = "url('images/explosion.jpg')";	
			document.getElementById("terminal").style.backgroundRepeat = "no-repeat";
			g2d.font = "25px Courier New";
			g2d.fillStyle = "#FF0000";
			if(tooManyPasswordAttempts == 1){
				wrapText(g2d, "INITIATING LOCKDOWN SEQUENCE, TOO MANY INVALID PASSWORD ATTEMPTS, SELF DESTRUCT IN 3....2....1", 15, 60, 830, 30, 14);
			}else{
				wrapText(g2d, "INITIATING LOCKDOWN SEQUENCE, SELF DESTRUCT IN 3....2....1", 15, 60, 830, 30, 14);
			}
			g2d.font = "45px Courier New";		
			g2d.fillText("GAME OVER", (WIDTH / 2) - (g2d.measureText("GAME OVER").width / 2), 260);
			tooManyPasswordAttempts = 0;
			break;

	}
	buildCanvas();
	console.log("Game drawn successfully");
}

function buildCanvas(){
	//taking input from user
	var input = new CanvasInput({
  		canvas: document.getElementById('gameCanvas'),
  		x: 2,
  		y: 450,
  		width: 834,
  		backgroundColor: "#000000",
  		fontColor: "#FFFFFF",
  		fontSize: 20,
  		borderColor: "#000000",
  		boxShadow: "none",
  		fontStyle: "Courier New",
  		onsubmit: function(){
  			var choice = parseInt(input._value);
  			var npChoice = input._value;  				  			
			switch(gameState){
				case 0: // starting -- Play or Exit
  				switch(choice){
  					case 1:
  						enterState(2);
  						return;
  					case 2:
  						enterState(1);
  						break;
  					}
					break;
				case 1:	// exit screen -- reset to go back to starting
				 	choice = input._value;
	 				if(choice == "reset"){
	 					reset();
	 				}
					break;
				case 2: // first gameState, beginning of story
					if(npChoice == "reset")
						reset();
					switch(choice){						
						case 1: // ask to contact home base
							enterState(3);
							break;
						case 2: // demand to know whats going on
							whiplash = 1; // give some sass!!
							enterState(3);
							break;
						case 3: // tell her you are not the captain
							notCap = 1;
							enterState(6);
							break;
					}
					break;
				case 3: //requesting the password
					if(npChoice == "reset")
						reset();
					switch(choice){
						case 1: //enter the password
						enterState(4);
							break;
						case 2: //dont enter the password
							noPass = 1;
							enterState(6);
							break;
					}
					break;
				case 4: // entering the password
					if(npChoice == "reset")
						reset();
					if(npChoice == "eleventhdoctor"){
						enterState(11);
					}else{
						retryPass++;
						enterState(5);
					}
					break;
				case 5: // wrong password state		
					if(retryPass == 3){
						tooManyPasswordAttempts = 1;
						enterState(98);
						break;
					}			
					if(npChoice == "reset")
						reset();
					switch(choice){
						case 1: // retry password
							console.log("retryPass = " + retryPass);
							enterState(4);
							break;
						case 2: // dont retry password
							noPassRe = 1;
							enterState(6);
							break;
					}					
					break;
				case 6: // terminal shutting down need to make descision
					if(npChoice == "reset")
						reset();
					switch(choice){
						case 1:
							enterState(7);
							break;
						case 2:
							enterState(98);
							break;
					}
					break;
				case 7:
					if(npChoice == "reset")
						reset();
					switch(choice){
						case 1:
							searchBodies = 1;
							searchStorage = 0;
							enterState(8);
							break;
						case 2:
							searchBodies = 0;
							searchStorage = 1;
							enterState(8);
							break;
						case 3:
							searchBodies = searchStorage = 0;
							enterState(9);
							break;
					}
					break;
				case 8:
					if(npChoice == "reset")
						reset();

					if(searchBodies){
						switch(choice){
							case 1:
								enterState(10);
								break;
						}
					}
					if(searchStorage){
						switch(choice){
							case 1:
								searchStorage = 0;
								searchBodies = 1;
								enterState(8);
								break;
							case 2:	
								searchBodies = searchStorage = 0;
								enterState(9);
								break;						
						}
					}
					break;	
				case 9:
					if(npChoice == "reset")
						reset();
					break;
				case 10:
					enterState(4);
					break;	
				case 11:
					if(npChoice == "reset")
						reset();				
					switch(choice){
						case 1:
							enterState(12);
							break;
						case 2:
							enterState(16);
							break;							
					}
					break;	
				case 12:
					if(npChoice == "reset")
						reset();				
					else if(choice == 1)
						enterState(13);
					break;	
				case 13:
					if(npChoice == "reset")
						enterState(0);	
					switch(choice){
						case 1:
							enterState(14);
							break;
						case 2:
							enterState(97);
							break;
					}				
					break;
				case 14:
					if(npChoice == "reset")
						reset();					
					switch(choice){
						case 1:
							enterState(15);
							break;
						case 2:
							enterState(96);
							break;
					}
					break;
				case 15:
					if(npChoice == "reset")
						reset();
					break;	
				case 16:
					if(npChoice == "reset")
						reset();
					switch(choice){
						case 1:
							enterState(12);
							break;
					}
					break;				
				case 96:
					if(npChoice == "reset")
						reset();
					break;
				case 97:
					if(npChoice == "reset")
						reset();
					break;						
				case 98:
					if(npChoice == "reset")
						reset();
					break;
			} 			
  		}

	});
	input.focus();	
}

function reset(){
	document.getElementById("terminal").style.backgroundImage = "url('images/space.jpg')";	
	document.getElementById("terminal").style.backgroundRepeat = "no-repeat";	
	enterState(0);
}

function enterState(state){
	gameState = state;
	clearCanvas(g2d, gCanvas);
	draw();
}

function clearCanvas(context, canvas){
	context.clearRect(0,0,canvas.width, canvas.height);
	var w = canvas.width;
	canvas.width = 1;
	canvas.width = w;
}