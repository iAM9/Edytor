import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlinkDialogComponent } from './hyperlink-dialog.component';

describe('HyperlinkDialogComponent', () => {
  let component: HyperlinkDialogComponent;
  let fixture: ComponentFixture<HyperlinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyperlinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
