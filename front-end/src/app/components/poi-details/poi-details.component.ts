import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PoiService } from '../../services/poi.service';

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



  constructor(
    private poiService: PoiService,
    private router: Router,
  ) { }




  ngOnInit(): void {

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
