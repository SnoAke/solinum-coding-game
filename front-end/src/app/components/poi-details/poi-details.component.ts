import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { PoiService } from '../../services/poi.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.css']
})
export class PoiDetailsComponent implements OnInit {

  poiId = "";
  poi = {
    name: "",
    address: "",
    full_address: "",
    longitude: 0,
    latitude: 0,
    type: "",
    poster_email: ""
  };
  submitted = false;
  private geoCoder;

  @ViewChild('addressSearch') addressSearchRef: ElementRef;




  constructor(
    private poiService: PoiService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }




  ngOnInit(): void {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.addressSearchRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.poi.full_address = place.formatted_address;
          this.poi.latitude = place.geometry.location.lat();
          this.poi.longitude = place.geometry.location.lng();
        });
      });
    });

    this.poiId = this.router.url.split('/').pop();

    this.getPoi();

  }




  savePoi(): void {
    const data = {
      name: this.poi.name,
      address: {
        full_address: this.poi.full_address,
        longitude: this.poi.longitude,
        latitude: this.poi.latitude,
      },
      type: this.poi.type,
      poster_email: this.poi.poster_email
    };

    this.poiService.update( this.poiId, data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

    this.getPoi();
  }





  getPoi(): void {
    this.poiService.getOne(this.poiId)
      .subscribe(
        data => {
          this.poi.name = data.name;
          this.poi.type = data.type;
          this.poi.poster_email = data.poster_email;

          if ( data.address ){
            this.poi.address = data.address.full_address;
            this.poi.full_address = data.address.full_address;
            this.poi.longitude = data.address.longitude;
            this.poi.latitude = data.address. latitude;
          }

          console.log(data);
        },
        error => {
          console.log(error);
        });

    this.submitted = false;
  }




  changeStatus ( status: string ){

    const data = {
      state: status
    }

    this.poiService.changeStatus( this.poiId, data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
