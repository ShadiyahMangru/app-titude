//**************************
//Methods to play hangman!    
//**************************

var easyWords = ["flower", "cake", "rain", "tree", "bee", "frozen", "snow", "leaf", "hot", "apple", "star", "four", "cat", "zoo", "car", "train", "jump", "bag", "store", "heart", "hat", "sun", "bye", "egg", "joy", "eye", "owl", "sky", "cow", "mall"];
    
var mediumWords = ["January", "computer", "television", "soccer", "dinosaur", "shovel", "garden", "cucumber", "parade", "watermelon", "cupcake", "pizza", "tiger", "giant", "unicorn", "octopus", "volcano", "meteor", "ocean", "beach", "cloud", "elephant", "bakery", "forest", "wizard", "drum", "couch", "rainbow", "glitter", "window", "wand", "potato"];

var hardWords = ["dolphin", "instrument", "blender", "gasoline", "cantaloupe", "firefighter", "icicle", "thunder", "telephone", "locomotive", "triangle", "thirteen", "eight", "tricycle", "automobile", "circle", "gymnastics", "subtraction", "skyscraper", "piano", "ballet", "rectangle", "astronaut", "restaurant", "baseball", "cylinder", "country", "Quebec"];    
    
var mysteryWord;  
var answerFormat = [];
var alreadyGuess;
var lives;

//******************************************
//function to get random element of an array
//******************************************
function randArrayE(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}  
    
//*******************************************************************
//function to load a new mystery word based on user's E/M/H selection
//*******************************************************************
function playGame(num){
    $("#HMPic").css("display", "none");
    lives=7;
    alreadyGuess = [];
    $("#HMGetLetter").css("display", "inline-block");
    $("#HMLetterGuess").css("display", "inline-block");
    $("#HMSubmit").css("display", "inline-block");
    if(num==3){
        mysteryWord = randArrayE(hardWords);
    }
    else if(num==2){
        mysteryWord = randArrayE(mediumWords);
    }
    else{
        mysteryWord = randArrayE(easyWords);
    }
    mysteryWord = mysteryWord.toUpperCase();
    for(var i=0; i<mysteryWord.length; i++){
        answerFormat[i] = "_ "
    }
    $("#HMAnswerFormat").html("CODE WORD FORMAT: " + answerFormat.join(""));
    $("#easy").attr("disabled", true);
    $("#medium").attr("disabled", true);
    $("#hard").attr("disabled", true);
    return mysteryWord;
}              

//only accepts letters as input
var aLetter;
function checkInp(){
    aLetter = true;
    var inp=$("#HMLetterGuess").val();
    var regex=/^[a-zA-Z]+$/;
    if (!inp.match(regex))
    {
        $("#HMfeedback").html("Must input a letter.  Try Again!");
        return aLetter = false;
    }
}

//********************************************************************************
//function that returns user to word difficulty selection that precedes a new game
//********************************************************************************
function playAgain(){
    $("#HMPic").css("display", "block");
    $("#HMGetLetter").css("display", "none");
    $("#HMLetterGuess").css("display", "none");
    $("#HMLetterGuess").val("");
    $("#HMSubmit").css("display", "none");
    $("#HMSubmit").attr("disabled", false);
    $("#HMAnswerFormat").html("");
    $("#HMfeedback").html("");
    $("#HMPlayAgain").css("display", "none");
    $("#HMCelebrate").css("display", "none");
    $("#HMSad").css("display", "none");
    $("#easy").attr("disabled", false);
    $("#medium").attr("disabled", false);
    $("#hard").attr("disabled", false);
    $("#HMguessed").css("display", "none");
    answerFormat = [];
}


