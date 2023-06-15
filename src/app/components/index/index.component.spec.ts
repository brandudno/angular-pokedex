import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonServiceStub } from 'src/app/services/pokemon.service.stub';
import { Pokemon } from 'src/app/models/Pokemon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: PokemonService, 
        useClass: PokemonServiceStub
      }],
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a current page of 0 by default', (done: DoneFn) => {
    component.currentPage$.subscribe({
      next: (pageNumber: number) => {
        expect(pageNumber).toBe(0);
        done();
      }, 
      error: () => done.fail
    })
  });

  it('should getPokemon list', (done: DoneFn) => {
    const pokemonListHtmlElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.single-pokemon'));
    
    component.pokemonList$.subscribe({
      next: (pokemonList: Pokemon[]) => {
        expect(pokemonList.length).toBe(2);
        expect(pokemonListHtmlElements.length).toBe(2);
        done();
      },
      error: () => done.fail
    });

    expect(true).toBe(true);
  });

  it('should increment the current page when Next button is pressed', (done: DoneFn) => {
    const nextButton: DebugElement = fixture.debugElement.query(By.css('.next-button'));

    nextButton.triggerEventHandler('click');

    component.currentPage$.subscribe({
      next: (pageNumber: number) => {
        expect(pageNumber).toBe(1);
        expect(pageNumber).not.toBe(0);
        done();
      }, 
      error: () => done.fail
    });
  });

  it('should expect previous button to be hidden if current page is 0', (done: DoneFn) => {
    const previousButton: DebugElement = fixture.debugElement.query(By.css('.previous-button'));

    component.currentPage$.subscribe({
      next: (pageNumber: number) => {
        expect(pageNumber).toBe(0);
        expect(previousButton).toBeNull();
        done();
      }, 
      error: () => done.fail
    });
  });

  it('should expect previous button to be visible if current page is greater than 0', (done: DoneFn) => {
    component.currentPage$.next(1);
    fixture.detectChanges();

    const previousButton: DebugElement = fixture.debugElement.query(By.css('.previous-button'));

    component.currentPage$.subscribe({
      next: (pageNumber: number) => {
        expect(pageNumber).toBe(1);
        expect(previousButton).not.toBeNull();
        done();
      }, 
      error: () => done.fail
    });
  });
});
