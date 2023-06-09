import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public pokemonId$: Observable<number> = this._activatedRoute.paramMap.pipe(
    map((params: ParamMap) => parseInt(params.get('id') as string))
  )

  public pokemon$: Observable<Pokemon> = this.pokemonId$.pipe(
    switchMap((id: number) => this._pokemonService.getSinglePokemonDetails(id))
  );

  constructor (
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _pokemonService: PokemonService
  ) { }
}
