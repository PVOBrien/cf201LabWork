'use strict'; // instructed to add, to ensure quality and correctness. Get into the habit.

// ======================== GOALS ===========================================
// 1. create a personalized welcome
// 2. comment code throughout to show logic
// 3. walk through Paul's bio. ask questions provide info about Paul is.
// 4. reduce the amount of input variables to expect (within our current skill level) by the toUpperCase() method

// ================= Variable List ==========================================

var userName; // who is visiting the page?
var answerOne; // make this a template of sorts to be able to see how it easily fits elsewhere, in other ways
var answerTwo; // each answer needs it's own var
var answerThree; // each var needs to be unique
var answerFour; // and maybe these aren't the most descriptive
var answerFive; // added in day 2 of this lab due to latest requirements
var answerSix; // but in this case they are easy to read for a short script in JavaScript
var correctAnswerCount = 0; // I have them recall how many questions they answered correctly, and evaluate it if it is correct, above, or below.
var guessCount = 0; // how many guesses has the user made?
var remainingGuesses = 0; // countdown to be created

// ============== Array List ==============================================

var myLocations = ['haiti', 'england', 'mexico', 'canada', 'botswana'];

// ==================== FUNCTIONS ===========================================

function getName(){
  userName = prompt ('Why hello there! Who might you be?', '');
  console.log (userName + ' is visiting the page');
  alert ('Well ' + userName + ' thank you for stopping by.');
}

function getAnswerOne(){
  answerOne = prompt ('Was I born before Star Wars premiered?', '(Hint: Star Wars first showed in theaters in 1977)');
  answerOne = answerOne.charAt(0).toUpperCase() + answerOne.slice(1); // takes the first letter and Capitalizes it, then concatenates the rest of the sentence back in from the second character on because slices like arrays start at 0. This code snippet was found at https://attacomsian.com/blog/string-capitalize-javascript on 2020-06-02
  if (answerOne === 'N' || answerOne === 'No') { // checking for the relevant response
    alert ('You are correct!'); // if you got the correct answer, you're told so.
    correctAnswerCount++; // this keeps the correct track of how many questions you get correct.
  } else { // wrong answer, stating as much. Also, no increment for the correctAnswerCount.
    alert ('Nope! I did see them in theater for their 20 year anniversary special editions however.');
  }
}

function getAnswerTwo(){
  answerTwo = prompt ('Did I live in Germany before moving to Washington state?', 'When the wall fell, I was there!');
  answerTwo = answerTwo.charAt(0).toUpperCase() + answerTwo.slice(1);
  if (answerTwo === 'Y' || answerTwo === 'Yes') {
    alert ('You are correct!');
    correctAnswerCount++;
  } else {
    alert ('Incorrect. I\'m no Berliner!');
  }
}

function getAnswerThree(){
  answerThree = prompt ('Was there any mention of pets in the bio?');
  answerThree = answerThree.charAt(0).toUpperCase() + answerThree.slice(1);
  if (answerThree === 'N' || answerThree === 'No') {
    correctAnswerCount++; // do you need a semicolon or not?
    alert ('True, but we did have pets always, lots of barks, meows, and some neighs even!');
  } else {
    alert ('Ah! While we had pets, I never mentioned them.');
  }
}

function getAnswerFour(){
  answerFour = prompt ('Did I meet my wife Idaho?');
  answerFour = answerFour.charAt(0).toUpperCase() + answerFour.slice(1);
  if (answerFour === 'Y' || answerFour === 'Yes') {
    correctAnswerCount++;
    alert('I did! But not before frightening her terribly.');
  } else {
    alert('Naw, Idaho was the place.');
  }
}

function getAnswerFive(){
  answerFive = prompt ('Did my career take me to far away places?');
  answerFive = answerFive.charAt(0).toUpperCase() + answerFive.slice(1);
  if (answerFive === 'Y' || answerFive === 'Yes') {
    correctAnswerCount++;
    alert('Correct!');
  } else {
    alert('No, I did see other parts of the world, for which I am very thankful.');
  }
}

function userCorrect(){
  while (guessCount <= correctAnswerCount) {
    answerSix = prompt ('Okay ' + userName + ' how many answers did you get correct?', 'Answer with a number 1-8');
    answerSix = parseInt(answerSix);
    if (answerSix === correctAnswerCount) { // I'm checking if their answer is the correctAnswerCount that incremented each correct answer
      alert ('You kept track too! Good job!'); // congratulations for keeping track of a random number
      correctAnswerCount++;
      // guessCount+2;
      // console.log(guessCount); // this was acting up. but it's a console.log, so "//" that.
      break;
    } else if (answerSix > correctAnswerCount) { // I'm checking for the upper, above the correctAnswerCount
      alert ('Ah, too high!');
      guessCount++;
    } else if (answerSix < correctAnswerCount) { // this is the catch for the lower end (the only numerical value that still remains)
      alert ('You underestimated your skill ' + userName + '!');
      guessCount++;
    }
  }
}

function guessCountry(){
  guessCount = 0;
  while (guessCount < 6) {
    remainingGuesses = correctAnswerCount - guessCount; // TODO: what happens if I don't run this here?
    answerSix = prompt('Which countries did I go to for my work?', 'You have ' + remainingGuesses + ' guesses!').toLowerCase();
    if (answerSix === myLocations[0] || answerSix === myLocations[1] || answerSix === myLocations[4]){
      alert('Yes! I love a little puddle jumping!');
      correctAnswerCount++;
      break;
    } else if (answerSix === myLocations[2] || answerSix === myLocations[3]){
      alert('Correct! I\'ve been to both of our land-connected neighbors!');
      correctAnswerCount++;
      break;
    } else {
      guessCount++;
      remainingGuesses = correctAnswerCount - guessCount; // TODO: And why is this code important here?
      // alert('Keep guessing, you\'ll get there!  You have ' + remainingGuesses + ' guesses remaining.')
    }

    if (guessCount === 6) {
      alert('Ah, no countries guessed. :\\');
    }
  }
  

}

function myCountries(){
  for (var i = 0; i < myLocations.length; i++){
    alert('I have been to ' + myLocations[i].charAt(0).toUpperCase() + myLocations[i].slice(1) + '.');
  }
}

//================ CODE RUN ============

getName();
getAnswerOne();
getAnswerTwo();
getAnswerThree();
getAnswerFour();
getAnswerFive();

userCorrect();

alert('Alright, moving on!');

guessCountry();

alert('Okay, here are all I\'ve been to:');

myCountries();

alert('And that\'s the game! We\'ve been great! You got ' + correctAnswerCount + ' questions correct out of 7 questions!');
