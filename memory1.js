document.addEventListener("DOMContentLoaded",function(){
    var grid=document.getElementById("game-grid");
    var miniGameGrid=document.getElementById("mini-game-grid");
    var levelDisplay=document.getElementById("level");
    var timeDisplay=document.getElementById("time");
    var movesDisplay=document.getElementById("moves");
    var coinsDisplay=document.getElementById("coins");
    var miniGameSection=document.getElementById("mini-game");
    var restartMainBtn=document.getElementById("restart-main");
    var level=1;
    var coins=0;
    var timeLeft=30;
    var movesLeft=20;
    var timerInterval;
    var flippedCards=[];
    var matchedPairs=0;
    
function startGame(){
    resetGame();
    createGrid();
    startTimer();
}

function resetGame(){
    grid.innerHTML="";
    miniGameSection.style.display="none";
    grid.style.display="grid";
    flippedCards=[];
    matchedPairs=0;
    timeLeft=30+level*5;
    movesLeft=20+level*2;
    timeDisplay.textContent=timeLeft;
    movesDisplay.textContent=movesLeft;
}

function startTimer(){
    clearInterval(timerInterval);
    timerInterval=setInterval(function(){
    timeLeft--;
    timeDisplay.textContent=timeLeft;
if(timeLeft<=0){
    clearInterval(timerInterval);
    endGame(false);
 }
},1000);
}

function endGame(won){
    clearInterval(timerInterval);
if(won){
    coins+=level*10;
    coinsDisplay.textContent=coins;
    alert("You completed level "+level+"! Coins earned: "+level*10);
    level++;
    levelDisplay.textContent=level;
    startGame();
}else{
    alert("Game Over! Proceed to Mini Game.");
    startMiniGame();
}
}

function flipCard(card){
    if(flippedCards.length<2&&card.className.indexOf("flipped")===-1){
    card.className+=" flipped";
    flippedCards.push(card);
    if(flippedCards.length===2){
    checkMatch();
        }
    }
}

function checkMatch(){
    movesLeft--;
    movesDisplay.textContent=movesLeft;
    var card1=flippedCards[0];
    var card2=flippedCards[1];
if(card1.textContent===card2.textContent){
    card1.className+=" matched";
    card2.className+=" matched";
    flippedCards=[];
    matchedPairs++;
if(matchedPairs===level*2){
    setTimeout(function(){
    endGame(true);
    },500);
    }
}else{
    setTimeout(function(){
    card1.className=card1.className.replace("flipped","").trim();
    card2.className=card2.className.replace("flipped","").trim();
    flippedCards=[];
    },1000);
    }
if(movesLeft<=0){
    endGame(false);
}
}

function createGrid(){
    var numPairs=level*2;
    var cardValues=generateCardValues(numPairs);
    shuffleArray(cardValues);
for(var i=0;i<cardValues.length;i++){
    var card=document.createElement("div");
    card.className="card flipped";
    card.textContent=cardValues[i];
    card.addEventListener("click",function(){
    flipCard(this);
    });
grid.appendChild(card);
}
var gridSize=Math.max(5,Math.sqrt(numPairs*2));
grid.style.gridTemplateColumns="repeat("+Math.floor(gridSize)+",80px)";
setTimeout(function(){
var allCards=document.querySelectorAll(".card");
allCards.forEach(function(card){
card.className=card.className.replace("flipped","").trim();
});
},2000);
}

function generateCardValues(numPairs){
    var values=[];
    for(var i=1;i<=numPairs;i++){
    values.push(i);
    values.push(i);
    }
    return values;
}

function shuffleArray(array){
    for(var i=array.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var temp=array[i];
    array[i]=array[j];
    array[j]=temp;
    }
}

function startMiniGame(){
    console.log("Starting Mini Game...");
    clearInterval(timerInterval);
    grid.style.display="none";
    miniGameSection.style.display="block";
    createMiniGameGrid();
}

function createMiniGameGrid(){
    miniGameGrid.innerHTML="";
    var gridSize=5;
    var hiddenCoinPosition=Math.floor(Math.random()*gridSize*gridSize);
    for(let i=0;i<gridSize*gridSize;i++){
    var tile=document.createElement("div");
    tile.className="card";
    tile.textContent="";
    tile.addEventListener("click",function(){
    if(coins<5){
        alert("Not enough coins to play!");
    return;
    }
    if(this.className.indexOf("flipped")===-1){
        coins-=5;
        coinsDisplay.textContent=coins;
        this.className+=" flipped";
    if(i===hiddenCoinPosition){
        this.textContent="🏆";
        this.style.backgroundColor="green";
        setTimeout(function(){
        alert("You found the hidden coin!");
        startGame();
    },500);
    }else{
        this.textContent="❌";
    }
    }
    });
    miniGameGrid.appendChild(tile);
    }
    miniGameGrid.style.gridTemplateColumns="repeat("+gridSize+",80px)";
}

restartMainBtn.addEventListener("click",function(){
    console.log("Restarting Main Game...");
    startGame();
});

    startGame();
});
