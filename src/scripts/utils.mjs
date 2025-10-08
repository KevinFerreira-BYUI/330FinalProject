import { getPokeDetail } from "./API-data.mjs";

export async function loadPokeDataTemplate(data) {
    //let pokemons = await getKantoPokemons();
    console.log(`aaaaaaaaaaaa ${data}`);
    const pokemons = await data;
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");

    for (const pokemon of pokemons){
        const details = await getPokeDetail(pokemon.url);

        const clone = template.content.cloneNode(true);
        const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

        img.src = `${details.img}`;
        img.alt = `${details.name}`;
        pName.textContent = `${details.name.toUpperCase()}`;
        pType.textContent = `${details.type.toUpperCase()}`;

        container.appendChild(clone);
    };
};
