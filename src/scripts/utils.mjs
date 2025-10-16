
import { getPokeDetail, getPokemonByName, oaksAdvice } from "./API-data.mjs";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";

export function getParams(){
    const params = new URLSearchParams(window.location.search);

    return params.get("search")
};

export function setLocalStorage(key, value){
    localStorage.setItem(`${key}`, JSON.stringify(value));
};

export function getLocalstorage(){
    const pokeBox = [];

    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        pokeBox.push(JSON.parse(value));
    }

    return pokeBox;
};

export function deleteFromLocalstorage(key){
    localStorage.removeItem(key);
};

export async function loadPokeCardByName(){
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

export function buildPokeBoxTemplpate(){
   const box = getLocalstorage();
   const emptyMessage = document.querySelector(".pikaCrying");

   if (box.length === 0){
    emptyMessage.classList.remove("d-none");
   }

   const template = document.querySelector(".poke-card-template");
   const container = document.getElementById("box-poke-section");

   box.forEach(pokemon => {
    const clone = template.content.cloneNode(true);
    const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

    img.src = `${pokemon.sprites.other['official-artwork'].front_default}`;
    img.alt = `${pokemon.name}`;
    pName.textContent = `${pokemon.name.toUpperCase()}`;
    pName.dataset.name = `${pokemon.name.toLowerCase()}`;
    pType.textContent = `${pokemon.types.map(pType => pType.type.name).join(", ").toUpperCase()}`;

    releasePokemon();

    container.appendChild(clone);
   });
};

export function releasePokemon(){
    const observer = new MutationObserver(() => {
        const btnRelease = document.querySelectorAll(".btnRelease");
        btnRelease.forEach(btn => {
            if (!btn.dataset.listenerAdded) {
                btn.dataset.listenerAdded = true; 
                btn.addEventListener("click", async function(){
                    const card = btn.closest(".poke-card-name");
                    const nameElement = card.querySelector("[data-name]");
                    const pokemomName = nameElement.dataset.name;

                    const modalMsg = document.querySelector(".modalMsg");
                    const modalElement = document.getElementById("releaseModal");
                    const modal = new Modal(modalElement);
                    
                    deleteFromLocalstorage(pokemomName);
                    modalMsg.innerHTML = `${pokemomName.toUpperCase()} Released!`;
                    modal.show();

                    modalElement.addEventListener("hidden.bs.modal", function(){
                        location.reload();
                    });

                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
};

async function BuildPokeDataTemplateByName(getPokemon){
    const pokemon = await getPokemon;
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");
    const cardWelcome = document.getElementById("welcomeMsg");

    cardWelcome.classList.add("hidden");
    container.querySelectorAll("#poke-card").forEach(card => card.remove());

    const clone = template.content.cloneNode(true);
    const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

    template.setAttribute("data-filled", "true");

    img.src = `${pokemon.sprites.other['official-artwork'].front_default}`;
    img.alt = `${pokemon.name}`;
    pName.textContent = `${pokemon.name.toUpperCase()}`;
    pName.dataset.name = `${pokemon.name.toLowerCase()}`;
    pType.textContent = `${pokemon.types.map(pType => pType.type.name).join(", ").toUpperCase()}`;

    getSpecificPokeNameInCard();
    container.appendChild(clone);    
};

export async function loadPokeDataTemplate(data) {
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

        getPokeNameInCard();
        container.appendChild(clone);
    };


    spinner.classList.add("d-none");
    genList.classList.remove("d-none");
};

export async function getPokeNameInCard(){
    const observer = new MutationObserver(function() {
        const btnCatch = document.querySelectorAll(".btnCatch");        

        btnCatch.forEach(btn => {
            if (!btn.dataset.listenerAdded) {
                btn.dataset.listenerAdded = true;
                btn.addEventListener("click", async function(){
                    const advice = await oaksAdvice();
                    const card = btn.closest(".poke-card-name");
                    const nameElement = card.querySelector("[data-name]");
                    const pokemomName = nameElement.dataset.name;
                    
                    const modalMsg = document.querySelector(".modalMsg");
                    const modalMsg2 = document.querySelector(".modalMsg2");
                    const modalTitle = document.querySelector(".modal-title");
                    const modalElement = document.querySelector(".modalContainer");
                    const modal = new Modal(modalElement);
                    
                    const pokeData = await getPokemonByName(pokemomName);

                    if (pokeData){
                        setLocalStorage(pokemomName, pokeData);

                        modalTitle.textContent = "Gotcha!";
                        modalMsg.textContent = `${pokemomName.toUpperCase()} Catched!`;
                        modalMsg2.innerHTML = `Prof Oak Advice: <i>${advice}</i>`;
                        modal.show();
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

export async function getSpecificPokeNameInCard(){
    const advice = await oaksAdvice();
    const btnCatch = document.getElementById("btnCatch");        

    btnCatch.addEventListener("click", async function(){
        const card = document.querySelector(".poke-card-name");
        const nameElement = card.querySelector("[data-name]");
        const pokemomName = nameElement.dataset.name;
                    
        const modalMsg = document.querySelector(".modalMsg");
        const modalMsg2 = document.querySelector(".modalMsg2");
        const modalTitle = document.querySelector(".modal-title");
        const modalElement = document.querySelector(".modalContainer");
        const modal = new Modal(modalElement);
                    
        const pokeData = await getPokemonByName(pokemomName);

        if (pokeData){
            setLocalStorage(pokemomName, pokeData);

            modalTitle.textContent = "Gotcha!";
            modalMsg.textContent = `${pokemomName.toUpperCase()} Catched!`;
            modalMsg2.innerHTML = `Prof Oak Advice: <i>${advice}</i>`;
            modal.show();
        }
    });
}