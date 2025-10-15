import '../styles/style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getPokemonsByGen } from './API-data.mjs'
import { removeDropend, changeHeaderStyle, showGenList } from './dinamic-styles.mjs';
import { loadPokeCardByName, buildPokeBoxTemplpate } from './utils.mjs';


const path = window.location.pathname;
switch (path){

    case ("/"):
        // Remove class "dropend" from the shearch gen's
        removeDropend();
        window.addEventListener("resize", removeDropend);

        // change some styles from Header
        changeHeaderStyle();
        window.addEventListener("resize", changeHeaderStyle);

        // List of all pokemons generations
        showGenList();

        //Load pokemons on the screen
        getPokemonsByGen();

        //Load a specifc pokemon card
        loadPokeCardByName();
    break;

    case("/pages/pokeBox.html"):

        // Build template for the pokemon box
        buildPokeBoxTemplpate();
    break;

    default:
        console.log("page not found!");
}