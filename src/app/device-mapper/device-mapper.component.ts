import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-mapper',
  templateUrl: './device-mapper.component.html',
  styleUrls: ['./device-mapper.component.css']
})
export class DeviceMapperComponent implements OnInit {

  metersPerImpulse: string = this.deviceService.getMetersPerImpulse().toString();
  velocity: number = 0;
  timer! : any;

  deviceMapperForm = this.formBuilder.group({
    metersPerImpulse: this.metersPerImpulse
  });

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {

    this.timer = setInterval(() => this.updateVelocity(), 1000);
  }

  onChange(): void {
    console.log('form has been submitted', this.deviceMapperForm.value);
    if (!isNaN(Number(this.deviceMapperForm.value.metersPerImpulse)) && this.deviceMapperForm.value.metersPerImpulse !== '') {
      this.deviceService.setMetersPerImpulse(this.deviceMapperForm.value.metersPerImpulse);
    }
  }

  private updateVelocity(): void {

    this.velocity = this.deviceService.getVelocity();
  }
}
