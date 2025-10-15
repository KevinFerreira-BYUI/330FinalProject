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
    const spinner = document.getElementById("spinner");
    const logo = document.querySelector(".logo");

    if(window.innerWidth <= 767){
        divHeader.classList.remove("justify-content-evenly");
        divHeader.classList.add("yeahBro");
        dropendBtn.classList.add("pt-3");
        spinner.classList.add("pt-2");
        logo.classList.add("w-50");
        logo.classList.remove("w-25");
    } else{
        divHeader.classList.add("justify-content-evenly");
        divHeader.classList.remove("yeahBro");
        dropendBtn.classList.remove("pt-3");
        spinner.classList.remove("pt-2");
        logo.classList.remove("w-50");
        logo.classList.add("w-25");
    }
};

export function changeHeaderStylePokeBox() {
    const logo = document.querySelector(".logo");

    if(window.innerWidth <= 767){
        logo.classList.add("w-50");
        logo.classList.remove("w-25");
    } else{
        logo.classList.remove("w-50");
        logo.classList.add("w-25");
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
        "Gen IX - Paldea"
    ];

    const genList = document.getElementById("ul-gen-list");
    gens.forEach(gen => {
        const li = document.createElement("li");
        li.classList.add("ps-2", "gen-item");
        li.textContent = gen;
        genList.appendChild(li);
    }); 
};

export function changeAligmentFromFooter() {
    const gridFooterContainer = document.getElementById("gridFooterContainer");

    if(window.innerWidth <= 991){
        gridFooterContainer.classList.remove("row");
        gridFooterContainer.classList.add("d-flex", "flex-column", "mb-3");
    } else{
        gridFooterContainer.classList.add("row");
        gridFooterContainer.classList.remove("d-flex", "flex-column", "mb-3");
    }
};