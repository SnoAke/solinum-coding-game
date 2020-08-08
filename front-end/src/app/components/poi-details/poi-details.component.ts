import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { PoiService } from '../../services/poi.service';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.css']
})
export class PoiDetailsComponent implements OnInit {

  poiId = "";
  poiForm = new FormGroup({
    poster_email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    full_address: new FormControl(''),
    longitude: new FormControl(''),
    latitude: new FormControl(''),
    type: new FormControl(''),
  });
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
      name: this.poiForm.get('name').value,
      address: {
        full_address: this.poiForm.get('full_address').value,
        longitude: this.poiForm.get('longitude').value,
        latitude: this.poiForm.get('latitude').value,
      },
      type: this.poiForm.get('type').value,
      poster_email: this.poiForm.get('poster_email').value
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
          this.poiForm.patchValue({
            name: data.name,
            type: data.type,
            poster_email: data.poster_email
          });

          if ( data.address ){
            this.poiForm.patchValue({
              address: data.address.full_address,
              full_address: data.address.full_address,
              longitude: data.address.longitude,
              latitude: data.address.latitude,
            });
          }

          console.log(data);
        },
        error => {
          console.log(error);
        });

    this.submitted = false;
  }




  changeStatus ( status: string ){

    if ( this.poiForm.invalid ) return; 

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



  onSubmit() {
    if ( this.poiForm.invalid ) return; else this.savePoi();
  }

}
