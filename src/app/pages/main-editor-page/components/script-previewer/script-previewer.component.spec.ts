import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptPreviewerComponent } from './script-previewer.component';

describe('ScriptPreviewerComponent', () => {
  let component: ScriptPreviewerComponent;
  let fixture: ComponentFixture<ScriptPreviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptPreviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
