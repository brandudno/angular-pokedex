import { Observable, of } from "rxjs";
import { Pokemon } from "../models/Pokemon";
import { pokemonStub } from "./pokemon.service.mock";

export class PokemonServiceStub {
  constructor() {}

  public getPokemon(pageNumber: number = 1): Observable<Pokemon[]> {
    return of([pokemonStub, pokemonStub]);
  }

  public getSinglePokemonDetails(id: number): Observable<Pokemon> {
    return of(pokemonStub);
  }
}