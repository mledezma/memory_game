var game = (function () {
  var frontCards = ['img/cards/1.jpg', 'img/cards/2.jpg', 'img/cards/3.jpg', 'img/cards/4.jpg', 'img/cards/5.jpg', 'img/cards/6.jpg', 'img/cards/7.jpg',  'img/cards/8.jpg', 'img/cards/9.jpg', 'img/cards/10.jpg'];  
  var currentCardId = 0;
  var previousCardId = -1;
  var currentCard;
  var previousCard;
  var currentScore = 0;
  var isMatching = false;

  //Working
  function _deleteCard(card) {
    console.log('Previous Card', previousCard);
    console.log('Current Card', previousCard);
  }

  function _matchCard(cardId) {
    if (previousCardId === currentCardId) {
      isMatching = true;
      currentScore += 100;
    } else {
      isMatching = false;      
      console.log('It didnt');
    }
  }
  //ToDo: Por cada carta que ya haya visto y no empareje perder 50 puntos
  function _duplicateCards(front) {
    var cards = front.concat(front);
    return cards;
  }

  function _randomCards(cards) {
    var randomCards = cards.sort(function() { return 0.5 - Math.random() });
    return randomCards;
  }

  function _initialPosition(card) {
    setTimeout(function() {
      currentCardId = 0;   
      card.classList.remove('is-horizontal-rotated');
      card.isClicked = false;
    }, 3000);
  }

  function _flipCard(cards) {
    cards.forEach(function(card, index) {
      card.isClicked = false;
      card.addEventListener('click', function () {
        if(!this.isClicked) {
          var cardId = frontCards[index].replace('img/cards/', '').replace('.jpg', '');
          previousCardId = currentCardId;
          currentCardId = cardId;
          previousCard = currentCard;
          currentCard = this;
          _matchCard(cardId);
          if(isMatching) {
            _deleteCard(this);
            console.log('delete this cards');
          }
          var cardImg = this.querySelector('img');
          cardImg.src = frontCards[index];  
          this.classList.add('is-horizontal-rotated');
          _initialPosition(this);
          this.isClicked = true;
        } else {
          console.log('Clikea otra carta');
        }
      });
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
  }
  //ToDo: Eliminar las cartas que emparejen.
})();

game.init();