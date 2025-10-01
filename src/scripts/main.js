import '../styles/style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getAllPokemons, getPokemonByName, getPokemonById, getPokeDetail } from './API-data.mjs'

async function loadPokeDataTemplate() {
    let pokemons = await getAllPokemons();
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");

    for (const pokemon of pokemons){
        const details = await getPokeDetail(pokemon.url);
        //console.log(details.id);
        // console.log(details.name);
        // console.log(details.type);
        // console.log(details.img);

        const clone = template.content.cloneNode(true);
        const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

        img.src = `${details.img}`;
        img.alt = `${details.name}`;
        pName.textContent = `${details.name.toUpperCase()}`;
        pType.textContent = `${details.type.toUpperCase()}`;

        container.appendChild(clone);
    };
};

loadPokeDataTemplate();


