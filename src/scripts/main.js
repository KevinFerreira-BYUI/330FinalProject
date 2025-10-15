import '../styles/style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getPokemonsByGen } from './API-data.mjs'
import { removeDropend, changeHeaderStyle, changeHeaderStylePokeBox, changeAligmentFromFooter, showGenList } from './dinamic-styles.mjs';
import { loadPokeCardByName, buildPokeBoxTemplpate } from './utils.mjs';


const path = window.location.pathname;
switch (true){

    case (path === "/"):
        // Index Page

        // Remove class "dropend" from the shearch gen's
        removeDropend();
        window.addEventListener("resize", removeDropend);

        // change some styles from Header
        changeHeaderStyle();
        window.addEventListener("resize", changeHeaderStyle);

        // change footer aligment
        changeAligmentFromFooter();
        window.addEventListener("resize", changeAligmentFromFooter);

        // List of all pokemons generations
        showGenList();

        //Load pokemons on the screen
        getPokemonsByGen();

        //Load a specifc pokemon card
        loadPokeCardByName();

    break;

    case(path.includes("pokebox")):
        // PokeBox Page

        // change some styles from Header
        changeHeaderStylePokeBox();
        window.addEventListener("resize", changeHeaderStylePokeBox);

        // change footer aligment
        changeAligmentFromFooter();
        window.addEventListener("resize", changeAligmentFromFooter);

        // Build template for the pokemon box
        buildPokeBoxTemplpate();
    break;

    default:
        console.log("page not found!");
}