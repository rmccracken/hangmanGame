//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var azletter = ['a','b','c','d','e','f','g','h','i','j','k','l',
				  'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//words to  guess
var wordBank =['lion','tiger','giraffe', 'hippopotamus','elephant','rhinoceros',
				'wildebeest','gorilla', 'cheetah', 'leopard'];
//Holds choosenWord
var choosenWord = "";
// letters in word
var lettersInWord = [];
//number of blanks in choosenWord
var underscore = 0;
// Blanks and successful guesses
var uscoreAndRguess =[];
// Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 10;
var rightGuessCounter = 0;

function reset()
{
	//Chooses word randomly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	underscore = lettersInWord.length;
	
	//Reset game
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	uscoreAndRguess =[];
	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randomly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	underscore = lettersInWord.length;

	//Populate blanks
	for(var i = 0; i< underscore; i++)
	{
		uscoreAndRguess.push('_');
		document.getElementById('underscores').innerHTML = uscoreAndRguess;
	}

	//Changes to var's 
	document.getElementById('underscores').innerHTML = uscoreAndRguess.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
}

function compareLetters(userKey)
{
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < underscore; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							uscoreAndRguess[i] = userKey;
							document.getElementById('underscores').innerHTML = uscoreAndRguess.join(' ');
						}	
					}
				}
				//Wrong letters
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
		
}
function winLose()
{
	//If underscore filled with right words then you win
	if(rightGuessCounter === underscore)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		alert(' Good Job, You Win!');
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert('Better Luck next time');
		reset();
	}
}

//MAIN PROCCESS
//Initiates the Code
startGame();
	alert('Press any key to begin');
document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < azletter.length; i++)
	{	
		if(letterGuessed === azletter[i] && test === true)
		{
			var spliceDword = azletter.splice(i,1);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}