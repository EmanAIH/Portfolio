const gameBoard = document.getElementById("board");
const startBtn = document.getElementById("startBtn")
const timeDisplay = document.getElementById("timeDisplay")
const moveCountDisplay = document.getElementById("moveCount")

/**  Set the arrays for the cards  and the variables **/
let cards =[];
let flippedCards = [];
let matchedCards =[];
let moves =0;
let timer;
let timeElapsed =0;

const backImg= "images/back-img.png";
const images= [
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png",
    "images/img6.png",
    "images/img7.png",
    "images/img8.png",
];

let cardImages =[...images, ...images]


/** Function to generate the game board with random cards **/


/**   function to huffle the cards **/
function shuffle(array) {
    return array.sort(()=> Math.random()-0.5);
};

/** Function to create a game board **/

function createBoard(imgSrc, index){
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image =imgSrc;
    card.innerHTML =` <img src ="${backImg}" class="card-back" >
    <img src="${imgSrc}" class = "card-front hidden" >`
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
    cards.push({card, index});
}

/**  function to create the cards **/

function createCards(){
    for (let i = 0; i < cardImages.length; i++){
        createBoard(cardImages[i], i);
    }
}



/** Function to flip the card **/

function flipCard(){
    if (flippedCards.length <2 && !this.classList.contains("matched") && !flippedCards.includes(this)){
        this.classList.add("flipped");

        this.querySelector(".card-back").classList.add("hidden");
        this.querySelector(".card-front").classList.remove("hidden");
        flippedCards.push(this);

        if(flippedCards.length === 2){
            setTimeout(checkMatch, 800);
        }
    }
}

/** Function to check if the two flipped cards match **/

function checkMatch(){
    let [card1, card2]= flippedCards;

    if(card1.dataset.image === card2.dataset.image){
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
    } else{
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");

            card1.querySelector(".card-front").classList.add("hidden");
            card2.querySelector(".card-front").classList.add("hidden");

            card1.querySelector(".card-back").classList.remove("hidden");
            card2.querySelector(".card-back").classList.remove("hidden");
        }, 500);
    }
    flippedCards = [];
    moves++;
    moveCountDisplay.textContent = moves;

    if (matchedCards.length === cardImages.length){
        clearInterval(timer);
        alert(`Congratulations! You've won the game in ${moves} moves and ${timeElapsed} secons`);
    }
}


/** Function to start the game **/

function startGame(){
    gameBoard.innerHTML='';  // Clear the board before creating new cards
    moves = 0;
    timeElapsed = 0;
    moveCountDisplay.textContent = moves;
    timeDisplay.textContent = timeElapsed;
    matchedCards= [];
    flippedCards = [];
    cards = [];  


    cardImages= shuffle([...images, ...images]) // Shuffle the cards before starting the game
    createCards();
    clearInterval(timer);
    timer = setInterval(()=> {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000);
}

/** Start the game when the start button is clicked **/
startBtn.addEventListener("click", startGame);
