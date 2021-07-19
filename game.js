var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var randomNum;
var level=0;
var high=0;


function validateAndGetFormData() {
    var jsonStrObj = {  
          name: "maximum"
       };
 return JSON.stringify(jsonStrObj);
}


function nextSequence()
{
  userClickedPattern=[];
     randomNum= Math.random()*4;
    randomNum= Math.floor(randomNum);


var randomChosenColour= buttonColours[randomNum];

gamePattern.push(randomChosenColour);
console.log(gamePattern);
animatePress(randomChosenColour);
playSound(randomChosenColour);
$("h1").text("Level "+level);
$("h2").text(" ");
level++;
 
}
var i=0;
  $(".btn").click(function(){
   
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
   
  
  })
 
   function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
   }
   function animatePress(currenColour)
   {
     $("#"+currenColour).addClass("pressed");
     setTimeout(function(){
       $("#"+currenColour).removeClass("pressed");
     },100);
   }
   
$(document).keypress(function(){
  if(level==0)
 nextSequence();
  
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
   console.log(" success");  
 if(gamePattern.length==userClickedPattern.length)
   {
     setTimeout(function(){
       nextSequence();
     
   },1000);
  }
}else{
  console.log("fail");
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);
   if(high<level){
    high=level;    
   }
   $("h1").text("GAME OVER. PRESS ANY KEY TO RESTART");
   $("h2").text("score : "+level+" highest score : "+high);
   level=0;
   gamePattern=[];
   
  }

}

