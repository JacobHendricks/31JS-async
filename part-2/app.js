$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1.
  async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`)
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  };
  part1();

  // 2.
  let firstCard = null;
  async function part2() {
    let data = await $.getJSON(`${baseURL}/new/draw/`)
    let firstCard = data.cards[0];
    let deckId = data.deck_id;
    let data2 = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    let secondCard = data2.cards[0];
    [firstCard, secondCard].forEach(function(card) {
      console.log(
        `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
      );
    });
  }
  part2();
  


  // 3.
  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card-area');
  
  async function shuffle() {
    let data = await $.getJSON(`${baseURL}/new/shuffle/`);
    deckId = data.deck_id;
    $btn.show();
  }
  shuffle();
 

  $btn.on('click', async function() {
    let data = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    let cardSrc = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (data.remaining === 0) $btn.remove();
  });

});
