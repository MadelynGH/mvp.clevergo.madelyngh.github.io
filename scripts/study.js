if (localStorage.getItem("clevergo_flashcards") === null) {
    location.href = "/create";
}

if (localStorage.getItem("clevergo_xp") === null) {
    localStorage.setItem("clevergo_xp", 0);
}

const flashcard = document.getElementById("flashcard");
const flashcardText = document.getElementById("flashcard-text");

const flipButton = document.getElementById("flip");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

const volumeInput = document.getElementById("volume-input");
const soundFXInput = document.getElementById("sound-fx-input");
const xpDisplay = document.getElementById("xp-display");
const levelDisplay = document.getElementById("level-display");
const deleteFlashcards = document.getElementById("delete-flashcards");

const set = JSON.parse(localStorage.getItem("clevergo_flashcards"));

if (localStorage.getItem("clevergo_currentFlashcard") === null) {
    localStorage.setItem("clevergo_currentFlashcard", 0);
}
let currentFlashcard = localStorage.getItem("clevergo_currentFlashcard");

if (localStorage.getItem("clevergo_qOrA") === null) {
    localStorage.setItem("clevergo_qOrA", "q");
}

let qOrA = localStorage.getItem("clevergo_qOrA");

const numOfFlashcards = Object.keys(set).length;

xpDisplay.innerHTML = localStorage.getItem("clevergo_xp");
levelDisplay.innerHTML = parseInt(parseInt(xpDisplay.innerHTML) / 300);

const updateXP = function(amount) {
    localStorage.setItem("clevergo_xp", parseInt(localStorage.getItem("clevergo_xp")) + amount);
    xpDisplay.innerHTML = parseInt(xpDisplay.innerHTML) + amount;
    levelDisplay.innerHTML = parseInt(parseInt(xpDisplay.innerHTML) / 300);
    wand = new Audio("/sound/Wand.wav");
    wand.volume = soundFXInput.value;
    wand.play();
}

const updateFlashcard = function() {
    if (qOrA === "q") {
        flashcardText.innerHTML = Object.keys(set)[parseInt(currentFlashcard)];
    } else {
        flashcardText.innerHTML = set[Object.keys(set)[currentFlashcard]];
        updateXP(10);
    }

    // flashcardText.style.fontSize = 100 - flashcardText.innerHTML.length + "px";

    // if (!(flashcardText.innerHTML.includes(" ")) && flashcard.innerHTML.length > 6) {
    //     flashcardText.style.width = flashcardText.innerHTML.length * 10 + "px";
    // }
}

updateFlashcard();

flashcard.addEventListener("click", function() {
    qOrA = (qOrA == "q") ? "a" : "q";
    localStorage.setItem("clevergo_qOrA", qOrA);
    updateFlashcard();
});

flipButton.addEventListener("click", function() {
    // let qOrAToSet = (qOrA == "q") ? "a" : "q";
    // localStorage.setItem("clevergo_qOrA", qOrAToSet);
    // updateFlashcard();
});

rightArrow.addEventListener("click", function() {
    qOrA = "q";
    localStorage.setItem("clevergo_qOrA", qOrA);
    if (currentFlashcard < numOfFlashcards - 1) {
        flashcard.style.visibility = "hidden";
        setTimeout(function() {
            currentFlashcard ++;
            localStorage.setItem("clevergo_currentFlashcard", currentFlashcard);
            flashcard.style.visibility = "visible";
            updateFlashcard();
        }, 700);
    }
});

leftArrow.addEventListener("click", function() {
    qOrA = "q";
    localStorage.setItem("clevergo_qOrA", qOrA);
    if (currentFlashcard > 0) {
        flashcard.style.visibility = "hidden";
        setTimeout(function() {
            currentFlashcard --;
            localStorage.setItem("clevergo_currentFlashcard", currentFlashcard);
            flashcard.style.visibility = "visible";
            updateFlashcard();
        }, 700);
    }
});

deleteFlashcards.addEventListener("click", function() {
    localStorage.removeItem("clevergo_flashcards");
    localStorage.removeItem("clevergo_currentFlashcard");
    localStorage.removeItem("clevergo_qOrA");
    location.reload();
});

const springUpbeat = new Audio("/sound/Spring Upbeat.mp3")
springUpbeat.loop = "looping";

document.body.addEventListener("click", function() {
    springUpbeat.play();
});

volumeInput.addEventListener("input", function() {
    springUpbeat.volume = volumeInput.value;
});