let player : {name: string, chips: number} = {
    name: "",
    chips: 10000
}

const startGame = document.getElementById("startGame")
const submitButton = document.getElementById("submit-name")
const nameSection = document.getElementById("name-section")
const gameSection = document.getElementById("game-section")

if (startGame) {
    startGame.addEventListener("click", () => {
        document.getElementById("landing-section")!.style.display = "none"
        nameSection!.style.display = "block"
    })
}

if (submitButton) {
    submitButton.addEventListener("click", () => {
        player.name = (document.getElementById("player-name") as HTMLInputElement).value
        nameSection!.style.display = "none"
        gameSection!.style.display = "flex"
    })
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    let cardValue = randomNumber > 10 ? 10 : randomNumber
    let cardImage

    let suits: string[] = ["hearts", "spades", "diamonds", "clubs"]
    let randomSuit = suits[Math.floor(Math.random() * suits.length)]

    if (randomNumber === 1) {
        cardImage = "assets/images/ace_of_" + randomSuit + ".png"
        cardValue = 11
    } else if (randomNumber === 11) {
        cardImage = "assets/images/jack_of_" + randomSuit + ".png"
    } else if(randomNumber === 12) {
        cardImage = "assets/images/queen_of_" + randomSuit + ".png"
    } else if(randomNumber === 13) {
        cardImage = "assets/images/king_of_" + randomSuit + ".png"
    } else {
        cardImage = "assets/images/" + randomSuit + "_of_" + randomSuit + ".png"
    }

    return { value: cardValue, cardImage: cardImage }
}