import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.css']
})
export class PoiListComponent implements OnInit {

  statePoi;
  pois: any;

  constructor(
    private poiService: PoiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.statePoi = this.router.url;
    this.retrievePois();
  }

  retrievePois(): void {
    if ( this.statePoi === '/poi' ){
      this.poiService.getPublished()
        .subscribe(
          data => {
            this.pois = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    } else if ( this.statePoi === '/draft' ){
      this.poiService.getDraft()
        .subscribe(
          data => {
            this.pois = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
  }

}
