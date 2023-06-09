import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public pokemonList$: Observable<Pokemon[]> = this.currentPage$.pipe(
    switchMap((currentPage: number) => this._pokemonService.getPokemon(currentPage))
  )

  constructor(
    private readonly _pokemonService: PokemonService
  ) {}

  public nextPage(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  public previousPage(): void {
    if (this.currentPage$.value <= 0) return;

    this.currentPage$.next(this.currentPage$.value - 1);
  }
}
