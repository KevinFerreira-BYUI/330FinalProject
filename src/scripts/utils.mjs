import { getPokeDetail } from "./API-data.mjs";

export async function loadPokeDataTemplate(data) {
    console.log(data.results)
    let pokemons = await data.results;
    const template = document.querySelector(".poke-card-template");
    const container = document.getElementById("poke-section");
    const cardWelcome = document.getElementById("welcomeMsg");

    cardWelcome.classList.add("hidden");
    container.querySelectorAll("#poke-card").forEach(card => card.remove());

    for (const pokemon of pokemons){
        const details = await getPokeDetail(pokemon.url);

        const clone = template.content.cloneNode(true);
        const [img, pName, pType] = clone.querySelectorAll("img, #poke-name, #poke-type");

        template.setAttribute("data-filled", "true");

        img.src = `${details.img}`;
        img.alt = `${details.name}`;
        pName.textContent = `${details.name.toUpperCase()}`;
        pType.textContent = `${details.type.toUpperCase()}`;

        container.appendChild(clone);
    };
};