$(document).ready(function(){
newModal("#HMModalDiv", "HMModal", "Code Word!", "<div id='HMButtons'></div><div id='HMPic'></div><div id='HMAnswerFormat'></div><br><div id='HMguessed'></div><br><div id='HMgetLDiv'></div><div id='HMfeedback'></div><div id='HMEnd'></div>", "#HMModalButton", "Code Word"); 
$("#HMModalButton").click(function(){
    playAgain();
});    
//display select difficulty level choice buttons
$("#HMButtons").html("Select Classification Level:");
$('#HMButtons').append("<br><button class='btn btn-primary' style='background-color: #A3206F; display: none' id='HMPlayAgain' onclick='playAgain();'>Play Again!</button><button id='easy' class='btn btn-primary' style='background-color: #E56C1B' onclick='playGame(1);'>Confidential</button><button id='medium' class='btn btn-primary' style='background-color: #1DAAAE' onclick='playGame(2);'>Secret</button><button id='hard' class='btn btn-primary' style='background-color: #159049' onclick='playGame(3);'>Top Secret</button><br><br>");
//display initial image
$("#HMPic").append("<img src='Images/cw.JPG' style='width: 240px; margin-top: 6em; margin-left: -5em'>");   
//display means to get letter guess from user
$("#HMgetLDiv").append("<strong id='HMGetLetter'>Enter a letter:</strong> <input id='HMLetterGuess' class='form-control' style='width: 20%; display: none' type='text' value=''><button class='btn btn-primary' id='HMSubmit'>Submit</button><Br><br>");
        
//*************************************************************************
//function to get letter guess from user and output feedback based on guess
//*************************************************************************   
$("#HMSubmit").click(function(){
    var guess = $("#HMLetterGuess").val();
    guess = guess.toUpperCase();
    checkInp();
    if(guess.length==1 & aLetter===true){
        //if current letter has already been guessed during this round, retrieve another guess from user
        if(alreadyGuess.indexOf(guess)!=-1){
            $("#HMfeedback").html("You have already entered " + guess + ".  You still have " + lives + " tries remaining.  Try again!"); 
            $("#HMLetterGuess").val("");
        }
        //if current letter guess is in word, update mystery word format key and reveal to user
        else if(mysteryWord.indexOf(guess)!=-1 & alreadyGuess.indexOf(guess)==-1){
            alreadyGuess.unshift(guess);
            for(var i=0; i < mysteryWord.length; i++){
						if(mysteryWord.charAt(i)==guess.charAt(0)){
							answerFormat[i] = guess + " ";	
						}
					}
            $("#HMAnswerFormat").html("CODE WORD FORMAT: " + answerFormat.join(""));
            $("#HMLetterGuess").val("");
            $("#HMguessed").css("display", "block");
            $("#HMguessed").html("ALREADY ENTERED: " + alreadyGuess.join(", "));
        
        //ask user for another letter guess, if answer key still contains dashes
            if(answerFormat.indexOf("_ ")!=-1){
                    $("#HMfeedback").html("Good Work!  Keep trying!  You have " + lives + " tries remaining.");
            }
        //output winner message if no dashes remain in answer key and load a new round of game
            else{
                $("#HMfeedback").html("  ACCESS GRANTED!!!");
                $("#HMCelebrate").css("display", "block");
                $("#HMPlayAgain").css("display", "block");
                $("#HMAnswerFormat").html("CODE WORD: " + answerFormat.join(""));
                $("#HMSubmit").attr("disabled", true);
            }
        }   
        //if current letter guess not in word, decrease 'lives' by one
        else if(mysteryWord.indexOf(guess)==-1){
            alreadyGuess.unshift(guess);
            lives--;
            $("#HMguessed").css("display", "block");
            $("#HMguessed").html("ALREADY ENTERED: " + alreadyGuess.join(", "));
             
            //retrieve another letter guess from user if 'lives' remain
            if(lives>0){
                $("#HMfeedback").html(guess.toUpperCase() + " is not in the word.  Enter another letter!  You have " + lives + " tries remaining.");
                $("#HMLetterGuess").val("");
            }
            else{
            //output mystery word and a game over message to user if no 'lives' remain; load another round of game
                $("#HMfeedback").html("  ACCESS DENIED.  The Code Word was " + mysteryWord.toUpperCase() + " but has now been changed.");
                $("#HMSad").css("display", "block");
                $("#HMSubmit").attr("disabled", true);
                $("#HMPlayAgain").css("display", "block");
            }
        }
} 
});
//submit input upon pressing enter key   
$("#HMLetterGuess").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#HMSubmit").click();
    }
});   
    
//display win/lose image; display play again button
$("#HMEnd").append("<div id='HMCelebrate'><img src='Images/salute.JPG' style='width: 200px; margin-top: 1em; margin-left: 15em'></div><div id='HMSad'><img src='Images/classified.png'></div>");   
});




//******************************************
//methods to play war!
//******************************************
    
    var deck = [];
    var dealerDeck = [];
    var youDeck = [];
    var dealerScore;
    var youScore;
    var cardsLeft;
    var youCard;
    var dealerCard;


//construct a standard 52-card deck
    function makeDeck(){
        dealerScore = 0;
        youScore = 0;
        suitOfDeck("c");
        suitOfDeck("s");
        suitOfDeck("h");
        suitOfDeck("d");
    }

//make quarter of deck corresponding to a particular suit
    function suitOfDeck(suit){
        for(var i=1; i<14; i++){
            deck.unshift(i + "," + suit);
        }
    }
    
