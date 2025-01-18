import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { HamburguerButtonComponent } from '../../components/hamburguer-button/hamburguer-button.component';
import { ScreenSizeEnum, ScreenSizeService } from '../../services/screen-size.service';
import { DOCUMENT, NgIf } from '@angular/common';
import { InfiniteMarqueeComponent } from '../../components/infinite-marquee/infinite-marquee.component';
import { MagneticButtonComponent } from '../../components/magnetic-button/magnetic-button.component';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';

enum PageSectionsEnum {
	Experience = 'Experience',
	Contact = 'Contact'
}
export enum ThemeEnum {
	Light = 'Light',
	Dark = 'Dark'
}


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [HamburguerButtonComponent, InfiniteMarqueeComponent, MagneticButtonComponent, ToggleButtonComponent, NgIf],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	private currentTheme: ThemeEnum = ThemeEnum.Dark;

	isMenuOpened: boolean = false;
	showMobileMenu: boolean = false;
	pageSectionsEnum = PageSectionsEnum;
	themeEnum = ThemeEnum;
	imageFooter: string;
	imageMain: string;
	imageMiddle1: string;
	imageMiddle2: string;
	imageRoutes = {
		darkMain: 'assets/images/dark-main.jpg',
		lightMain: 'assets/images/light-main.jpg',
		darkFooter: 'assets/images/dark-footer.jpg',
		lightFooter: 'assets/images/light-footer.jpg',
		darkMiddle1: 'assets/images/dark-middle1.jpg',
		lightMiddle1: 'assets/images/light-middle1.jpg',
		darkMiddle2: 'assets/images/dark-middle2.jpg',
		lightMiddle2: 'assets/images/light-middle2.jpg'
	}
	lightTheme = {
		primary: 'black',
		secondary: '#cc0b00',
		background: '#f6ebe5',
		backgroundLight: '#fffaf7',
		darkLight: '#9c8e8e'
	}
	darkTheme = {
		primary: '#f6ebe5',
		secondary: '#dbc53a',
		background: '#000',
		backgroundLight: '#2c2b2b',
		darkLight: '#9c8e8e'
	}

	current = 0;
	target  = 0;
	ease    = .05;
	sliderHeight: any;

	@ViewChild('slider') slider: ElementRef;
	@ViewChild('menuDropdown') menuDropdown: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
	@ViewChild('hamburguerButton') hamburguerButton: HamburguerButtonComponent;
	@ViewChild('experienceSection') experienceSection: ElementRef;
	@ViewChild('contactSection') contactSection: ElementRef;

	constructor( private renderer2: Renderer2,
				 private screenSizeService: ScreenSizeService,
				 @Inject(DOCUMENT) private document: Document ) {
	}

	ngOnInit() {
		this.setThemeColor(this.currentTheme);
		this.screenSizeService.mediaDevice$.subscribe((mediaDevice: ScreenSizeEnum) => {
			this.showMobileMenu = mediaDevice === ScreenSizeEnum.Mobile || mediaDevice === ScreenSizeEnum.Tablet ? true : false;
		});
		this.renderer2.listen('window', 'load', () => {
            this.initSlider();
			//this.animateSmoothScroll();
        })
	}

	onToggleThemeButton(isActve: boolean) {
		this.currentTheme = isActve ? ThemeEnum.Light : ThemeEnum.Dark;
		setTimeout(() => { this.setThemeColor(this.currentTheme) }, 500);
	}

	//Smooth scroll
	animateSmoothScroll() {
		this.target = window.scrollY;
		this.current += (this.target - this.current) * this.ease;
		this.setTransform(this.slider.nativeElement, `translateY(-${this.current}px)`);
		requestAnimationFrame(() => this.animateSmoothScroll()); // Call recursively
	}
	
	setTransform(el: HTMLElement, transform: any) {
		this.renderer2.setStyle(el, 'transform', transform);
	}
	//

	/**
	 * Open and closes menu dropdown; When closes, it hides the dropdown under navMenu.
	 * @param event 
	 */
	toggleDropdownMenu() {
		const navMenuHeight = this.navMenu.nativeElement.clientHeight;
		this.isMenuOpened ? this.closeMenu(navMenuHeight) : this.openMenu(navMenuHeight);
		this.hamburguerButton.onHamburguerClick();
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	scrollToSection(sectionEnum: PageSectionsEnum) {
		let section: any;
		switch (sectionEnum) {
			case PageSectionsEnum.Experience:
				section = this.experienceSection.nativeElement;
				break;
			case PageSectionsEnum.Contact:
				section = this.contactSection.nativeElement;
				break;
		}
		section.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	private initSlider() {
		this.sliderHeight = this.slider.nativeElement.getBoundingClientRect().clientHeight;
		document.body.style.height = `${this.sliderHeight - (window.innerHeight - window.innerWidth)}px`;
	}

	private openMenu(navMenuHeight: number) {
		const borderBottomColor = this.currentTheme === ThemeEnum.Dark ? this.darkTheme.backgroundLight : this.lightTheme.backgroundLight;

		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', navMenuHeight + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid ' + borderBottomColor);
		setTimeout(() => { this.isMenuOpened = true }, 300);
	}

	private closeMenu(navMenuHeight: number) {
		const borderBottomColor = this.currentTheme === ThemeEnum.Dark ? this.darkTheme.primary : this.lightTheme.primary;
		
		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', (-1 * navMenuHeight) + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid ' + borderBottomColor);
		setTimeout(() => { this.isMenuOpened = false }, 300);
	}

	private setThemeColor(theme: ThemeEnum) {
		if (theme === ThemeEnum.Light) {
			this.document.documentElement.style.setProperty('--primary', this.lightTheme.primary);
			this.document.documentElement.style.setProperty('--secondary', this.lightTheme.secondary);
			this.document.documentElement.style.setProperty('--background', this.lightTheme.background);
			this.document.documentElement.style.setProperty('--background-light', this.lightTheme.backgroundLight);
			this.document.documentElement.style.setProperty('--dark-light', this.lightTheme.darkLight);
			this.imageMain = this.imageRoutes.lightMain;
			this.imageFooter = this.imageRoutes.lightFooter;
			this.imageMiddle1 = this.imageRoutes.lightMiddle1;
			this.imageMiddle2 = this.imageRoutes.lightMiddle2;
		} else {
			this.document.documentElement.style.setProperty('--primary', this.darkTheme.primary);
			this.document.documentElement.style.setProperty('--secondary', this.darkTheme.secondary);
			this.document.documentElement.style.setProperty('--background', this.darkTheme.background);
			this.document.documentElement.style.setProperty('--background-light', this.darkTheme.backgroundLight);
			this.document.documentElement.style.setProperty('--dark-light', this.darkTheme.darkLight);
			this.imageMain = this.imageRoutes.darkMain;
			this.imageFooter = this.imageRoutes.darkFooter;
			this.imageMiddle1 = this.imageRoutes.darkMiddle1;
			this.imageMiddle2 = this.imageRoutes.darkMiddle2;
		}
	}

}
