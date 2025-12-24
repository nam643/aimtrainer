//animation
var card = $(".card *");

card.fadeToggle();

setTimeout(() => {
  card.fadeToggle(1000);
}, 2000);

//game logic
var time = 0;
var point = 0;
var tmp = 0;
var clicked = false;
card.on("click", function (event) {
  clicked = false;
  time = 0;
  point = 0;
  $("#point").text(point);
  if (event.target.id === "shortTime") {
    time = 5;
    $("#clock").text(time);
  } else if (event.target.id === "middleTime") {
    time = 10;
    $("#clock").text(time);
  } else if (event.target.id === "longTime") {
    time = 30;
    $("#clock").text(time);
  }
  $("#board").addClass("startbtn");
  scrollToTarget();
  tmp = time;
});

$("#board").on("click",function(){
  if($("#board").hasClass("startbtn")){
    clockElapse();
    $("#board").removeClass("startbtn");
    $("#board").text("");
  }
  play();
})

function play() {
  $(".gamePlay").css("display", "block");
  $("#board").append("<img src=./images/target.png class=target>");
  let top = Math.floor(Math.random() * $("#board").height());
  let left = Math.floor(Math.random() * $("#board").width());
  $(".target").css("top", `${top-50}px`);
  $(".target").css("left", `${left-50}px`);

  $(".target").on("click", () => {
    playSound("pop");
    $(".target").remove();
    point++;
    $("#point").text(point);
    clicked = true;
    play();
  });
}

function clockElapse() {
  function Tick() {
    time--;
    $("#clock").text(time);
    
    if (time === 0) {
      $("#clock").text("0");
      setTimeout(()=>{$(".gamePlay").css("display", "none");},500);
      
      setTimeout(displayResult, 1000);
    }
    
    
  }

  const timingIntervalId = setInterval(Tick, 1000);

  setTimeout(() => {
    clearInterval(timingIntervalId);
  }, tmp * 1000);
}


function scrollToTarget() {
  const $target = $(".gamePlay");

  $target.slideDown(0, function () {
    $("html, body").animate({
      scrollTop: $target.offset().top
    }, 500);
  });
}

function displayResult(){
  let res = point/tmp;
  alert(`Your result is ${res.toFixed(2)} dots per second`);
}

function playSound(name){
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}