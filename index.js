var buttonColours = ["green", "red","yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var max_level = 0;

$('.start-btn').click(function() {
  if (!started) {
    $(".error").css('display','none');
    nextSequence();
    $(".start-btn").css('visibility', 'hidden');
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      level++;
      $(".your-score span").text(level);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $(".btn").addClass("game-over");
    setTimeout(function () {
      $(".btn").removeClass("game-over");
    }, 100);
    $(".error").css('display','initial');
    $(".start-btn").css('visibility','visible')
    $(".your-score span").text("0");
    if(level>max_level){
      max_level = level;
    }
    $(".best-scroe span").text(max_level);
    startOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}