import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PoiService } from '../../services/poi.service';

@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css']
})
export class AddPoiComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
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
    this.poiForm.setValue({
      name: "",
      address:"",
      full_address: "",
      longitude: 0,
      latitude: 0,
      type: "",
      poster_email: ""
    });
  }


  onSubmit() {
    if ( this.poiForm.invalid ) return; else this.savePoi();
  }

}
