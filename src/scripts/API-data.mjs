import { loadPokeDataTemplate } from "./utils.mjs";
const ApiUrl = import.meta.env.VITE_SERVER_URL;

export async function getPokemonByName(pokemonName) {
    try{
        let response = await fetch(`${ApiUrl}pokemon/${pokemonName}`);
    
        if (!response.ok){
            throw new Error(`Request error: ${response.status}`);
        }

        let pokeData = await response.json();
        //console.log(pokeData);

        return pokeData;
    } catch(error){
        console.error(`Error: ${error}`);
    }
};

export async function getPokemonById(pokemonId) {
    try{
        let response = await fetch(`${ApiUrl}pokemon/${pokemonId}`);
    
        if (!response.ok){
            throw new Error(`Request error: ${response.status}`);
        }

        let pokeData = await response.json();
        console.log(pokeData);

        return pokeData;
    } catch(error){
        console.error(`Error: ${error}`);
    }
};

export async function getKantoPokemons() {
    try{
        let response = await fetch(`${ApiUrl}pokemon/?offset=0&limit=151`);
    
        if (!response.ok){
            throw new Error(`Request error: ${response.status}`);
        }

        let pokeData = await response.json();
        console.log(pokeData);

        return pokeData.results;
    } catch(error){
        console.error(`Error: ${error}`);
    }
};

export async function getPokeDetail(url) {
    const response = await fetch(url);
    const pokeData = await response.json();
    return {
        id: pokeData.id,
        name: pokeData.name,
        type: pokeData.types.map(pType => pType.type.name).join(", "),
        img: pokeData.sprites.other['official-artwork'].front_default
    };
};

async function setGenParams(gen) {
    try{
        const response = await fetch(`${ApiUrl}pokemon${gen}`);

        if (!response.ok){
            throw new Error(`Error in data search: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error){
        console.error(`Error to load generation: ${error}`);
        return null;
    }
};

export async function getPokemonsByGen() {
    const gentItem = document.querySelectorAll(".gen-item");
    gentItem.forEach(item => {
        item.addEventListener("click", async function(element){
            const generation = element.target.textContent;
            
            switch(generation){
                case "Gen I - Kanto":
                    const kanto = await setGenParams("?offset=0&limit=151");
                    loadPokeDataTemplate(kanto);
                    break;

                case "Gen II - Johto":
                    const johto = await setGenParams("?offset=151&limit=100");
                    loadPokeDataTemplate(johto);
                    break;

                case "Gen III - Hoenn":
                    const hoenn = await setGenParams("?offset=251&limit=135");
                    loadPokeDataTemplate(hoenn);
                    break;

                case "Gen IV - Sinnoh":
                    const sinnoh = await setGenParams("?offset=386&limit=107");
                    loadPokeDataTemplate(sinnoh);
                    break;

                case "Gen V - Unova":
                    const unova = await setGenParams("?offset=493&limit=156");
                    loadPokeDataTemplate(unova);
                    break;

                case "Gen VI - Kalos":
                    const kalos = await setGenParams("?offset=649&limit=72");
                    loadPokeDataTemplate(kalos);
                    break;
                
                case "Gen VII - Alola":
                    const alola = await setGenParams("?offset=721&limit=88");
                    loadPokeDataTemplate(alola);
                    break;

                case "Gen VIII - Galar":
                    const galar = await setGenParams("?offset=809&limit=95");
                    loadPokeDataTemplate(galar);;
                    break;

                case "Gen IX - Paldea":
                    const paldea = await setGenParams("?offset=905&limit=120");
                    loadPokeDataTemplate(paldea);
                    break;
                    
                default:
                    console.log("Generation doesn't found");
            }
        });
    });
};