//shuffle deck
function shuffle(array) { //adapted from Fisher-Yates shuffle
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    
    return array;
}


function splitDeck(){
        dealerDeck = deck.slice(0, 26);
        youDeck = deck.slice(26, 52);
    }

    
    //'flip' 1 card from each deck
    function flipCard(){
        $("#WGamePic").css("display", "none");
        $("#youCPic").css("display", "inline-block");
        $("#dealerCPic").css("display", "inline-block");
        $("#youLabel").css("backgroundColor", "white");
        $("#dealerLabel").css("backgroundColor", "white");
        $("#roundWin").html("");
        $("#whoWon").css("display", "block");
        $("#war").attr("disabled", "true");
        youCard = youDeck[26-cardsLeft];
        //alert(typeof youCard.split(",")[1]);
        cardImage(youCard, "#youCardDisplay", "#cardNumY1", "#cardNumY2");
        cardNumber(youCard, "#cardNumY1", "#cardNumY2");
        dealerCard = dealerDeck[26-cardsLeft];
        cardImage(dealerCard, "#dealerCardDisplay", "#cardNumD1", "#cardNumD2");
        cardNumber(dealerCard, "#cardNumD1", "#cardNumD2");
        cardsLeft--;
        //
        if(cardsLeft===0){
            //disable war button when each 26 card pile has no cards remaining
            //display a results message -- congrats to winner
            $("#war").attr("disabled", true);
            if(youScore > dealerScore){
                $("#warResults").html("YOU WIN!!!");
            }
            else if(youScore < dealerScore){
                $("#warResults").html("COMPUTER WINS!!!");
            }
            else{
                $("#warResults").html("IT IS A TIE!!!");
            }
            document.querySelector("#WARplayAgain").style.display = "block";
        }
    }
    
    //function to determine which suit to display on screen
    function cardImage(cardType, imgID, divID1, divID2){
        if(cardType.split(",")[1]=="h"){
            var pic = document.querySelector(imgID);
            pic.src="Images/hearts.png";
            $(divID1).css("color", "red");
            $(divID2).css("color", "red");
        }
        else if(cardType.split(",")[1]=="d"){
            var pic = document.querySelector(imgID);
            pic.src="Images/diamonds.png";
            $(divID1).css("color", "red");
            $(divID2).css("color", "red");
        }
        else if(cardType.split(",")[1]=="c"){
            var pic = document.querySelector(imgID);
            pic.src="Images/clubs.png";
            $(divID1).css("color", "black");
            $(divID2).css("color", "black");
        }
        else if(cardType.split(",")[1]=="s"){
            var pic = document.querySelector(imgID);
            pic.src="Images/spades.png";
            $(divID1).css("color", "black");
            $(divID2).css("color", "black");
        }
    }
    
    //function to determine if a number or K, Q, J, A displayed on screen
    function cardNumber(cardNum, divID1, divID2){
        if(cardNum.split(",")[0]==="13"){
            $(divID1).html("K");
            $(divID2).html("K");
        }
        else if(cardNum.split(",")[0]==="12"){
            $(divID1).html("Q");
            $(divID2).html("Q");
        }
        else if(cardNum.split(",")[0]==="11"){
            $(divID1).html("J");
            $(divID2).html("J");
        }
        else if(cardNum.split(",")[0]==="1"){
            $(divID1).html("A");
            $(divID2).html("A");
        }
        else{
            $(divID1).html(cardNum.split(",")[0].toString());
            $(divID2).html(cardNum.split(",")[0].toString());
        }
    }
    
    var roundWinner;
    var click=false;
    function whoWon(num){
        if(num===1){
            roundWinner='you';
        }
        else if(num===2){
            roundWinner='computer';
        }
        else if(num===3){
            roundWinner='tie';
        }
        click=true;
        $("#war").attr("disabled", false);
        $("#roundWin").html("");
        $("#roundWin").css("display", "block");
        score();        
    }

    //a function to compare cards and adjust score based on flipped card values
    function score(){
        //if dealer card < you card, +2 you
        if(parseInt(youCard.split(",")[0]) > parseInt(dealerCard.split(",")[0]) && click===true){
            if(roundWinner==='you'){
                $('#roundWin').html(" Yes, you won that round!");
            }
            else{
                $('#roundWin').html(" Actually, you won that round!");
            }
            var addPoints = 2;
            youScore+=parseInt(addPoints);
            //alert("you: " + youScore);
            $("#youScore").html(youScore);
            $("#youLabel").css("backgroundColor", "yellow");
            $("#dealerLabel").css("backgroundColor", "white");
        }
        //if dealer card > you card, +2 dealer
        else if(parseInt(youCard.split(",")[0]) < parseInt(dealerCard.split(",")[0]) && click===true){
            if(roundWinner==='computer'){
                $('#roundWin').html(" Yes, the computer won that round!");
            }
            else{
                $('#roundWin').html(" Actually, the computer won that round!");
            }
            var addPoints = 2;
            dealerScore+=parseInt(addPoints);
            //alert("dealer: " + dealerScore);
            $("#dealerScore").html(dealerScore);
            $("#youLabel").css("backgroundColor", "white");
            $("#dealerLabel").css("backgroundColor", "yellow");
        }
        //if dealer card = you card, flip again without adjusting score (once tie broken, score of winner increased by total number cards flipped since tie began). //WORK ON THIS CONDITION
        else if(click===true){
            if(roundWinner==='tie'){
                $('#roundWin').html(" Yes, this round we have a tie!");
            }
            else{
                $('#roundWin').html(" Actually, this round we have a tie!");
            }
            //alert("there is a tie");
            $("#youLabel").css("backgroundColor", "white");
            $("#dealerLabel").css("backgroundColor", "white");
            score();
        }
        click=false;
    }

