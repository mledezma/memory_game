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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vVG9EbzogTWVqb3JhciBlbCB2b2x0ZW8gZGUgbGEgY2FydGEgeSBsYSBtYW5lcmEgZW4gcXVlIHJlc2V0ZWEgZWwgaW5kZXggZGUgbGEgY2FydGEgZW4gbGEgcXVlIG1lIGVuY3VlbnRyb1xuLy9Ub0RvOiBRdWUgcmVzdGUgNTBcbnZhciBnYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZyb250Q2FyZHMgPSBbJ2ltZy9jYXJkcy8xLmpwZycsICdpbWcvY2FyZHMvMi5qcGcnLCAnaW1nL2NhcmRzLzMuanBnJywgJ2ltZy9jYXJkcy80LmpwZycsICdpbWcvY2FyZHMvNS5qcGcnLCAnaW1nL2NhcmRzLzYuanBnJywgJ2ltZy9jYXJkcy83LmpwZycsICdpbWcvY2FyZHMvOC5qcGcnLCAnaW1nL2NhcmRzLzkuanBnJywgJ2ltZy9jYXJkcy8xMC5qcGcnXTsgIFxuICB2YXIgY3VycmVudENhcmRJZCA9IDA7XG4gIHZhciBwcmV2aW91c0NhcmRJZCA9IC0xO1xuICB2YXIgY3VycmVudENhcmQ7XG4gIHZhciBwcmV2aW91c0NhcmQ7XG4gIHZhciBjdXJyZW50U2NvcmUgPSAwO1xuICB2YXIgaXNNYXRjaGluZyA9IGZhbHNlO1xuICB2YXIgY2FyZHNGbGlwcGVkID0gMDtcbiAgdmFyIG1hdGNoZWRDYXJkcyA9IDA7XG5cbiAgZnVuY3Rpb24gX2RlbGV0ZUNhcmQoKSB7XG4gICAgdmFyIGNhcmRzID0gW3ByZXZpb3VzQ2FyZCwgY3VycmVudENhcmRdO1xuICAgIGNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGNhcmQpIHtcbiAgICAgIGNhcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZGlzcGxheUNhcmQpO1xuICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdpcy1kZWxldGVkJyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfZGlzcGxheVdpbk1zZygpIHtcbiAgICBpZiAobWF0Y2hlZENhcmRzID09PSBmcm9udENhcmRzLmxlbmd0aC8yKSB7XG4gICAgICBhbGVydCgnWW91IHdvbicpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVTY29yZSgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudFNjb3JlJykuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlO1xuICAgIF9kaXNwbGF5V2luTXNnKCk7XG4gIH1cblxuICBmdW5jdGlvbiBfbWF0Y2hDYXJkKCkge1xuICAgIGlmIChwcmV2aW91c0NhcmRJZCA9PT0gY3VycmVudENhcmRJZCkge1xuICAgICAgaXNNYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U2NvcmUgKz0gMTAwO1xuICAgICAgbWF0Y2hlZENhcmRzICs9IDI7XG4gICAgICBfdXBkYXRlU2NvcmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNNYXRjaGluZyA9IGZhbHNlOyAgICAgIFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9kdXBsaWNhdGVDYXJkcyhmcm9udCkge1xuICAgIHZhciBjYXJkcyA9IGZyb250LmNvbmNhdChmcm9udCk7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gX3JhbmRvbUNhcmRzKGNhcmRzKSB7XG4gICAgdmFyIHJhbmRvbUNhcmRzID0gY2FyZHMuc29ydChmdW5jdGlvbigpIHsgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKCk7IH0pO1xuICAgIHJldHVybiByYW5kb21DYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbml0aWFsUG9zaXRpb24oY2FyZCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBjdXJyZW50Q2FyZElkID0gMDsgICBcbiAgICAgIGNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaG9yaXpvbnRhbC1yb3RhdGVkJyk7XG4gICAgICBjYXJkLmlzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgY2FyZHNGbGlwcGVkLS07XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9ICdpbWcvY2FyZC1zYW1wbGUuanBnJztcbiAgICAgIH0sIDUwMCk7XG4gICAgfSwgMjAwMCk7ICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gX2Rpc3BsYXlDYXJkKCkge1xuICAgIGlmIChjYXJkc0ZsaXBwZWQgPj0gMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYXJkc0ZsaXBwZWQrKzsgICAgICBcbiAgICBpZiAoIXRoaXMuaXNDbGlja2VkKSB7XG4gICAgICB2YXIgY2FyZElkID0gZnJvbnRDYXJkc1t0aGlzLmluZGV4XS5yZXBsYWNlKCdpbWcvY2FyZHMvJywgJycpLnJlcGxhY2UoJy5qcGcnLCAnJyk7XG4gICAgICB2YXIgY2FyZEltZyA9IHRoaXMucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgICBwcmV2aW91c0NhcmRJZCA9IGN1cnJlbnRDYXJkSWQ7XG4gICAgICBjdXJyZW50Q2FyZElkID0gY2FyZElkO1xuICAgICAgcHJldmlvdXNDYXJkID0gY3VycmVudENhcmQ7XG4gICAgICBjdXJyZW50Q2FyZCA9IHRoaXM7XG4gICAgICBfbWF0Y2hDYXJkKGNhcmRJZCk7XG5cbiAgICAgIGlmIChpc01hdGNoaW5nKSB7XG4gICAgICAgIF9kZWxldGVDYXJkKCk7XG4gICAgICB9XG5cbiAgICAgIGNhcmRJbWcuc3JjID0gZnJvbnRDYXJkc1t0aGlzLmluZGV4XTtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtaG9yaXpvbnRhbC1yb3RhdGVkJyk7XG4gICAgICBfaW5pdGlhbFBvc2l0aW9uKHRoaXMpO1xuICAgICAgdGhpcy5pc0NsaWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9mbGlwQ2FyZChjYXJkcykge1xuICAgIGNhcmRzLmZvckVhY2goZnVuY3Rpb24oY2FyZCwgaW5kZXgpIHtcbiAgICAgIGNhcmQuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICBjYXJkLmluZGV4ID0gaW5kZXg7XG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Rpc3BsYXlDYXJkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgICBmcm9udENhcmRzID0gX2R1cGxpY2F0ZUNhcmRzKGZyb250Q2FyZHMpO1xuICAgIGZyb250Q2FyZHMgPSBfcmFuZG9tQ2FyZHMoZnJvbnRDYXJkcyk7XG4gICAgX2ZsaXBDYXJkKGNhcmRzKTsgICBcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFxuICB9O1xufSkoKTtcblxuZ2FtZS5pbml0KCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
