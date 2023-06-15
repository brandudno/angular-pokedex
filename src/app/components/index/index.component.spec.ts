import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonServiceStub } from 'src/app/services/pokemon.service.stub';

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
});
