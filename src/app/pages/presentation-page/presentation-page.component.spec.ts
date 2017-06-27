import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationPageComponent } from './presentation-page.component';

describe('PresentationPageComponent', () => {
  let component: PresentationPageComponent;
  let fixture: ComponentFixture<PresentationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
