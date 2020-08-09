import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit {

  pois=[];
  // This variable will define the center of the map. It's initialized at the coordinates of Paris
  geoloc = {
    lat: 48.8534100,
    lng: 2.3488000
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



  // Ask the user to activate the geolocation and change the geoloc variable if the user accepts
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
