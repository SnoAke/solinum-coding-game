import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit {

  pois=[];
  geoloc = {
    lat: 0,
    lng: 0
  };

  constructor(
    private poiService: PoiService
  ) { }

  ngOnInit(): void {
    this.retrievePois();
    this.geolocate();
  }

  retrievePois(): void {
    this.poiService.getPublished()
      .subscribe(
        data => {
          this.pois = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoloc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }


}
