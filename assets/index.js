"use strict";
let player = {
    name: "",
    chips: 500
};
let dealerCards = [];
let playerCards = [];
let playerSum;
let dealerSum;
let hasBlackjack = false;
let isAlive = false;
let message;
const startGame = document.getElementById("startGame");
const submitButton = document.getElementById("submit-name");
const nameSection = document.getElementById("name-section");
const gameSection = document.getElementById("game-section");
const landingSection = document.getElementById("landing-section");
const newCardEl = document.getElementById("newCard");
const surrender = document.getElementById("surrender");
const playerEl = document.getElementById("player-el");
const messageEl = document.getElementById("message-el");
const startOver = document.getElementById("reset");
const standEl = document.getElementById("stand");
const anotherRoundEl = document.getElementById("anotherRound");
let playerSumEl = document.getElementById("player-sum-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
let playerCardEl = document.getElementById("player-cards");
let dealerCardEl = document.getElementById("dealer-cards");
if (startGame) {
    startGame.addEventListener("click", () => {
        landingSection.style.display = "none";
        nameSection.style.display = "block";
    });
}
if (submitButton) {
    submitButton.addEventListener("click", () => {
        let name = document.getElementById("player-name").value;
        if (name === "") {
            player.name = "Player 1";
        }
        else {
            player.name = name;
        }
        playerEl.textContent = player.name + ": R" + player.chips;
        nameSection.style.display = "none";
        gameSection.style.display = "flex";
        runGame();
    });
}
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    let cardValue = randomNumber > 10 ? 10 : randomNumber;
    let cardImage;
    let suits = ["hearts", "spades", "diamonds", "clubs"];
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];
    if (randomNumber === 1) {
        cardImage = "assets/images/ace_of_" + randomSuit + ".png";
        cardValue = 11;
    }
    else if (randomNumber === 11) {
        cardImage = "assets/images/jack_of_" + randomSuit + ".png";
    }
    else if (randomNumber === 12) {
        cardImage = "assets/images/queen_of_" + randomSuit + ".png";
    }
    else if (randomNumber === 13) {
        cardImage = "assets/images/king_of_" + randomSuit + ".png";
    }
    else {
        cardImage = "assets/images/" + randomNumber + "_of_" + randomSuit + ".png";
    }
    return { value: cardValue, image: cardImage };
}
function renderDealerCards() {
    dealerCardEl.innerHTML = "";
    dealerSumEl.textContent = "Sum: " + dealerSum;
    for (let i = 0; i < dealerCards.length; i++) {
        let cardImage = document.createElement("img");
        cardImage.src = dealerCards[i].image;
        cardImage.style.width = "100px";
        dealerCardEl.appendChild(cardImage);
    }
}
function renderGame() {
    playerCardEl.innerHTML = "";
    for (let i = 0; i < playerCards.length; i++) {
        let cardImage = document.createElement("img");
        cardImage.src = playerCards[i].image;
        cardImage.style.width = "100px";
        playerCardEl.appendChild(cardImage);
    }
    playerSumEl.textContent = "Sum: " + playerSum;
    checkGameOutcome();
}
function runGame() {
    isAlive = true;
    dealerCards = [];
    dealerSum = 0;
    let dealerFirstCard = getRandomCard();
    dealerCards.push(dealerFirstCard);
    dealerSum += dealerFirstCard.value;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    playerSum = firstCard.value + secondCard.value;
    playerCards = [firstCard, secondCard];
    renderGame();
    renderDealerCards();
}
if (newCardEl) {
    newCardEl.addEventListener("click", () => {
        if (!hasBlackjack && isAlive) {
            let newCard = getRandomCard();
            playerSum += newCard.value;
            playerCards.push(newCard);
            let dealersCard = getRandomCard();
            dealerCards.push(dealersCard);
            dealerSum += dealersCard.value;
            renderGame();
        }
    });
}
if (surrender) {
    surrender.addEventListener("click", () => {
        gameSection.style.display = "none";
        landingSection.style.display = "flex";
    });
}
if (startOver) {
    startOver.addEventListener("click", () => {
        message = "Try Your Luck";
        dealerCards = [];
        playerCards = [];
        isAlive = false;
        hasBlackjack = false;
        player.chips = 500;
        runGame();
    });
}
function checkGameOutcome() {
    if (playerSum > 21) {
        message = "You went over 21. Dealer wins!";
        isAlive = false;
    }
    else if (dealerSum > 21) {
        message = "Dealer went over 21. You win!";
        player.chips += 100;
        isAlive = false;
    }
    else if (playerSum === 21 && dealerSum !== 21) {
        message = "Blackjack! You win!";
        player.chips += 150;
        hasBlackjack = true;
    }
    else if (dealerSum === 21 && playerSum !== 21) {
        message = "Dealer has Blackjack. Dealer wins!";
        isAlive = false;
    }
    else if (playerSum === dealerSum) {
        message = "It's a tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You win!";
        player.chips += 100;
    }
    else if (player.chips <= 0) {
        message = "You lose!. Out of Funds";
        isAlive = false;
    }
    else {
        message = "Dealer wins!";
        player.chips -= 100;
    }
    messageEl.textContent = message;
    playerEl.textContent = `${player.name}: R${player.chips}`;
}
function dealerPlay() {
    while (dealerSum < 17 && isAlive && !hasBlackjack) {
        let newCard = getRandomCard();
        dealerCards.push(newCard);
        dealerSum += newCard.value;
    }
    renderDealerCards();
    checkGameOutcome();
}
if (standEl) {
    standEl.addEventListener("click", () => {
        dealerPlay();
        checkGameOutcome();
    });
}
if (anotherRoundEl) {
    anotherRoundEl.addEventListener("click", () => {
        message = "Try Your Luck";
        dealerCards = [];
        playerCards = [];
        isAlive = false;
        hasBlackjack = false;
        runGame();
    });
}
