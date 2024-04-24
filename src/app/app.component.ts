import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenSizeService } from './services/screen-size.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'PortfolioII';

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit(): void {
    this.screenSizeService.setScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenSizeService.setScreenSize();
  }
}
