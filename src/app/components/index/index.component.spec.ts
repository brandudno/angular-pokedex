import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from 'src/app/services/pokemon.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  const pokemonServiceSpy: jasmine.SpyObj<PokemonService> = jasmine.createSpyObj('PokemonService', ['getPokemon'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: PokemonService, 
        useValue: pokemonServiceSpy
      }]
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    pokemonServiceSpy.getPokemon.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
