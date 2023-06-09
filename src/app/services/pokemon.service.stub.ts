import { Pokemon } from "../models/Pokemon";

export const basicPokemonStub: Pick<Pokemon, 'name' | 'url'> = {
  name: 'Chikorita',
  url: 'http://test.chikorita'
}

export const pokemonStub: Pokemon = {
  name: 'Bulbasaur',
  id: 1,
  types: [{
    type: {
      name: 'grass'
    }
  }],
  sprites: {
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    back_female:null,
    back_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    back_shiny_female:null,
    front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_female:null,
    front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    front_shiny_female:null,
    other: {
      home: {
        front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
        front_female:null,
        front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
        front_shiny_female:null
      }
    }
  },
  url: 'http://testpokemon.com/bulbasaur'
}