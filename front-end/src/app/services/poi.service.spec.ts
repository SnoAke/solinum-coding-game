import { TestBed } from '@angular/core/testing';
import { PoiService } from './poi.service';
import { HttpClientModule } from '@angular/common/http';

describe('PoiService', () => {
  let service: PoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(PoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