$(document).ready(function(){
    newModal("#WModalDiv", "WModal", "War!", "<p>In this game, King is a high card (=13) and Ace is a low card (=1).  Good luck!</p><span id='WGamePic'><img src='Images/cardDeck.png'></span><div id='youCPic'><p id='youLabel'>You: </p><div id='youCBorder'><div id='cardNumY1'>Q</div><img id='youCardDisplay'  src='Images/diamonds.png'><div id='cardNumY2'>Q</div></div></div><div id='dealerCPic'><p id='dealerLabel'>Computer: </p><div id='dealerCBorder'><div id='cardNumD1'>K</div><img id='dealerCardDisplay'  src='Images/clubs.png'><div id='cardNumD2'>K</div></div></div><br><br><button class='btn btn-primary' id='war' onclick='flipCard();'>Play War!</button><div id='whoWon' style='padding: .5em; border: 1px solid navy; margin-top: .4em'><label>Who Won that Round?  </label><br><button class='btn btn-primary' style='margin-left: 1em; background-color: #FC8200; font-weight: 600' onclick='whoWon(1)'>You</button><button class='btn btn-primary' style='margin-left: 1em; background-color: #FC8200; font-weight: 600' onclick='whoWon(2)'>Computer</button><button class='btn btn-primary' style='margin-left: 1em; background-color: #FC8200; font-weight: 600' onclick='whoWon(3)'>Tie</button><br><div id='roundWin' style='font-weight: 600; font-size: 110%; color: crimson'></div></div><div id='WScore'></div><div id='warResults' style='color: #3335B2'></div><button class='btn btn-primary' id='WARplayAgain' style='background-color: #A3206F' onclick='playWarAgain();'>Load A New Game</button>", "#WModalButton", "War"); 
    $("#WModalButton").click(function(){
        $("#warResults").html("");
        $("#dealerScore").html("0");
        $("#youScore").html("0");
        $("#WGamePic").css("display", "block");
        $("#youCPic").css("display", "none");
        $("#dealerCPic").css("display", "none");
        $("#WARplayAgain").css("display", "none");
        $("#war").attr("disabled", false);
        deck = [];
        dealerDeck = [];
        youDeck = [];
        loadGame();
    });
    $("#WScore").append("<br>Score: <br>You:<span id='youScore' style='float: right'>0</span><br>Computer: <span id='dealerScore' style='float: right'>0</span>"); 

    function loadGame(){
        makeDeck();
        shuffle(deck);
        splitDeck(); 
        cardsLeft = 26;
        $("#whoWon").css("display", "none");
        $("#roundWin").css("display", "none");
    }
    
    loadGame();

    //display a play again button
    $( "#WARplayAgain" ).click(function() {
        $("#warResults").html("");
        $("#dealerScore").html("0");
        $("#youScore").html("0");
        $("#WGamePic").css("display", "block");
        $("#youCPic").css("display", "none");
        $("#dealerCPic").css("display", "none");
        $("#WARplayAgain").css("display", "none");
        $("#war").attr("disabled", false);
        deck = [];
        dealerDeck = [];
        youDeck = [];
        loadGame();
});
});
    
    



