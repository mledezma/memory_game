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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRvRG86IFF1ZSByZXN0ZSA1MFxuLy8gVG9EbzogbmV3IEltYWdlIGNvbiBzb3VyY2VcbmNvbnN0IGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgZnJvbnRDYXJkcyA9IFt7c3JjOicxLmpwZycsIGlkOjF9LHtzcmM6JzIuanBnJywgaWQ6Mn0se3NyYzonMy5qcGcnLCBpZDozfSx7c3JjOic0LmpwZycsIGlkOjR9LHtzcmM6JzUuanBnJywgaWQ6NX0se3NyYzonNi5qcGcnLCBpZDo2fSx7c3JjOic3LmpwZycsIGlkOjd9LHtzcmM6JzguanBnJywgaWQ6OH0se3NyYzonOS5qcGcnLCBpZDo5fSx7c3JjOicxMC5qcGcnLCBpZDoxMH1dOyAgXG4gIGxldCBpbWFnZVBhdGggPSAnaW1nL2NhcmRzLyc7XG4gIGxldCBjdXJyZW50U2NvcmUgPSAwO1xuICBsZXQgaXNNYXRjaGluZyA9IGZhbHNlO1xuICBsZXQgbWF0Y2hlZENhcmRzID0gMDtcbiAgbGV0IGNsaWNrZWRDYXJkcyA9IFtdO1xuICBsZXQgbWF4U2NvcmUgPSAwO1xuXG4gIGZ1bmN0aW9uIF9kZWxldGVDYXJkKCkge1xuICAgIGNsaWNrZWRDYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICBjYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2Rpc3BsYXlDYXJkKTtcbiAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaXMtZGVsZXRlZCcpO1xuICAgIH0pO1xuICAgIGNsaWNrZWRDYXJkcyA9IFtdO1xuICAgIGlzTWF0Y2hpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9kaXNwbGF5V2luTXNnKCkge1xuICAgIGlmIChtYXRjaGVkQ2FyZHMgPT09IGZyb250Q2FyZHMubGVuZ3RoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYWxlcnQoJ1lvdSB3b24nKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF91cGRhdGVTY29yZSgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudFNjb3JlJykuaW5uZXJUZXh0ID0gY3VycmVudFNjb3JlO1xuICAgIFxuICAgIGlmIChjdXJyZW50U2NvcmUgPiBtYXhTY29yZSkge1xuICAgICAgbWF4U2NvcmUgPSBjdXJyZW50U2NvcmU7XG4gICAgICBzZXRNYXhTY29yZSgpO1xuICAgIH1cblxuICAgIF9kaXNwbGF5V2luTXNnKCk7XG4gIH1cblxuICBmdW5jdGlvbiBfbWF0Y2hDYXJkKCkge1xuICAgIGxldCBjYXJkMSA9IGZyb250Q2FyZHNbY2xpY2tlZENhcmRzWzBdLmluZGV4XTtcbiAgICBsZXQgY2FyZDIgPSBmcm9udENhcmRzW2NsaWNrZWRDYXJkc1sxXS5pbmRleF07XG4gICAgaWYgKGNhcmQxLmlkID09PSBjYXJkMi5pZCkge1xuICAgICAgaXNNYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U2NvcmUgKz0gMTAwO1xuICAgICAgbWF0Y2hlZENhcmRzICs9IDI7XG4gICAgICBfZGVsZXRlQ2FyZCgpO1xuICAgICAgX3VwZGF0ZVNjb3JlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzTWF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfZHVwbGljYXRlQ2FyZHMoZnJvbnQpIHtcbiAgICBsZXQgY2FyZHMgPSBmcm9udC5jb25jYXQoZnJvbnQpO1xuICAgIHJldHVybiBjYXJkcztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9yYW5kb21DYXJkcyhjYXJkcykge1xuICAgIGxldCByYW5kb21DYXJkcyA9IGNhcmRzLnNvcnQoKCkgPT4geyByZXR1cm4gMC41IC0gTWF0aC5yYW5kb20oKTsgfSk7XG4gICAgcmV0dXJuIHJhbmRvbUNhcmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gX3R1cm5DYXJkcygpIHtcbiAgICBjbGlja2VkQ2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgIGxldCBiYWNrID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuYmFjaycpO1xuICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1ob3Jpem9udGFsLXJvdGF0ZWQnKTtcbiAgICAgIGNhcmQuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICBjbGlja2VkQ2FyZHMgPSBbXTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBiYWNrLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICcnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIF9kaXNwbGF5Q2FyZCgpIHtcbiAgICBpZiAoY2xpY2tlZENhcmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmICghdGhpcy5pc0NsaWNrZWQpIHtcbiAgICAgIGxldCBjYXJkSW1nID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuYmFjaycpO1xuICAgICAgY2xpY2tlZENhcmRzLnB1c2godGhpcyk7XG4gICAgICBjYXJkSW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWFnZVBhdGggKyBmcm9udENhcmRzW3RoaXMuaW5kZXhdLnNyY30pYDtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtaG9yaXpvbnRhbC1yb3RhdGVkJyk7XG4gICAgICB0aGlzLmlzQ2xpY2tlZCA9IHRydWU7XG4gICAgICBcbiAgICAgIGlmIChpc01hdGNoaW5nKSB7XG4gICAgICAgIF9kZWxldGVDYXJkKCk7XG4gICAgICB9IGVsc2UgaWYgKGNsaWNrZWRDYXJkcy5sZW5ndGggPT09IDIpIHsgICAgXG4gICAgICAgIF9tYXRjaENhcmQoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgX3R1cm5DYXJkcygpO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfZmxpcENhcmQoY2FyZHMpIHtcbiAgICBjYXJkcy5mb3JFYWNoKChjYXJkLCBpbmRleCkgPT4ge1xuICAgICAgY2FyZC5pc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIGNhcmQuaW5kZXggPSBpbmRleDtcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBfZGlzcGxheUNhcmQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBtYXhTY29yZSA9IGdldE1heFNjb3JlKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heFNjb3JlJykuaW5uZXJUZXh0ID0gbWF4U2NvcmU7XG4gICAgbGV0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgICBmcm9udENhcmRzID0gX2R1cGxpY2F0ZUNhcmRzKGZyb250Q2FyZHMpO1xuICAgIGZyb250Q2FyZHMgPSBfcmFuZG9tQ2FyZHMoZnJvbnRDYXJkcyk7XG4gICAgX2ZsaXBDYXJkKGNhcmRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRTZXJ2aWNlV29ya2VyKCkge1xuICAgIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy4uL3N3LmpzJykudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdTVyByZWdpc3RlcmVkOiAnLCByZWdpc3RyYXRpb24pO1xuICAgICAgICB9KS5jYXRjaChyZWdpc3RyYXRpb25FcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIHJlZ2lzdHJhdGlvbkVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRNYXhTY29yZSgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF4U2NvcmUnKS5pbm5lclRleHQgPSBtYXhTY29yZTtcbiAgICBpZiAodHlwZW9mIChTdG9yYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXhTY29yZScsIG1heFNjb3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ1RoZSBsb2NhbCBzdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXhTY29yZSgpIHtcbiAgICBpZiAodHlwZW9mIChTdG9yYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxldCBtYXhTY29yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXhTY29yZScpO1xuICAgICAgcmV0dXJuIG1heFNjb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnVGhlIGxvY2FsIHN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdCxcbiAgICBzZXJ2aWNlV29ya2VyOiBsb2FkU2VydmljZVdvcmtlclxuICB9O1xufSkoKTtcblxuZ2FtZS5zZXJ2aWNlV29ya2VyKCk7XG5nYW1lLmluaXQoKTsiXSwiZmlsZSI6Im1haW4uanMifQ==
