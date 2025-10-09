import { getPokeDetail, getPokemonByName } from "./API-data.mjs";

export function getParams(){
    const params = new URLSearchParams(window.location.search);

    return params.get("search")
};

export async function loadPokeCardByName(){
    const btnSearchPokemon = document.getElementById("btnSearchPokemon");
    const pokemonName = getParams().toLowerCase().replace(/\s+/g, "");

    btnSearchPokemon.addEventListener("click", async function() {
        console.log(pokemonName)

        const pokemon = await getPokemonByName(pokemonName);
        console.log(pokemon)
    });
    
};

export async function loadPokeDataTemplate(data) {
    //console.log(data.results)
    const pokemons = await data.results;
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");
    const cardWelcome = document.getElementById("welcomeMsg");
    const spinner = document.getElementById("spinner");
    const genList = document.getElementById("gen-list");

    cardWelcome.classList.add("hidden");
    container.querySelectorAll("#poke-card").forEach(card => card.remove());

    for (const pokemon of pokemons){
        const details = await getPokeDetail(pokemon.url);
        genList.classList.add("d-none");
        spinner.classList.remove("d-none");

        setTimeout(() => {
            const clone = template.content.cloneNode(true);
            const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

            template.setAttribute("data-filled", "true");

            img.src = `${details.img}`;
            img.alt = `${details.name}`;
            pName.textContent = `${details.name.toUpperCase()}`;
            pType.textContent = `${details.type.toUpperCase()}`;

            container.appendChild(clone);
            spinner.classList.add("d-none");
            genList.classList.remove("d-none");
        }, 5000);
    };
};