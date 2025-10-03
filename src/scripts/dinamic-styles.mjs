export function removeDropend() {
    const dropendBtn = document.querySelector(".btn-group");

    if(window.innerWidth <= 850){
        dropendBtn.classList.remove("dropend");
    } else{
        dropendBtn.classList.add("dropend");
    }
};

export function changeHeaderStyle() {
    const divHeader = document.getElementById("div-searchPokeGen");
    const dropendBtn = document.querySelector(".btn-group");

    if(window.innerWidth <= 767){
        divHeader.classList.remove("justify-content-evenly");
        divHeader.classList.add("yeahBro");
        dropendBtn.classList.add("pt-3");
    } else{
        divHeader.classList.add("justify-content-evenly");
        divHeader.classList.remove("yeahBro");
        dropendBtn.classList.remove("pt-3");
    }
};

export function showGenList() {
    const gens = [
        "Gen I - Kanto",
        "Gen II - Johto",
        "Gen III - Hoenn",
        "Gen IV - Sinnoh",
        "Gen V - Unova",
        "Gen VI - Kalos",
        "Gen VII - Alola",
        "Gen VIII - Galar",
        "Gen VIII - Galar",
        "Gen IX - Paldea"
    ];

    const genList = document.getElementById("ul-gen-list");
    gens.forEach(gen => {
        const li = document.createElement("li");
        li.classList.add("ps-2");
        li.textContent = gen;
        genList.appendChild(li);
    });
    
};