import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-device-mapper',
  templateUrl: './device-mapper.component.html',
  styleUrls: ['./device-mapper.component.css']
})
export class DeviceMapperComponent implements OnInit {

  metersPerImpulse: string = '1';

  deviceMapperForm = this.formBuilder.group({
    metersPerImpulse: '1'
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onChange(): void {
    console.log('form has been submitted', this.deviceMapperForm.value);
    if (!isNaN(Number(this.deviceMapperForm.value.metersPerImpulse)) && this.deviceMapperForm.value.metersPerImpulse !== '') {
      this.metersPerImpulse = this.deviceMapperForm.value.metersPerImpulse;
    }
  }
}
