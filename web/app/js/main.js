;(function () {
  //ToDo: Patron de diseño
  //ToDo: Tome 5 imagenes de una array y lo duplique.
  //ToDo: Cien puntos por cada carta que empareje
  //ToDo: Por cada carta que ya haya visto y no empareje perder 50 puntos
  function duplicateCards(front) {
    var cards = front.concat(front);
    return cards;
  }

  //ToDo: Que tome un array de imagenes y lo acomode random.
  function randomCards(cards) {
    var randomCards = cards.sort(function() { return 0.5 - Math.random() });
    return randomCards;
  }

  //ToDo: Devuelva la carta despues de un rato
  function flipCard(cards, front) {
    cards.forEach(function(card, index) {
      card.addEventListener('click', function () {
        this.classList.add('is-horizontal-rotated');
        this.querySelector('img').src = front[index];        
      });
    });
  }

  function init() {
    var cards = document.querySelectorAll('.card');
    var frontCards = ['img/cards/1.jpg', 'img/cards/2.jpg', 'img/cards/3.jpg', 'img/cards/4.jpg', 'img/cards/5.jpg', 'img/cards/6.jpg', 'img/cards/7.jpg', 'img/cards/8.jpg', 'img/cards/9.jpg', 'img/cards/10.jpg'];
    frontCards = duplicateCards(frontCards);
    frontCards = randomCards(frontCards);
    console.log(frontCards);
    flipCard(cards, frontCards);
    
  }
  init();
  //ToDo: Eliminar las cartas que emparejen.

}())