// ToDo: Que reste 50
// ToDo: new Image con source
const game = (function () {
  let frontCards = [{src:'1.jpg', id:1},{src:'2.jpg', id:2},{src:'3.jpg', id:3},{src:'4.jpg', id:4},{src:'5.jpg', id:5},{src:'6.jpg', id:6},{src:'7.jpg', id:7},{src:'8.jpg', id:8},{src:'9.jpg', id:9},{src:'10.jpg', id:10}];  
  let imagePath = 'img/cards/';
  let currentScore = 0;
  let isMatching = false;
  let matchedCards = 0;
  let clickedCards = [];
  let maxScore = 0;

  function _deleteCard() {
    clickedCards.forEach((card) => {
      card.removeEventListener('click', _displayCard);
      card.classList.add('is-deleted');
    });
    clickedCards = [];
    isMatching = false;
  }

  function _displayWinMsg() {
    if (matchedCards === frontCards.length) {
      setTimeout(() => {
        alert('You won');
      }, 1000);
    }
  }

  function _updateScore() {
    document.getElementById('currentScore').innerText = currentScore;
    
    if (currentScore > maxScore) {
      maxScore = currentScore;
      setMaxScore();
    }

    _displayWinMsg();
  }

  function _matchCard() {
    let card1 = frontCards[clickedCards[0].index];
    let card2 = frontCards[clickedCards[1].index];
    if (card1.id === card2.id) {
      isMatching = true;
      currentScore += 100;
      matchedCards += 2;
      _deleteCard();
      _updateScore();
    } else {
      isMatching = false;
    }
  }

  function _duplicateCards(front) {
    let cards = front.concat(front);
    return cards;
  }

  function _randomCards(cards) {
    let randomCards = cards.sort(() => { return 0.5 - Math.random(); });
    return randomCards;
  }

  function _turnCards() {
    clickedCards.forEach(card => {
      let back = card.querySelector('.back');
      card.classList.remove('is-horizontal-rotated');
      card.isClicked = false;
      clickedCards = [];
      setTimeout(() => {
        back.style.backgroundImage = '';
      }, 1000);
    });
  }
  
  function _displayCard() {
    if (clickedCards.length >= 2) {
      return;
    }
    
    if (!this.isClicked) {
      let cardImg = this.querySelector('.back');
      clickedCards.push(this);
      cardImg.style.backgroundImage = `url(${imagePath + frontCards[this.index].src})`;
      this.classList.add('is-horizontal-rotated');
      this.isClicked = true;
      
      if (isMatching) {
        _deleteCard();
      } else if (clickedCards.length === 2) {    
        _matchCard();
        setTimeout(() => {
          _turnCards();
        }, 1500);
      }
    }
  }

  function _flipCard(cards) {
    cards.forEach((card, index) => {
      card.isClicked = false;
      card.index = index;
      card.addEventListener('click', _displayCard);
    });
  }

  function init() {
    maxScore = getMaxScore();
    document.getElementById('maxScore').innerText = maxScore;
    let cards = document.querySelectorAll('.card');
    frontCards = _duplicateCards(frontCards);
    frontCards = _randomCards(frontCards);
    _flipCard(cards);
  }

  function loadServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }

  function setMaxScore() {
    document.getElementById('maxScore').innerText = maxScore;
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('maxScore', maxScore);
    } else {
      alert('The local storage is not supported');
    }
  }

  function getMaxScore() {
    if (typeof (Storage) !== 'undefined') {
      let maxScore = localStorage.getItem('maxScore');
      return maxScore;
    } else {
      alert('The local storage is not supported');
    }
  }

  return {
    init: init,
    serviceWorker: loadServiceWorker
  };
})();

game.serviceWorker();
game.init();