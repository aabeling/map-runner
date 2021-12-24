import { Injectable } from '@angular/core';

/**
 * Simulates a training device.
 * 
 * Receives impulses as input and calculates some values like
 * current velocity.
 */
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private metersPerImpulse: number = 1;

  /**
   * Size of the impulse window in seconds.
   */
  private impulseWindowInterval: number = 5;

  /**
   * Stores the timestamps of the last impulses.
   * New impulses are added at the beginning,
   * impulses older than the impulseWindowInterval are
   * removed.
   * The length of the array can then be used
   * to calculate the average speed in the
   * impulseWindowInterval.
   */
  private impulseWindow: Array<number> = [];

  constructor() { }

  /**
   * Returns the velocity
   * @returns the velocity in meters per second
   */
  getVelocity(): number {

    this.clearImpulseWindow();

    let result = this.impulseWindow.length * this.metersPerImpulse / this.impulseWindowInterval;
    console.log("current velocity", result);
    return result;
  }

  setMetersPerImpulse(metersPerImpulse: number): void {
    this.metersPerImpulse = metersPerImpulse;
  }

  getMetersPerImpulse(): number {
    return this.metersPerImpulse;
  }

  onImpulse(): void {

    /* just add a new record to the beginning */
    this.impulseWindow.unshift(Date.now() / 1000);

    this.clearImpulseWindow();
  }

  /**
   * Removes entries from the impulse window
   * which are older than the impulseWindowInterval
   */
  private clearImpulseWindow(): void {

    if (this.impulseWindow.length > 0) {
      let last = undefined;
      do {
        last = this.impulseWindow[this.impulseWindow.length - 1];
        if (last < Date.now() / 1000 - this.impulseWindowInterval) {
          this.impulseWindow.pop();
        } else {
          last = undefined;
        }
      } while (last !== undefined);
    }
  }
}
