// Step 4 - 3. At the top of the game.js file, 
//create a new empty array with the name userClickedPattern.

var userClickedPattern = [];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//3. At the top of the game.js file, create a new array called buttonColours and set it
// to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];



// Step 7
// 1. Use jQuery to detect when a keyboard key has been pressed, when that happens for
// the first time, call nextSequence().

var started = false;

// Step 7 - 2. Create a new variable called level and start at level 0.

var level = 0;

$(document).keydown(function() {
     
     if (started == false) {
     nextSequence(); 
     started = true; 

     // Step 7 - 3. The h1 title starts out saying "Press A Key to Start", when the game 
     // has started, change this to say "Level 0".
     $("#level-title").text("Level " + level);

}

})


// 1. Inside game.js create a new function called nextSequence()
function nextSequence(){

     // Step 7 - 4. Inside nextSequence(), increase the level by 1 every time 
     // nextSequence() is called.
     level = level + 1; 

     // Step 7 - 5. Inside nextSequence(), update the h1 with this change in the value 
     // of level.
     $("#level-title").text("Level " + level);
     
     //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
     var randomNumber = Math.floor(Math.random() * 4);

     //4. Create a new variable called randomChosenColour and use the randomNumber from
     // step 2 to select a random colour from the buttonColours array.
     var randomChosenColour = buttonColours[randomNumber];

     //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
     gamePattern.push(randomChosenColour);


     //Step 3

     // 1. Use jQuery to select the button with the same id as the randomChosenColour
     $("#" + randomChosenColour ).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);

     //3. Use Google/Stackoverflow to figure out how you can use Javascript to play 
     //the sound for the button colour selected in step 1.
     // var audio = new Audio('sounds/' + randomChosenColour +'.mp3');
     // audio.play();

     // Step 5 - 4. Refactor the code in playSound() so that it will work for both
     // playing sound in nextSequence() and when the user clicks a button.
     playSound(randomChosenColour);

     return randomChosenColour;
}


// Step 4

// 1. Use jQuery to detect when any of the buttons are clicked 
// and trigger a handler function.

$(".btn").click(function() {
     
     // 2. Inside the handler, create a new variable called userChosenColour to store 
     // the id of the button that got clicked.

     //--> So if the Green button was clicked, userChosenColour will equal its id which is "green".

     var userChosenColour = $(this).attr("id");
     console.log(userChosenColour);

    

     // Step 5 - 1. In the same way we played sound in nextSequence() , when a user 
     // clicks on a button, the corresponding sound should be played. e.g 
     // if the Green button is clicked, then green.mp3 should be played.
     
     // var audioClick = new Audio('sounds/' + userChosenColour +'.mp3');
     // audioClick.play();

     // Step 4 - 4. Add the contents of the variable userChosenColour created in step 2 to the 
     // end of this new userClickedPattern

     userClickedPattern.push(userChosenColour);

     console.log(userClickedPattern);

     // Step 5 - 4. Refactor the code in playSound() so that it will work for both
     // playing sound in nextSequence() and when the user clicks a button.
     playSound(userChosenColour);

     // Step 6 - 3. Use jQuery to add this pressed class to the button that gets clicked
     // inside animatePress().
     animatePress(userChosenColour);

      // Step 8 - 2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the 
// index of the last answer in the user's sequence.

checkAnswer(userClickedPattern.length-1);
     // return userChosenColour;
});



// Step 8 - 1. Create a new function called checkAnswer(), it should take one input 
// with the name currentLevel

function checkAnswer(currentLevel) {

     // Step 8 - 3. Write an if statement inside checkAnswer() to check if the most recent user answer is
     // the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

          console.log("Success");

          // 4. If the user got the most recent answer right in step 3, then check that they have finished 
          // their sequence with another if statement.
          if  (gamePattern.length === userClickedPattern.length) { 
               console.log(gamePattern);
               console.log(userClickedPattern);
               
               // 5. Call nextSequence() after a 1000 millisecond delay.
               setTimeout(() => {
                    nextSequence();
                }, 1000);
               
                // 6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready 
                // for the next level.
                userClickedPattern = [];
          }
          
     }  
     else { 

          // Step 9 - 1. In the sounds folder, there is a sound called wrong.mp3, play this sound if
          // the user got one of the answers wrong.
          var audio1 = new Audio('sounds/wrong.mp3');
          audio1.play();

          // Step 9 - 2. In the styles.css file, there is a class called "game-over", 
          // apply this class to the body of the website when the user gets one of the answers wrong
          // and then remove it after 200 milliseconds.
          
          $("body").addClass("game-over");

          console.log("Wrong");

          setTimeout(function() {
               $("body").removeClass("game-over");
           }, 200);
          
          // 3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the 
          // answer wrong.
          
          $("h1").text("Game Over, Press Any Key to Restart");
          
          // 2. Call startOver() if the user gets the sequence wrong.

           startOver();

          }  
}

// Step 5- 2. Create a new function called playSound() that takes a single input 
// parameter called name.

function playSound(name) {
     // Step 5 - 3. Take the code we used to play sound in the nextSequence() function
     // and move it to playSound().
     // Step 5 - 4. Refactor the code in playSound() so that it will work for both
     // playing sound in nextSequence() and when the user clicks a button.
     var audio = new Audio('sounds/' + name +'.mp3');
     audio.play();
}



// Step 6 - 1. Create a new function called animatePress(), it should take a single input 
// parameter called currentColour.

function animatePress(currentColour) {
     $("#" + currentColour).addClass("pressed");

     // 4. use Google/Stackoverflow to figure out how you can use Javascript to remove the 
     // pressed class after a 100 milliseconds.
     setTimeout(function() {
          $("#" + currentColour).removeClass("pressed");
          }, 100);
}

// Step 10 - 1. Create a new function called startOver()

function startOver() {

     // Step 10 - 3. Inside this function, you'll need to reset the values of level,
     // gamePattern and started variables.
     level = 0;
     started = false;
     gamePattern = [];
}