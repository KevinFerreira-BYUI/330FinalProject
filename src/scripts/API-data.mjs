const ApiUrl = import.meta.env.VITE_SERVER_URL;

export async function getAllPokemons() {
    try{
        let response = await fetch(`${ApiUrl}pokemon`);
    
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