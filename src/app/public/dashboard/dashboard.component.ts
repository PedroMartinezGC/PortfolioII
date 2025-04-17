import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { HamburguerButtonComponent } from '../../components/hamburguer-button/hamburguer-button.component';
import { ScreenSizeEnum, ScreenSizeService } from '../../services/screen-size.service';
import { DOCUMENT, NgIf } from '@angular/common';
import { InfiniteMarqueeComponent } from '../../components/infinite-marquee/infinite-marquee.component';
import { MagneticButtonComponent } from '../../components/magnetic-button/magnetic-button.component';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PopoverComponent } from '../../components/popover/popover.component';

enum PageSectionsEnum {
	Experience = 'Experience',
	Contact = 'Contact'
}
export enum ThemeEnum {
	Light = 'Light',
	Dark = 'Dark'
}

enum TranslateLangsEnum {
	es = 'es',
	en = 'en',
	de = 'de'
}

interface ThemeImagesModel {
	imageFooter: string;
	imageMain: string;
	imageMiddle1: string;
	imageMiddle2: string;
}


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		HamburguerButtonComponent, 
		InfiniteMarqueeComponent, 
		MagneticButtonComponent, 
		ToggleButtonComponent,
		PopoverComponent,
		NgIf,
		TranslateModule
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	private currentTheme: ThemeEnum = ThemeEnum.Dark;

	isMenuOpened: boolean = false;
	isLangPopoverOpened: boolean = false;
	showMobileMenu: boolean = false;
	pageSectionsEnum = PageSectionsEnum;
	themeEnum = ThemeEnum;
	images: ThemeImagesModel;
	selectedLang: TranslateLangsEnum;
	translateLangsEnum = TranslateLangsEnum;
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
	@ViewChild('langPopover') langPopover: ElementRef;
	@ViewChild('langButton') langButton: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
	@ViewChild('hamburguerButton') hamburguerButton: HamburguerButtonComponent;
	@ViewChild('experienceSection') experienceSection: ElementRef;
	@ViewChild('contactSection') contactSection: ElementRef;

	constructor( private renderer2: Renderer2,
				 private screenSizeService: ScreenSizeService,
				 private translate: TranslateService,
				 @Inject(DOCUMENT) private document: Document ) {
	}

	ngOnInit() {
		this.selectedLang = this.translate.currentLang as TranslateLangsEnum;
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
	 * Close dorpdowns on clicking outside when some of them is opened
	 */
	closeDropdowns() {
		console.log(this.isLangPopoverOpened)
		if (this.isMenuOpened) {
			this.toggleDropdownMenu();
		}
		if (this.isLangPopoverOpened) {
			this.toggleLangPopover();
			console.log(this.isLangPopoverOpened)
		}
	}

	/**
	 * Open and closes menu dropdown; When closes, it hides the dropdown under navMenu.
	 * @param event 
	 */
	toggleDropdownMenu() {
		const navMenuHeight = this.navMenu.nativeElement.clientHeight;
		this.isMenuOpened ? this.closeMenu(navMenuHeight) : this.openMenu(navMenuHeight);
		this.hamburguerButton.onHamburguerClick();
	}

	toggleLangPopover() {
		this.isLangPopoverOpened ? this.closeLangPopover() : this.openLangPopover();
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

	changeLang(lang: TranslateLangsEnum) {
		this.translate.use(lang);
		this.selectedLang = lang;
	}

	private initSlider() {
		this.sliderHeight = this.slider.nativeElement.getBoundingClientRect().clientHeight;
		document.body.style.height = `${this.sliderHeight - (window.innerHeight - window.innerWidth)}px`;
	}

	private openMenu(navMenuHeight: number) {
		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', navMenuHeight + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid inherit');
		setTimeout(() => { this.isMenuOpened = true }, 300);
	}

	private closeMenu(navMenuHeight: number) {
		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', (-1 * navMenuHeight) + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid inherit');
		setTimeout(() => { this.isMenuOpened = false }, 300);
	}

	private openLangPopover() {
		this.renderer2.setStyle(this.langPopover.nativeElement, 'height', '77px');
		setTimeout(() => { this.isLangPopoverOpened = true }, 300);
	}

	private closeLangPopover() {
		this.renderer2.setStyle(this.langPopover.nativeElement, 'height', '0px');
		setTimeout(() => { this.isLangPopoverOpened = false }, 300);
	}

	private setThemeColor(theme: ThemeEnum) {
		if (theme === ThemeEnum.Light) {
			this.document.documentElement.style.setProperty('--primary', this.lightTheme.primary);
			this.document.documentElement.style.setProperty('--secondary', this.lightTheme.secondary);
			this.document.documentElement.style.setProperty('--background', this.lightTheme.background);
			this.document.documentElement.style.setProperty('--background-light', this.lightTheme.backgroundLight);
			this.document.documentElement.style.setProperty('--dark-light', this.lightTheme.darkLight);
			this.images = {
				imageMain: this.imageRoutes.lightMain,
				imageFooter: this.imageRoutes.lightFooter,
				imageMiddle1: this.imageRoutes.lightMiddle1,
				imageMiddle2: this.imageRoutes.lightMiddle2
			}
		} else {
			this.document.documentElement.style.setProperty('--primary', this.darkTheme.primary);
			this.document.documentElement.style.setProperty('--secondary', this.darkTheme.secondary);
			this.document.documentElement.style.setProperty('--background', this.darkTheme.background);
			this.document.documentElement.style.setProperty('--background-light', this.darkTheme.backgroundLight);
			this.document.documentElement.style.setProperty('--dark-light', this.darkTheme.darkLight);
			this.images = {
				imageMain: this.imageRoutes.darkMain,
				imageFooter: this.imageRoutes.darkFooter,
				imageMiddle1: this.imageRoutes.darkMiddle1,
				imageMiddle2: this.imageRoutes.darkMiddle2
			}
		}
	}

}
