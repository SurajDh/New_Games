const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

const overlayElement=document.getElementById('config-overlay');


let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        overlayElement.children[1].textContent='Time off! '+ `${correctWord.toUpperCase()}`+ ' was the correct word';
        overlayElement.style.display='block';
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord){
        overlayElement.children[1].textContent='Please enter the word to check!';
        return (overlayElement.style.display='block');
    }   
    else if(userWord !== correctWord){
        overlayElement.children[1].textContent='Oops! ' + inputField.value.toUpperCase() + ' is not the correct word';
        return (overlayElement.style.display='block');
    }    
    else {
        
        overlayElement.children[1].textContent='Congrats! ' + `${correctWord.toUpperCase()}` + ' is the correct word';
        return (overlayElement.style.display='block');
    }
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

