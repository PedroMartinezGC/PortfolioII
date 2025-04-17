import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenSizeService } from './services/screen-size.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, TranslateModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	title = 'PortfolioII';

	constructor(private screenSizeService: ScreenSizeService,
		private translate: TranslateService) {

		this.translate.addLangs(['de', 'en']);
		this.translate.setDefaultLang('en');
		this.translate.use('en');
	}

	ngOnInit(): void {
		this.screenSizeService.setScreenSize();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event): void {
		this.screenSizeService.setScreenSize();
	}
}
