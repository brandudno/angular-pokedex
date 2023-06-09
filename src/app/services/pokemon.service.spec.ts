import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { basicPokemonStub, pokemonStub } from './pokemon.service.stub';
import { of } from 'rxjs';
import { Pokemon } from '../models/Pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>  = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [{
        provide: HttpClient, 
        useValue: httpClientSpy
      }]
    });
    service = TestBed.inject(PokemonService);

    httpClientSpy.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemon()', () => {
    const pokemonCollectionStub: Pokemon[] = [pokemonStub, pokemonStub];
    const basicPokemonCollectionStub: Pick<Pokemon, 'name' | 'url'>[] = [basicPokemonStub, basicPokemonStub];

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(
        of({ results: basicPokemonCollectionStub }), 
        of(pokemonStub), 
        of(pokemonStub)
      );
    })

    it('should return an array of Pokémon', (done: DoneFn) => {  
      service.getPokemon(2).subscribe({
        next: (res) => {
          expect(httpClientSpy.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=24&offset=48');
          expect(res).toEqual(pokemonCollectionStub);
          done();
        },
        error: () => done.fail
      })

      expect(httpClientSpy.get).toHaveBeenCalledTimes(3);
    })

  });

  describe('getSinglePokemonDetails()', () => {
    beforeEach(() => {
      httpClientSpy.get.and.returnValue(of(pokemonStub))
    })

    it('should return expected single Pokémon', (done: DoneFn) => {
      service.getSinglePokemonDetails(pokemonStub.id).subscribe({
        next: (pokemon: Pokemon) => {
          expect(pokemon).toEqual(pokemonStub);
          expect(pokemon.name).toBe('Bulbasaur');
          done();
        },
        error: () => {
          done.fail;
        }
      });
  
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
