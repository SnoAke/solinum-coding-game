import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';

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

  constructor(
    private poiService: PoiService,
  ) { }

  ngOnInit(): void {
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

    this.newPoi();
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
