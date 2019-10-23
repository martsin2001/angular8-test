import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMessengesComponent } from './search-messenges.component';

describe('SearchMessengesComponent', () => {
  let component: SearchMessengesComponent;
  let fixture: ComponentFixture<SearchMessengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMessengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMessengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
