import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-gpx';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 54.25720281, 10.19119263 ],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    /* add test gpx layer */
    var gpx = 'assets/gpx/test.gpx';
    var self = this;        
    new L.GPX(gpx, {
      async: true,
      marker_options: {
        startIconUrl: undefined,
        endIconUrl: undefined,
        shadowUrl: undefined
      }
    }).on('loaded', function(e : any) {
      self.map.fitBounds(e.target.getBounds());
    }).addTo(this.map);
    
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onRightClick(event: any): boolean {
    this.onImpulse();
    return false;
  }

  /**
   * Handles an impulse from a training device.
   */
  onImpulse(): void {
    console.log(new Date(), "onImpulse");
  }
}
