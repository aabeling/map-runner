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
  private latlngs : any;
  private runner!: L.Marker;
  private trackIndex : number = 0;

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
      },
      gpx_options: {
        parseElements: ['track', 'route', 'waypoint']
      }
    }).on('loaded', function(e : any) {
      var gpx = e.target;
      self.map.fitBounds(gpx.getBounds());
      var layer = e.layers;
      self.latlngs = layer.getLatLngs();
      self.initRun();
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

    this.trackIndex++;
    if (this.trackIndex >= this.latlngs.length) {
      this.trackIndex = 0;
    }
    this.runner.setLatLng([this.latlngs[this.trackIndex].lat, this.latlngs[this.trackIndex].lng]);
    this.map.panTo(this.runner.getLatLng());
  }

  initRun(): void {
    /* put the runner marker on the first track point */   
    console.log("starting at ", this.latlngs[0].lat, this.latlngs[0].lng);

    var icon = new L.Icon.Default();
    icon.options.shadowSize = [0,0];
    this.runner = new L.Marker([this.latlngs[0].lat, this.latlngs[0].lng], {icon : icon});
    this.runner.addTo(this.map);
  }
}
