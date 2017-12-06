// ToDo: Que reste 50
const game = (function () {
  let frontCards = [{src:'1.jpg', id:1},{src:'2.jpg', id:2},{src:'3.jpg', id:3},{src:'4.jpg', id:4},{src:'5.jpg', id:5},{src:'6.jpg', id:6},{src:'7.jpg', id:7},{src:'8.jpg', id:8},{src:'9.jpg', id:9},{src:'10.jpg', id:10}];  
  let imagePath = 'img/cards/';
  let currentScore = 0;
  let isMatching = false;
  let matchedCards = 0;
  let clickedCards = [];
  
  function loadServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }
  }

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
      cardImg.style.backgroundImage = 'url(' + imagePath + frontCards[this.index].src + ')';
      this.classList.add('is-horizontal-rotated');
      this.isClicked = true;

      if (isMatching) {
        _deleteCard();
      } else if (clickedCards.length === 2) {
        _matchCard();
        setTimeout(() => {
          _turnCards();
        }, 1000);
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
    let cards = document.querySelectorAll('.card');
    frontCards = _duplicateCards(frontCards);
    frontCards = _randomCards(frontCards);
    _flipCard(cards);
  }

  return {
    init: init,
    serviceWorker: loadServiceWorker
  };
})();
window.addEventListener('load', function () {
  game.serviceWorker();
});
game.init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRvRG86IFF1ZSByZXN0ZSA1MFxuY29uc3QgZ2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBmcm9udENhcmRzID0gW3tzcmM6JzEuanBnJywgaWQ6MX0se3NyYzonMi5qcGcnLCBpZDoyfSx7c3JjOiczLmpwZycsIGlkOjN9LHtzcmM6JzQuanBnJywgaWQ6NH0se3NyYzonNS5qcGcnLCBpZDo1fSx7c3JjOic2LmpwZycsIGlkOjZ9LHtzcmM6JzcuanBnJywgaWQ6N30se3NyYzonOC5qcGcnLCBpZDo4fSx7c3JjOic5LmpwZycsIGlkOjl9LHtzcmM6JzEwLmpwZycsIGlkOjEwfV07ICBcbiAgbGV0IGltYWdlUGF0aCA9ICdpbWcvY2FyZHMvJztcbiAgbGV0IGN1cnJlbnRTY29yZSA9IDA7XG4gIGxldCBpc01hdGNoaW5nID0gZmFsc2U7XG4gIGxldCBtYXRjaGVkQ2FyZHMgPSAwO1xuICBsZXQgY2xpY2tlZENhcmRzID0gW107XG4gIFxuICBmdW5jdGlvbiBsb2FkU2VydmljZVdvcmtlcigpIHtcbiAgICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdGVyZWQ6ICcsIHJlZ2lzdHJhdGlvbik7XG4gICAgICAgIH0pLmNhdGNoKHJlZ2lzdHJhdGlvbkVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnU1cgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgcmVnaXN0cmF0aW9uRXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9kZWxldGVDYXJkKCkge1xuICAgIGNsaWNrZWRDYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Rpc3BsYXlDYXJkKTtcbiAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaXMtZGVsZXRlZCcpO1xuICAgIH0pO1xuICAgIGNsaWNrZWRDYXJkcyA9IFtdO1xuICAgIGlzTWF0Y2hpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kaXNwbGF5V2luTXNnKCkge1xuICAgIGlmIChtYXRjaGVkQ2FyZHMgPT09IGZyb250Q2FyZHMubGVuZ3RoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYWxlcnQoJ1lvdSB3b24nKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVTY29yZSgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudFNjb3JlJykuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlO1xuICAgIF9kaXNwbGF5V2luTXNnKCk7XG4gIH1cblxuICBmdW5jdGlvbiBfbWF0Y2hDYXJkKCkge1xuICAgIGxldCBjYXJkMSA9IGZyb250Q2FyZHNbY2xpY2tlZENhcmRzWzBdLmluZGV4XTtcbiAgICBsZXQgY2FyZDIgPSBmcm9udENhcmRzW2NsaWNrZWRDYXJkc1sxXS5pbmRleF07XG4gICAgaWYgKGNhcmQxLmlkID09PSBjYXJkMi5pZCkge1xuICAgICAgaXNNYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U2NvcmUgKz0gMTAwO1xuICAgICAgbWF0Y2hlZENhcmRzICs9IDI7XG4gICAgICBfZGVsZXRlQ2FyZCgpO1xuICAgICAgX3VwZGF0ZVNjb3JlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTWF0Y2hpbmcgPSBmYWxzZTsgICAgICBcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfZHVwbGljYXRlQ2FyZHMoZnJvbnQpIHtcbiAgICBsZXQgY2FyZHMgPSBmcm9udC5jb25jYXQoZnJvbnQpO1xuICAgIHJldHVybiBjYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yYW5kb21DYXJkcyhjYXJkcykge1xuICAgIGxldCByYW5kb21DYXJkcyA9IGNhcmRzLnNvcnQoKCkgPT4geyByZXR1cm4gMC41IC0gTWF0aC5yYW5kb20oKTsgfSk7XG4gICAgcmV0dXJuIHJhbmRvbUNhcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gX3R1cm5DYXJkcygpIHtcbiAgICBjbGlja2VkQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgIGxldCBiYWNrID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuYmFjaycpO1xuICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3Jpem9udGFsLXJvdGF0ZWQnKTtcbiAgICAgIGNhcmQuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICBjbGlja2VkQ2FyZHMgPSBbXTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBiYWNrLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICcnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIF9kaXNwbGF5Q2FyZCgpIHtcbiAgICBpZiAoY2xpY2tlZENhcmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmICghdGhpcy5pc0NsaWNrZWQpIHtcbiAgICAgIGxldCBjYXJkSW1nID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuYmFjaycpO1xuICAgICAgY2xpY2tlZENhcmRzLnB1c2godGhpcyk7XG4gICAgICBjYXJkSW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGltYWdlUGF0aCArIGZyb250Q2FyZHNbdGhpcy5pbmRleF0uc3JjICsgJyknO1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdpcy1ob3Jpem9udGFsLXJvdGF0ZWQnKTtcbiAgICAgIHRoaXMuaXNDbGlja2VkID0gdHJ1ZTtcblxuICAgICAgaWYgKGlzTWF0Y2hpbmcpIHtcbiAgICAgICAgX2RlbGV0ZUNhcmQoKTtcbiAgICAgIH0gZWxzZSBpZiAoY2xpY2tlZENhcmRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBfbWF0Y2hDYXJkKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIF90dXJuQ2FyZHMoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2ZsaXBDYXJkKGNhcmRzKSB7XG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZCwgaW5kZXgpID0+IHtcbiAgICAgIGNhcmQuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICBjYXJkLmluZGV4ID0gaW5kZXg7XG4gICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Rpc3BsYXlDYXJkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgICBmcm9udENhcmRzID0gX2R1cGxpY2F0ZUNhcmRzKGZyb250Q2FyZHMpO1xuICAgIGZyb250Q2FyZHMgPSBfcmFuZG9tQ2FyZHMoZnJvbnRDYXJkcyk7XG4gICAgX2ZsaXBDYXJkKGNhcmRzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdCxcbiAgICBzZXJ2aWNlV29ya2VyOiBsb2FkU2VydmljZVdvcmtlclxuICB9O1xufSkoKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICBnYW1lLnNlcnZpY2VXb3JrZXIoKTtcbn0pO1xuZ2FtZS5pbml0KCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
