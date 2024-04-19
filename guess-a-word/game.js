
let words = ['apple', 'banana', 'orange', 'pear', 'peaches', 'strawberries', 'blueberries']; 

document.addEventListener('DOMContentLoaded', event => {

  class game {
    constructor() {
      this.currentWord = this.chooseWord();
      this.guesses = 0;
      this.guessedLetters = [];
      document.addEventListener('keydown', event => this.pressedKey(event));
      document.getElementById('replay').addEventListener('click', event => this.playAnother(event));
    }

    resetSpaces() {
      let wordSpaces = document.getElementById('spaces');
      wordSpaces.remove();
    }

    randomWord() {
      if (words.length === 0) {
        this.outOfWords()
      } else {
        let index = Math.floor(Math.random() * words.length);
        this.currentWord = words.splice(index, 1)[0];
        this.createSpaces(this.currentWord);
        return this.currentWord;
      };
    }

    chooseWord() {
      let word = this.randomWord();
      console.log(word);
      return word;
    }

    createSpaces(word) {
      let wordSpaces = document.getElementById('spaces');

      for(let i = 0; i < word.length; i += 1) {
        let spacesElement = document.createElement('span')
        spacesElement.setAttribute('id', 'emptySpaces');
        wordSpaces.appendChild(spacesElement);
      }
    }

    pressedKey(e) {
      let key = e.key;
      let alph = 'abcdefghijklmnopqrstuvwxyz';

      if (alph.includes(key) && this.currentWord.includes(key)) {
        let indices = this.getIndices(key);
        this.replaceCorrectLetters(indices, key);
        this.guessedLetters.push(key);
        this.showGuessedLetters(e);
        this.indices = [];
        if (this.correctAnswer(this.currentWord)) {
          this.youWon();
        }
      } else if (alph.includes(key) && !this.currentWord.includes(key)){
        this.guesses += 1;
        document.getElementById('apples').className = `guess_${this.guesses}`;
        this.guessedLetters.push(key);
        this.showGuessedLetters(e);
        if (this.guesses > 5) {
          this.outOfGuesses();
        } 
      }
    }

    correctAnswer(word) {
      let guessesSoFar = '';
      let spaces = document.querySelectorAll('#emptySpaces');

      for (let i = 0; i < spaces.length; i += 1) {
        guessesSoFar += spaces[i].textContent;
      }
     return guessesSoFar === word;
    }

    getIndices(letter){
      let indices = [];
      for (let i = 0; i < this.currentWord.length; i += 1) {
        if (this.currentWord[i] === letter) {
          indices.push(i);
        }
      }
      return indices;
    }

    replaceCorrectLetters(idx, letter) {
      let arr = document.querySelectorAll('#emptySpaces');
      for (let i = 0; i < idx.length; i += 1) {
        arr[idx[i]].textContent = letter;
      }
    }

    showGuessedLetters(e) {
      let letter = this.guessedLetters[this.guessedLetters.length - 1];
      if (this.guessedLetters.length === 1) {
        let guesses = document.getElementById('guesses');
        let display = document.createElement('span');

        display.setAttribute('id', 'emptyGuesses');
        display.textContent = letter;
        guesses.appendChild(display);
      } else if (this.getCount(e.key) < 2) {
        let guesses = document.getElementById('guesses');
        let display = document.createElement('span');

        display.setAttribute('id', 'emptyGuesses');
        display.textContent = letter;
        guesses.appendChild(display);
      }
    }

    getCount(letter) {
      let count = 0;
      for (let i = 0; i < this.guessedLetters.length; i += 1) {
        if (this.guessedLetters[i] === letter) {
          count += 1;
        }
      }
      return count;
    }

    outOfGuesses() {
      document.querySelector('body').classList.add('lose');
    }

    youWon() {
      document.querySelector('body').classList.add('win');
    }

    outOfWords() {
      document.getElementById('message').innerHTML = 'I am out of words!';
    }

    playAnother(e) {
      console.log(e);
      console.log(this);
      e.preventDefault();
      this.reset(document.querySelectorAll('#emptySpaces'));
      this.reset(document.querySelectorAll('#emptyGuesses'));
      document.getElementById('apples').removeAttribute('class');
      document.body.removeAttribute('class');
      this.currentWord = this.chooseWord();
      this.guesses = 0;
      this.guessedLetters = [];

      // document.removeEventListener('keydown', this.pressedKey);
      document.getElementById('replay').removeEventListener('click', this.playAnother);

      // document.addEventListener('keydown', event => this.pressedKey(event));
      // document.getElementById('replay').addEventListener('click', event => this.playAnother(event));
    }

    reset(node) {
      for (let i = 0; i < node.length; i += 1) {
        node[i].remove();
      }
    }
  }

  new game;
})







