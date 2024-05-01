import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ScreenSizeEnum {
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  Desktop = 'Desktop'
}

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private mediaDeviceSubject = new BehaviorSubject<ScreenSizeEnum>(ScreenSizeEnum.Desktop);
  mediaDevice$ = this.mediaDeviceSubject.asObservable();

  //Breakpoints
  private breakpoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }

  constructor( private platform: Platform ) {
  }

  private isSmallDevice(width: number): boolean {
    return width && width <= this.breakpoints.sm ? true : false;
  }

  private isMediumDevice(width: number): boolean {
    return width && width > this.breakpoints.sm && width <= this.breakpoints.md ? true : false;
  }

  setScreenSize() {
    const screenWidth = this.platform.isBrowser ? window.innerWidth : null;

    if (screenWidth) {
      const mediaDevice = this.isSmallDevice(screenWidth) ? ScreenSizeEnum.Mobile : this.isMediumDevice(screenWidth) ? ScreenSizeEnum.Tablet : ScreenSizeEnum.Desktop;
      this.mediaDeviceSubject.next(mediaDevice);
    }
  }
}
