const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');
const INITIAL_TIME = 30;
const TEXT = 'the quick brown fox jumps over the lazy dog while typing practice requires consistent effort and dedication to improve speed and accuracy across different keyboard layouts modern technology has transformed how we communicate through digital interfaces making typing skills more essential than ever before programmers developers writers and students benefit greatly from enhanced typing abilities that reduce strain and increase productivity during long working sessions proper finger placement breathing techniques and regular breaks help maintain focus throughout extended practice periods online typing tests provide immediate feedback about words per minute accuracy rates and areas needing improvement challenging yourself with varied text complexity builds muscle memory for common letter combinations punctuation marks and special characters frequently used in professional writing environments consistent daily practice even for short fifteen minute sessions yields better long term results than sporadic intensive training blocks ergonomic keyboards mechanical switches and adjustable desk heights contribute significantly to comfortable typing experiences that prevent repetitive strain injuries while maintaining optimal performance levels throughout demanding work schedules';

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
    words = TEXT.split(' ').slice(0, 32);
    currentTime = INITIAL_TIME;

    $time.textContent = currentTime;
    $paragraph.innerHTML = words.map((word, index) => {
        const letters = word.split('');
        return `<x-word>
            ${letters
                .map(letter => `<x-letter>${letter}</x-letter>`)
                .join('')
            }
        </x-word>`
    }).join('');

    $firstWord = $paragraph.querySelector('x-word');
    $firstWord.classList.add('active');
    $firstWord.querySelector('x-letter').classList.add('active');

    const intervalId = setInterval(() => {
        $time.textContent = --currentTime;
        if(currentTime === 0) {
            clearInterval(intervalId);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    console.log("game over");
}

function initEvents() {
    document.addEventListener('keydown', () => {
        $input.focus();
    })
    $input.addEventListener('keydown', onKeyDown);
    $input.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
    $currentWord = $paragraph.querySelector('x-word.active')
    $currentLetter = $currentWord.querySelector('x-letter.active')
    const { key } = event;
    if(key === ' ') {
        event.preventDefault();

        const $nextWord = $currentWord.nextElementSibling;
        const $nextLetter = $nextWord.querySelector("x-letter");
        
        $currentLetter.classList.remove('active');
        $currentWord.classList.remove('active');
     
        $nextWord.classList.add('active');
        $nextLetter.classList.add('active');

        $input.value = '';
    }
}

function onKeyUp() {
    // recuperamos los elementos actuals
    const $currentWord = $paragraph.querySelector('x-word.active');
    const $currentLetter = $currentWord.querySelector('x-letter.active');

    const currentWord = $currentWord.innerText.trim();
    $input.maxLength = currentWord.length;

    const $allLetters = $currentWord.querySelectorAll('x-letter');

    $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'));

    $input.value.split('').forEach((char, index) => {
      const $letter = $allLetters[index]
      const letterToCheck = currentWord[index]

      const isCorrect = char === letterToCheck
      const letterClass = isCorrect ? 'correct' : 'incorrect'
      $letter.classList.add(letterClass)
    });

    $currentLetter.classList.remove('active', 'is-last');
    const inputLength = $input.value.length
    const $nextActiveLetter = $allLetters[inputLength];
    if($nextActiveLetter) {
        $nextActiveLetter.classList.add('active');
    } else {
        $currentLetter.classList.add('active', 'is-last')
    }
}