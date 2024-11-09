"use strict";
let player = {
    name: "",
    chips: 10000
};
const startGame = document.getElementById("startGame");
const submitButton = document.getElementById("submit-name");
const nameSection = document.getElementById("name-section");
const gameSection = document.getElementById("game-section");
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
    });
}
