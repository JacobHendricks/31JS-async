$(function() {
  let baseURL = "https://pokeapi.co/api/v2";

  // 1.
  async function part1() {
    let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    console.log("Part 1", data);
  }
  part1()

  // 2.
  async function part2() {
    let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    let pokemon = await Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    pokemon.forEach(p => console.log("Part 2", p));
  }
  part2();
  
  // 3.
  let names = null;
  async function part3() {
    let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    let pokemon = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url)));
    let species = await Promise.all(
      pokemon.map(d => $.getJSON(d.species.url)));
    let descriptions = species.map(d => {
      let descriptionObj = d.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
    });
    descriptions.forEach((desc, i) => {
      console.log(`${pokemon[i].name}: ${desc}`);
    });
  }
  part3();

  

  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }


  // 4.
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  $btn.on("click", async function() {
    $pokeArea.empty();
    let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
    let randomPokemonUrls = [];
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * allData.results.length);
      let url = allData.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    let pokemonData = await Promise.all(
      randomPokemonUrls.map(url => $.getJSON(url))
    );
    let speciesData = await Promise.all(
      pokemonData.map(p => $.getJSON(p.species.url))
    );
    speciesData.forEach((d, i) => {
      let descriptionObj = d.flavor_text_entries.find(function(entry) {
        return entry.language.name === "en";
      });
      let description = descriptionObj ? descriptionObj.flavor_text : "";
      let name = pokemonData[i].name;
      let imgSrc = pokemonData[i].sprites.front_default;
      $pokeArea.append(makePokeCard(name, imgSrc, description));
    });
  });

  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }

});
