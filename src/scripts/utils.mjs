import { getPokeDetail, getPokemonByName } from "./API-data.mjs";

export function getParams(){
    const params = new URLSearchParams(window.location.search);

    return params.get("search")
};

export async function loadPokeCardByName(){
    const searchForm = document.getElementById("searchForm");
    const btn = document.getElementById("btnSearchPokemon");
    const params = getParams();

    if (!params){
        console.log();
    } else{ 
        const pokemonName = params.toLowerCase().replace(/\s+/g, "");
        const pokemon = await getPokemonByName(pokemonName);

        if (window.location.search){window.history.replaceState({}, document.title, window.location.pathname);}

        if (!pokemon) return;
        BuildPokeDataTemplateByName(pokemon);
    }

    if (window.location.search){
        window.history.replaceState({}, document.title, window.location.pathname);
    }
};

async function BuildPokeDataTemplateByName(getPokemon){
    const pokemon = await getPokemon;
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");
    const cardWelcome = document.getElementById("welcomeMsg");
    const spinner = document.getElementById("spinner");
    const genList = document.getElementById("gen-list");

    cardWelcome.classList.add("hidden");
    container.querySelectorAll("#poke-card").forEach(card => card.remove());

    const clone = template.content.cloneNode(true);
    const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

    template.setAttribute("data-filled", "true");

    img.src = `${pokemon.sprites.other['official-artwork'].front_default}`;
    img.alt = `${pokemon.name}`;
    pName.textContent = `${pokemon.name.toUpperCase()}`;
    pType.textContent = `${pokemon.types.map(pType => pType.type.name).join(", ").toUpperCase()}`;

    container.appendChild(clone);
    spinner.classList.add("d-none");
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

    genList.classList.add("d-none");
    spinner.classList.remove("d-none");
    
    for (const pokemon of pokemons){
        const details = await getPokeDetail(pokemon.url);

        const clone = template.content.cloneNode(true);
        const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

        template.setAttribute("data-filled", "true");

        img.src = `${details.img}`;
        img.alt = `${details.name}`;
        pName.textContent = `${details.name.toUpperCase()}`;
        pName.dataset.name = `${details.name.toLowerCase()}`;
        pType.textContent = `${details.type.toUpperCase()}`;

        container.appendChild(clone);
    };

    spinner.classList.add("d-none");
    genList.classList.remove("d-none");
};

export function getPokeNameInCard(){
    const checkExist = setInterval(() => {
        const btnCatch = document.querySelectorAll("#btnCatch");
        

        if(btnCatch.length > 0){
            btnCatch.forEach((btn) => {
                btn.addEventListener("click", function(){
                    console.log("yeaaah");
                });
            });
            clearInterval(checkExist);
        }

    }, 100);
}