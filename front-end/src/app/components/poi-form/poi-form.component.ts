import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-poi-form',
  templateUrl: './poi-form.component.html',
  styleUrls: ['./poi-form.component.css']
})
export class PoiFormComponent implements OnInit {

  @Input() poi;
  private geoCoder;

  @ViewChild('addressSearch') addressSearchRef: ElementRef;


  constructor(
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
          this.poi.address = place.formatted_address;
          this.poi.full_address = place.formatted_address;
          this.poi.latitude = place.geometry.location.lat();
          this.poi.longitude = place.geometry.location.lng();
        });
      });
    });

  }

}
