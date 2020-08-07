import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css']
})
export class AddPoiComponent implements OnInit {

  poi = {
    name: "",
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

    this.poiService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newPoi(): void {
    this.submitted = false;
    this.poi = {
      name: "",
      full_address: "",
      longitude: 0,
      latitude: 0,
      type: "",
      poster_email: ""
    };
  }

}
