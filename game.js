var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;
var randomNumber;
var randomChosenColor;
var level = 0;
var started = false;

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound (name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence () {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); 
    for(let i = 0; i < gamePattern.length; i++) { 
        setTimeout(function() {    
            playSound(gamePattern[i]);
            animatePress(gamePattern[i]);
        }, 500 * i);
    }
    level++;
    $("h1").text("Level " + level);
}

function gameOver () {
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    playSound("wrong");
    $("body").removeClass("retro");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
        $("body").addClass("retro");
    }, 200);
}

function checkAnswer (currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        gameOver();
    }
}

$("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
var audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
audio.play();

 $(".btn").click(function(event) {
    if(started) {    
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
    }
 });

 $(document).keypress(function() {
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
 });