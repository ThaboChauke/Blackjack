type Card = {
    value: number
    image: string
}

let player : {name: string, chips: number} = {
    name: "",
    chips: 10000
}
let dealerCards: Card[] = []
let playerCards: Card[] = []
let playerSum: number
let dealerSum: number
let hasBlackjack: boolean = false
let isAlive: boolean = false
let message: string

const startGame = document.getElementById("startGame")
const submitButton = document.getElementById("submit-name")
const nameSection = document.getElementById("name-section")
const gameSection = document.getElementById("game-section")
const landingSection = document.getElementById("landing-section")

const newCardEl = document.getElementById("newCard")
const surrender = document.getElementById("surrender")
const playerEl = document.getElementById("player-el")
const messageEl = document.getElementById("message-el")

let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let playerCardEl = document.getElementById("player-cards")
let dealerCardEl = document.getElementById("dealer-cards")

if (startGame) {
    startGame.addEventListener("click", () => {
        landingSection!.style.display = "none"
        nameSection!.style.display = "block"
    })
}

if (submitButton) {
    submitButton.addEventListener("click", () => {
        let name = (document.getElementById("player-name") as HTMLInputElement).value
        if (name === "") {
            player.name = "Player 1"
        } else {
            player.name = name
        }
        playerEl!.textContent = player.name + ": R" + player.chips

        nameSection!.style.display = "none"
        gameSection!.style.display = "flex"

        runGame()
    })
}

function getRandomCard() : Card {
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
        cardImage = "assets/images/" + randomNumber + "_of_" + randomSuit + ".png"
    }
    return { value: cardValue, image: cardImage }
}

function renderDealerCards(): void {
    dealerCardEl!.innerHTML = ""
    dealerSumEl!.textContent = "Sum: " + dealerSum

    for (let i = 0; i < dealerCards.length; i++) {
        let cardImage = document.createElement("img")
        cardImage.src = dealerCards[i].image
        cardImage.style.width = "100px"
        dealerCardEl!.appendChild(cardImage)
    }
}

function renderGame(): void {
    playerCardEl!.innerHTML = ""
    for (let i = 0; i < playerCards.length; i++) {
        let cardImage = document.createElement("img")
        cardImage.src = playerCards[i].image
        cardImage.style.width = "100px"
        playerCardEl!.appendChild(cardImage)
    }

    playerSumEl!.textContent = "Sum: " + playerSum
}

function runGame(): void {
    isAlive = true
    dealerCards = []
    dealerSum = 0

    let dealerFirstCard = getRandomCard()
    dealerCards.push(dealerFirstCard)
    dealerSum += dealerFirstCard.value

    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    playerSum = firstCard.value + secondCard.value
    playerCards = [firstCard, secondCard]

    renderGame()
    renderDealerCards()
}

newCardEl!.addEventListener("click", () => {
    if (!hasBlackjack && isAlive) {
        let newCard = getRandomCard()
        playerSum += newCard.value
        playerCards.push(newCard)
        renderGame()
    }
})

surrender!.addEventListener("click", () => {
    gameSection!.style.display = "none"
    landingSection!.style.display = "flex"
})