//*************************************
//Number Guess Game
//*************************************
var computerNumber;
var remGuess;
var alreadyG;
	    //load a new game
    function loadGame(){
		computerNumber = getRandomInt(1, 101);
        remGuess=10;
        alreadyG = [];
        $("#newGame").css("display", "none");
        $("#feedback").html("");
        $("#aGuessed").html("");
        //style previous guesses div
        $("#aGuessed").css("color", "#AC0090");
        $("#aGuessed").css("font-size", "110%")
        $("#aGuessed").css("font-weight", "600");
        $("#aGuessed").css("padding-top", ".75em");
        $("#feedback").css("font-size", "110%");
        $("#feedback").css("color", "#0047B3");
        $("#submitG").attr("disabled", false);
    }

    //function to generate a random integer between two values
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //max is exclusive and the min is inclusive
	}

    //only accepts numbers as input
    var aNumber;
    function checkNGInp(){
        aNumber = true;
        var inp=$("#guess").val();
        var regex=/^[0-9]+$/;
        if (!inp.match(regex))
        {
            $("#feedback").html("Must input a number.  Try Again!");
            return aNumber = false;
        }
    }
//****************************************
//jQuery function for Number Guessing Game
//****************************************
$(document).ready(function(){
 newModal("#NGModalDiv", "NGModal", "Number Guess!", "<div id='guessN'></div><div id='aGuessed'></div><div id='feedback' class='siteOutput'></div>", "#NGModalButton", "Number Guess"); 
$("#NGModalButton").click(function(){
    loadGame();
}); 
    
//display game directions, guess input area and 'correct?' button 
$("#guessN").html("Directions: The computer is thinking of a number between 1 and 100, inclusive.  You have at most 10 guesses.");
$("#guessN").append("<br><br><label class='siteLabel'>Guess: </label><input type='number' id='guess' class='form-control' style='width: 20%; display: inline'><button id='submitG' class='btn btn-primary'>Correct?</button><button id='newGame' onclick='loadGame()' class='btn btn-primary' style='background-color: #A3206F; display: none; margin-left: 1em'>Play Again!</button><br>"); 
      

//loadGame();    
    
//checks if guess is correct and provides user with feedback
    $("#submitG").click(function() {
        var repeat=false;
		var playerGuess = $("#guess").val();
		playerGuess = parseInt(playerGuess);
        computerNumber = parseInt(computerNumber);
        checkNGInp();
        if(alreadyG.indexOf(playerGuess)!=-1){
            repeat=true;
        }
        else if(aNumber===false){
           $("#feedback").html("<br><span style='color: #d70000'>You may only input numbers.  You still have " + remGuess + " guesses remaining.  Try Again!</span>"); 
           $("#guess").val("");
        }
        else{
        alreadyG.unshift(playerGuess);
        $("#aGuessed").html("Previous Guesses: " + alreadyG.join(", "));
		remGuess--;
        }
		if(playerGuess===computerNumber && remGuess > 0){
			$("#feedback").html("<br>Me-wow!  That is correct! The number was " + computerNumber + " and it only took you " + (10-remGuess) + " tries!");
            $("#feedback").append("<br><br><img src='Images/cat.png'>");
            $("#newGame").css("display", "inline-block");
            $("#guess").val("");
            $("#submitG").attr("disabled", true);
		}
        else if(repeat===true){
           $("#feedback").html("<br><span style='color: #d70000'>You have already guessed " + playerGuess + ".  You still have " + remGuess + " guesses remaining.  Try Again!</span>"); 
           $("#guess").val("");
        }
		else if(playerGuess !== computerNumber && remGuess > 0){
			if(playerGuess > computerNumber){
            if(remGuess===10){
                remGuess--;
            }
			$("#feedback").html("<br><span style='color: #118140'>LOWER than " + playerGuess + "...</span><br>" + remGuess + " guesses remaining!"); 
            $("#guess").val("");
			}
			else if(playerGuess < computerNumber){
                if(remGuess===10){
                remGuess--;
                }
				$("#feedback").html("<br><span style='color: #DB6F34'>HIGHER than " + playerGuess + "... </span><br>" + remGuess + " guesses remaining!");
                $("#guess").val("");
			}
		}
		else if(remGuess===0){
			$("#feedback").html("<br>You are out of guesses! The correct number was " + computerNumber +".");
            $("#newGame").css("display", "inline-block");
            $("#guess").val("");
            $("#submitG").attr("disabled", true);
		}
    }); 
    
    
//submit input upon pressing enter key   
$("#guess").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#submitG").click();
    }
});  
    
    
});






