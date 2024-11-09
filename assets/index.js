"use strict";
let player = {
    name: "",
    chips: 10000
};
let dealerCards = [];
let playerCards = [];
let playerSum;
let dealerSum;
const startGame = document.getElementById("startGame");
const submitButton = document.getElementById("submit-name");
const nameSection = document.getElementById("name-section");
const gameSection = document.getElementById("game-section");
const playerSection = document.getElementById("player-section");
const dealerSection = document.getElementById("dealer-section");
let playerSumEl = document.getElementById("player-sum-el");
let dealerSumEl = document.getElementById("dealer-sum-el");
let playerCardEl = document.getElementById("player-cards");
let dealerCardEl = document.getElementById("dealer-cards");
if (startGame) {
    startGame.addEventListener("click", () => {
        document.getElementById("landing-section").style.display = "none";
        nameSection.style.display = "block";
    });
}
if (submitButton) {
    submitButton.addEventListener("click", () => {
        player.name = document.getElementById("player-name").value;
        nameSection.style.display = "none";
        gameSection.style.display = "flex";
        let dealerFirstCard = getRandomCard();
        dealerCards.push(dealerFirstCard);
        renderDealerCards();
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
    return { value: cardValue, cardImage: cardImage };
}
function renderDealerCards() {
    dealerCardEl.innerHTML = "";
    dealerSumEl.textContent = "Sum: " + dealerSum;
    for (let i = 0; i < dealerCards.length; i++) {
        let cardImage = document.createElement("img");
        cardImage.src = dealerCards[i].cardImage;
        cardImage.style.width = "100px";
        dealerCardEl.appendChild(cardImage);
    }
}
