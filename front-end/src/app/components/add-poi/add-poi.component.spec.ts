import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoiComponent } from './add-poi.component';
import { HttpClientModule } from '@angular/common/http';

describe('AddPoiComponent', () => {
  let component: AddPoiComponent;
  let fixture: ComponentFixture<AddPoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [ AddPoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