//**********************************
//Add It Up! Game source code
//**********************************
    var solValid;
    var redSum=0;
    var blueSum=0;
    var purpleSum=0;
    var greenSum=0;
    var sumsCorrect;
  
    function newGame(){
        $("#AIUIntro").css("display", "block");
        $("#key").html("");
        $("#gb").html("");
        $("#mySolution").html("");
        $("#winLose").html("");
    }

    //create more gameboards per level
    $(document).ready(function(){
    newModal("#AIUModalDiv", "AIUModal", "Add It Up!", "<div id='AIUIntro'><p>Rules: </p><ol><li>Populate each gamboard square with numbers 1-3 (for Easy), 1-4 (for Medium) or 1-5 (for Hard).</li><li>Do NOT repeat a number in any row or column.</li><li>Ensure color-coded regions sum to the value specified in each gameboard's key.</li></ol><p>Select a difficulty level:</p><button id='GBEasy' class='btn btn-primary'>Easy</button><button id='GBMedium' class='btn btn-primary'>Medium</button><button id='GBHard' class='btn btn-primary'>Hard</button></div><div id='key'></div><div id='winLose'></div><div id='gb'></div><div id='mySolution'></div><br>", "#AIUModalButton", "Add It Up!"); 
    
    $("#AIUModalButton").click(function(){
        newGame();
    });   
        
    $("#GBEasy").click(function(){ 
    $("#AIUIntro").css("display", "none");
    $("#key").html("");
    $("#gb").html("");
    $("#mySolution").html("");
    var pg = ["8", "10"]; 
    var answerKeyC = ["ppp", "pgg", "ggg"];
    var key = "<br><span style='color: #003399; font-size: 120%; font-weight: 600'><u>KEY:</u></span> \n\nThe sum of: (i) the <span style='color: rebeccapurple'>purple</span> squares is " + pg[0] + ", (ii) the <span style='color: #2c8309'>green</span> squares is " + pg[1] + "."; 
        $("#key").html(key);
        $("#key").append("<br><br>")    
        
    
    var counter = 0;
    var setStyle;
        while(counter < 3){
            for(var i = 0; i < 3; i++){
                if(answerKeyC[counter].charAt(i)==='p'){
                    setStyle = "style='background-color: rebeccapurple'";
                }    
                else if(answerKeyC[counter].charAt(i)==='g'){
                    setStyle = "style='background-color: #2c8309'";
                }     
                $("#gb").append('<button ' + setStyle + 'class="clickButton" id="a' + i + counter + '">'+ 1 +'</button>');
            }
            $("#gb").append("<br>");
            counter++;
        }
        $("#mySolution").append("<br><button id='submitSolutionEasy' class='btn btn-primary' style='background-color: #424949'>Submit My Solution</button><br><br><button id='EMM' class='btn btn-primary' style='background-color: navy'>Return to Main Menu</button>");
        
        $("#EMM").click(function(){
            newGame();
        });
        
        $( ".clickButton" ).click(function() {
        var buttonCount = $(this).html();
        parseInt(buttonCount);
        if(buttonCount<3){
            buttonCount++;
        }
        else{
            buttonCount = 1;
        }
        $(this).html(buttonCount);
        }); 
     
       $( "#submitSolutionEasy" ).click(function() {
        solValid=true;
        sumsCorrect=true;
        $("#winLose").html("");
        var ys = [];
        var sol = "";
        var counter = 0;
        var colArray = [];
        var colString = '';
        purpleSum=0;
        greenSum=0;
        while(counter < 3){
            sol="";
            for(var i = 0; i < 3; i++){
                var id = "#a"+i+counter;
                sol += $("" + id + "").html();
            }
        ys[counter] = sol;
        counter++;    
        }
        //check if 1,2,3 only used once per row
        for(var i=0; i<3; i++){
            if(ys[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if 1,2,3 only used once per column
        for(var a=0; a<3; a++){
            for(var b=0; b<3; b++){
            var columnVal = ys[b].charAt(a);
            colString += columnVal;
            }
            colArray.unshift(colString);
            colString='';
        }
        //alert(colArray);
        for(var i=0; i<3; i++){
            if(colArray[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if each color-coded region sums to specified values
        for(var c=0; c<3; c++){
            for(var d=0; d<3; d++){
            if(answerKeyC[d].charAt(c)=='p'){
                purpleSum += parseInt(ys[d].charAt(c));    
            }
            else if(answerKeyC[d].charAt(c)=='g'){
                greenSum += parseInt(ys[d].charAt(c));    
            }
        }
       }
       if(purpleSum!=pg[0]){
           sumsCorrect=false;
       }
       if(greenSum!=pg[1]){
           sumsCorrect=false;
       }
       if(solValid===false){
            $("#winLose").append("Not quite; no repeated numbers allowed per row/column.");
       }
        if(sumsCorrect===false){
            $("#winLose").append("<br>Sums of color-coded regions do not match key.  Try again!<br><br>");
        }
        else{
            $("#winLose").html("YOU WIN!!!");
        }
    });    
        
        
    });

    $("#GBMedium").click(function(){
    $("#AIUIntro").css("display", "none");
    $("#key").html("");
    $("#gb").html("");
    $("#mySolution").html("");
    var rpg = ["15", "5", "20"];
    var answerKeyC = ["ppgg", "rrgg", "rrgg", "rrgg"];
        var key = "<br><span style='color: #003399; font-size: 120%; font-weight: 600'><u>KEY:</u></span> \n\nThe sum of: (i) the <span style='color:#A8224A'>red</span> squares is " + rpg[0] + ", (ii) the <span style='color: rebeccapurple'>purple</span> squares is " + rpg[1] + ", (iii) the <span style='color: #2c8309'>green</span> squares is " + rpg[2] + "."; 
        $("#key").html(key);
        $("#key").append("<br><br>")       
        
    
    var counter = 0;
    var setStyle;
        while(counter < 4){
            for(var i = 0; i < 4; i++){
                if(answerKeyC[counter].charAt(i)==='r'){
                    setStyle = "style='background-color: #A8224A'";
                }
                else if(answerKeyC[counter].charAt(i)==='p'){
                    setStyle = "style='background-color: rebeccapurple'";
                }    
                else if(answerKeyC[counter].charAt(i)==='g'){
                    setStyle = "style='background-color: #2c8309'";
                }     
                $("#gb").append('<button ' + setStyle + 'class="clickButton" id="a' + i + counter + '">'+ 1 +'</button>');
            }
            $("#gb").append("<br>");
            counter++;
        }
        $("#mySolution").append("<br><button id='submitSolutionM' class='btn btn-primary' style='background-color: #424949'>Submit My Solution</button><br><br><button id='MMM' class='btn btn-primary' style='background-color: navy'>Return to Main Menu</button>");
        
        $("#MMM").click(function(){
            newGame();
        });
        
        $( ".clickButton" ).click(function() {
        var buttonCount = $(this).html();
        parseInt(buttonCount);
        if(buttonCount<4){
            buttonCount++;
        }
        else{
            buttonCount = 1;
        }
        $(this).html(buttonCount);
        });
    
       $( "#submitSolutionM" ).click(function() {
        solValid=true;
        sumsCorrect=true;
        $("#winLose").html("");
        var ys = [];
        var sol = "";
        var counter = 0;
        var colArray = [];
        var colString = '';
        redSum=0;
        purpleSum=0;
        greenSum=0;
        while(counter < 4){
            sol="";
            for(var i = 0; i < 4; i++){
                var id = "#a"+i+counter;
                sol += $("" + id + "").html();
            }
        ys[counter] = sol;
        counter++;    
        }
        //check if 1,2,3,4 only used once per row
        for(var i=0; i<4; i++){
            if(ys[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if 1,2,3,4,5 only used once per column
        for(var a=0; a<4; a++){
            for(var b=0; b<4; b++){
            var columnVal = ys[b].charAt(a);
            colString += columnVal;
            }
            colArray.unshift(colString);
            colString='';
        }
        //alert(colArray);
        for(var i=0; i<4; i++){
            if(colArray[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if each color-coded region sums to specified values
        for(var c=0; c<4; c++){
            for(var d=0; d<4; d++){
            if(answerKeyC[d].charAt(c)=='r'){
                redSum += parseInt(ys[d].charAt(c));
            }
            else if(answerKeyC[d].charAt(c)=='p'){
                purpleSum += parseInt(ys[d].charAt(c));    
            }
            else if(answerKeyC[d].charAt(c)=='g'){
                greenSum += parseInt(ys[d].charAt(c));    
            }
        }
       }
       if(redSum!=rpg[0]){
           sumsCorrect=false;
       }
       if(purpleSum!=rpg[1]){
           sumsCorrect=false;
       }
       if(greenSum!=rpg[2]){
           sumsCorrect=false;
       }
       if(solValid===false){
            $("#winLose").append("Not quite; no repeated numbers allowed per row/column.");
       }
        if(sumsCorrect===false){
            $("#winLose").append("<br>Sums of color-coded regions do not match key.  Try again!<br><br>");
        }
        else{
            $("#winLose").html("YOU WIN!!!");
        }
    });
        
    });
        

    $("#GBHard").click(function(){
    $("#AIUIntro").css("display", "none");
    $("#key").html("");
    $("#gb").html("");
    $("#mySolution").html("");
    var rbpg = ["10", "27", "16", "22"];
    var answerKeyC = ["rrbbb", "rrbbb", "pppbb", "pppgg", "ggggg"];
        var key = "<br><span style='color: #003399; font-size: 120%; font-weight: 600'><u>KEY:</u></span> \n\nThe sum of: (i) the <span style='color:#A8224A'>red</span> squares is " + rbpg[0] + ", (ii) the <span style='color: #3766BD'>blue</span> squares is " + rbpg[1] + ", (iii) the <span style='color: rebeccapurple'>purple</span> squares is " + rbpg[2] + ", (iv) the <span style='color: #2c8309'>green</span> squares is " + rbpg[3] + "."; 
        $("#key").html(key);
        $("#key").append("<br><br>")    
          
    
    var counter = 0;
    var setStyle;
        while(counter < 5){
            for(var i = 0; i < 5; i++){
                if(answerKeyC[counter].charAt(i)==='r'){
                    setStyle = "style='background-color: #A8224A'";
                }
                else if(answerKeyC[counter].charAt(i)==='b'){
                    setStyle = "style='background-color: #3766BD'";
                }
                else if(answerKeyC[counter].charAt(i)==='p'){
                    setStyle = "style='background-color: rebeccapurple'";
                }    
                else if(answerKeyC[counter].charAt(i)==='g'){
                    setStyle = "style='background-color: #2c8309'";
                }     
                $("#gb").append('<button ' + setStyle + 'class="clickButton" id="a' + i + counter + '">'+ 1 +'</button>');
            }
            $("#gb").append("<br>");
            counter++;
        }
        $("#mySolution").append("<br><button id='submitSolution' class='btn btn-primary' style='background-color: #424949'>Submit My Solution</button><br><br><button id='HMM' class='btn btn-primary' style='background-color: navy'>Return to Main Menu</button>");
        
        $("#HMM").click(function(){
            newGame();
        });
        
        $( ".clickButton" ).click(function() {
        var buttonCount = $(this).html();
        parseInt(buttonCount);
        if(buttonCount<5){
            buttonCount++;
        }
        else{
            buttonCount = 1;
        }
        $(this).html(buttonCount);
        });
        

//var aSolution = ["13425", "42351", "25143", "51234", "34512"]; 

   $( "#submitSolution" ).click(function() {
        solValid=true;
        sumsCorrect=true;
        $("#winLose").html("");
        var ys = [];
        var sol = "";
        var counter = 0;
        var colArray = [];
        var colString = '';
        redSum=0;
        blueSum=0;
        purpleSum=0;
        greenSum=0;
        while(counter < 5){
            sol="";
            for(var i = 0; i < 5; i++){
                var id = "#a"+i+counter;
                sol += $("" + id + "").html();
            }
        ys[counter] = sol;
        counter++;    
        }
        //check if 1,2,3,4,5 only used once per row
        for(var i=0; i<5; i++){
            if(ys[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if 1,2,3,4,5 only used once per column
        for(var a=0; a<5; a++){
            for(var b=0; b<5; b++){
            var columnVal = ys[b].charAt(a);
            colString += columnVal;
            }
            colArray.unshift(colString);
            colString='';
        }
        //alert(colArray);
        for(var i=0; i<5; i++){
            if(colArray[i].indexOf((i+1).toString())===1){
                solValid=false;
            }
        }
        //check if each color-coded region sums to specified values
        for(var c=0; c<5; c++){
            for(var d=0; d<5; d++){
            if(answerKeyC[d].charAt(c)=='r'){
                redSum += parseInt(ys[d].charAt(c));
            }
            else if(answerKeyC[d].charAt(c)=='b'){
                blueSum += parseInt(ys[d].charAt(c));
            }
            else if(answerKeyC[d].charAt(c)=='p'){
                purpleSum += parseInt(ys[d].charAt(c));    
            }
            else if(answerKeyC[d].charAt(c)=='g'){
                greenSum += parseInt(ys[d].charAt(c));    
            }
        }
       }
       if(redSum!=rbpg[0]){
           sumsCorrect=false;
       }
       if(blueSum!=rbpg[1]){
           sumsCorrect=false;
       }
       if(purpleSum!=rbpg[2]){
           sumsCorrect=false;
       }
       if(greenSum!=rbpg[3]){
           sumsCorrect=false;
       }
       if(solValid===false){
            $("#winLose").append("Not quite; no repeated numbers allowed per row/column.");
       }
        if(sumsCorrect===false){
            $("#winLose").append("<br>Sums of color-coded regions do not match key.  Try again!<br><br>");
        }
        else{
            $("#winLose").html("YOU WIN!!!");
        }
    });
    });
    
    });