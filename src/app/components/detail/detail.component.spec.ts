import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonServiceStub } from 'src/app/services/pokemon.service.stub';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: PokemonService, 
        useClass: PokemonServiceStub
      }]
    });
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the pokemon', () => {
    const pokemonNameEl: any = fixture.debugElement.query(By.css('.pokemon-name')).nativeElement;

    expect(pokemonNameEl.textContent.trim()).toContain('Bulbasaur');
  });
});
