//ToDo: Mejorar el volteo de la carta y la manera en que resetea el index de la carta en la que me encuentro
//ToDo: Que reste 50
var game = (function () {
  var frontCards = ['img/cards/1.jpg', 'img/cards/2.jpg', 'img/cards/3.jpg', 'img/cards/4.jpg', 'img/cards/5.jpg', 'img/cards/6.jpg', 'img/cards/7.jpg', 'img/cards/8.jpg', 'img/cards/9.jpg', 'img/cards/10.jpg'];  
  var currentCardId = 0;
  var previousCardId = -1;
  var currentCard;
  var previousCard;
  var currentScore = 0;
  var isMatching = false;
  var cardsFlipped = 0;
  var matchedCards = 0;

  function _deleteCard() {
    var cards = [previousCard, currentCard];
    cards.forEach(function (card) {
      card.removeEventListener('click', _displayCard);
      card.classList.add('is-deleted');
    });
  }

  function _displayWinMsg() {
    if (matchedCards === frontCards.length/2) {
      alert('You won');
    }
  }

  function _updateScore() {
    document.getElementById('currentScore').innerText = currentScore;
    _displayWinMsg();
  }

  function _matchCard() {
    if (previousCardId === currentCardId) {
      isMatching = true;
      currentScore += 100;
      matchedCards += 2;
      _updateScore();
    } else {
      isMatching = false;      
    }
  }

  function _duplicateCards(front) {
    var cards = front.concat(front);
    return cards;
  }

  function _randomCards(cards) {
    var randomCards = cards.sort(function() { return 0.5 - Math.random(); });
    return randomCards;
  }

  function _initialPosition(card) {
    setTimeout(function() {
      currentCardId = 0;   
      card.classList.remove('is-horizontal-rotated');
      card.isClicked = false;
      cardsFlipped--;
      setTimeout(function() {
        card.querySelector('img').src = 'img/card-sample.jpg';
      }, 500);
    }, 2000);    
  }

  function _displayCard() {
    if (cardsFlipped >= 2) {
      return;
    }
    cardsFlipped++;      
    if (!this.isClicked) {
      var cardId = frontCards[this.index].replace('img/cards/', '').replace('.jpg', '');
      var cardImg = this.querySelector('img');
      previousCardId = currentCardId;
      currentCardId = cardId;
      previousCard = currentCard;
      currentCard = this;
      _matchCard(cardId);

      if (isMatching) {
        _deleteCard();
      }

      cardImg.src = frontCards[this.index];
      this.classList.add('is-horizontal-rotated');
      _initialPosition(this);
      this.isClicked = true;
    }
  }

  function _flipCard(cards) {
    cards.forEach(function(card, index) {
      card.isClicked = false;
      card.index = index;
      card.addEventListener('click', _displayCard);
    });
  }

  function init() {
    var cards = document.querySelectorAll('.card');
    frontCards = _duplicateCards(frontCards);
    frontCards = _randomCards(frontCards);
    _flipCard(cards);   
  }

  return {
    init: init
  };
})();

game.init();