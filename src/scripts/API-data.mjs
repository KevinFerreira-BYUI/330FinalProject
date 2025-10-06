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

export async function getPokemonsByGen() {
    const gentItem = document.querySelectorAll(".gen-item");
    gentItem.forEach(item => {
        item.addEventListener("click", function(element){
            const generation = element.target.textContent;
            
            switch(generation){
                case "Gen I - Kanto":
                    console.log("Gen I - Kanto");
                    break;

                case "Gen II - Johto":
                    console.log("Gen II - Johto");
                    break;

                case "Gen III - Hoenn":
                    console.log("Gen III - Hoenn");
                    break;

                case "Gen IV - Sinnoh":
                    console.log("Gen IV - Sinnoh");
                    break;

                case "Gen V - Unova":
                    console.log("Gen V - Unova");
                    break;

                case "Gen VI - Kalos":
                    console.log("Gen VI - Kalos");
                    break;
                
                case "Gen VII - Alola":
                    console.log("Gen VII - Alola");
                    break;

                case "Gen VIII - Galar":
                    console.log("Gen VIII - Galar");
                    break;

                case "Gen IX - Paldea":
                    console.log("Gen IX - Paldea");
                    break;

                default:
                    console.log("Generation doesn't found");
            }
        });
    });
};