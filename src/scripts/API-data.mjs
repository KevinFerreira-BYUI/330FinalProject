import { loadPokeDataTemplate } from "./utils.mjs";
const ApiUrl = import.meta.env.VITE_SERVER_URL;

export async function getPokemonByName(pokemonName) {
    try{
        let response = await fetch(`${ApiUrl}pokemon/${pokemonName}`);
    
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
                    console.log(kanto);
                    loadPokeDataTemplate(kanto);
                    //console.log("Gen I - Kanto");
                    break;

                case "Gen II - Johto":
                    const johto = await setGenParams("?offset=151&limit=100");
                    console.log(johto);
                    loadPokeDataTemplate(johto);
                    // console.log("Gen II - Johto");
                    break;

                case "Gen III - Hoenn":
                    const hoenn = await setGenParams("?offset=251&limit=135");
                    console.log(hoenn);
                    loadPokeDataTemplate(hoenn);
                    //console.log("Gen III - Hoenn");
                    break;

                case "Gen IV - Sinnoh":
                    const sinnoh = await setGenParams("?offset=386&limit=107");
                    console.log(sinnoh);
                    loadPokeDataTemplate(sinnoh);
                    //console.log("Gen IV - Sinnoh");
                    break;

                case "Gen V - Unova":
                    const unova = await setGenParams("?offset=493&limit=156");
                    console.log(unova);
                    loadPokeDataTemplate(unova);
                    //console.log("Gen V - Unova");
                    break;

                case "Gen VI - Kalos":
                    const kalos = await setGenParams("?offset=649&limit=72");
                    console.log(kalos);
                    loadPokeDataTemplate(kalos);
                    //console.log("Gen VI - Kalos");
                    break;
                
                case "Gen VII - Alola":
                    const alola = await setGenParams("?offset=721&limit=88");
                    console.log(alola);
                    loadPokeDataTemplate(alola);
                    //console.log("Gen VII - Alola");
                    break;

                case "Gen VIII - Galar":
                    const galar = await setGenParams("?offset=809&limit=95");
                    console.log(galar);
                    loadPokeDataTemplate(galar);
                    //console.log("Gen VIII - Galar");
                    break;

                case "Gen IX - Paldea":
                    const paldea = await setGenParams("?offset=905&limit=120");
                    console.log(paldea);
                    loadPokeDataTemplate(paldea);
                    //console.log("Gen IX - Paldea");
                    break;

                default:
                    console.log("Generation doesn't found");
            }
        });
    });
};