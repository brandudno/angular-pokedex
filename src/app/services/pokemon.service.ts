import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { BasicPokemon, Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly baseUrl: string = `https://pokeapi.co/api/v2/`;

  constructor(private readonly http: HttpClient) {}

  private getBasicPokemonList(pageNumber: number = 1): Observable<Pick<Pokemon, 'name' | 'url'>[]> {
    const limit: number = 24;
    const offset: number = pageNumber * limit;

    return this.http.get<Pick<Pokemon, 'name' | 'url'>[]>(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`).pipe(map((res: any) => res.results));
  }

  public getPokemon(pageNumber: number = 1): Observable<Pokemon[]> {
    return this.getBasicPokemonList(pageNumber).pipe(
      switchMap((pokemonList: Pick<Pokemon, 'name'| 'url'>[]) => {
        return combineLatest(pokemonList.map((pokemon) => this.http.get<Pokemon>(`${pokemon.url}`)));
      })
    );
  }

  public getSinglePokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}pokemon/${id}`);
  }
}
