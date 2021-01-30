import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditorPageComponent } from './main-editor-page.component';

describe('MainEditorPageComponent', () => {
  let component: MainEditorPageComponent;
  let fixture: ComponentFixture<MainEditorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEditorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
