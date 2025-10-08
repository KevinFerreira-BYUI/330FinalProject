import '../styles/style.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getKantoPokemons, getPokemonByName, getPokemonById, getPokeDetail, getPokemonsByGen } from './API-data.mjs'
import { removeDropend, changeHeaderStyle, showGenList } from './dinamic-styles.mjs';

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

