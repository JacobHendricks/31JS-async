let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function numFact() {
  let res1 = await $.getJSON(`${baseURL}/${favNumber}?json`)
  console.log(res1);
}

numFact();

// 2.
let favNumbers = [7, 11, 22];
async function numFacts() {
  let res2 = await $.getJSON(`${baseURL}/${favNumbers}?json`)
  console.log(res2);
};

numFacts();

// 3.
async function favFacts() {
  let favRes = await Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}/${favNumber}?json`);
    })
  );
  console.log(favRes);
  favRes.forEach(data => $("body").append(`<p>${data.text}</p>`));
}

favFacts();
