import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HamburguerButtonComponent } from '../../components/hamburguer-button/hamburguer-button.component';
import { ScreenSizeEnum, ScreenSizeService } from '../../services/screen-size.service';
import { NgIf } from '@angular/common';
import { InfiniteMarqueeComponent } from '../../components/infinite-marquee/infinite-marquee.component';
import { MagneticButtonComponent } from '../../components/magnetic-button/magnetic-button.component';

enum PageSectionsEnum {
	Experience = 'Experience',
	Contact = 'Contact'
}


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [HamburguerButtonComponent, InfiniteMarqueeComponent, MagneticButtonComponent, NgIf],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

	isMenuOpened: boolean = false;
	showMobileMenu: boolean = false;
	pageSectionsEnum = PageSectionsEnum;

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

	@ViewChild('expandible') expandible: ElementRef;

	constructor(private renderer2: Renderer2,
		private screenSizeService: ScreenSizeService) {
	}

	ngOnInit() {
		this.screenSizeService.mediaDevice$.subscribe((mediaDevice: ScreenSizeEnum) => {
			this.showMobileMenu = mediaDevice === ScreenSizeEnum.Mobile || mediaDevice === ScreenSizeEnum.Tablet ? true : false;
		});
		this.renderer2.listen('window', 'load', () => {
            this.initSlider();
			//this.animateSmoothScroll();
        })
	}

	animateSmoothScroll() {
		this.target = window.scrollY;
		this.current += (this.target - this.current) * this.ease;
		this.setTransform(this.slider.nativeElement, `translateY(-${this.current}px)`);
		requestAnimationFrame(() => this.animateSmoothScroll()); // Call recursively
	  }
	
	  setTransform(el: HTMLElement, transform: any) {
		this.renderer2.setStyle(el, 'transform', transform);
	  }
	
	  initSlider() {
		this.sliderHeight = this.slider.nativeElement.getBoundingClientRect().clientHeight;
		document.body.style.height = `${this.sliderHeight - (window.innerHeight - window.innerWidth)}px`;
		console.log(this.slider.nativeElement.getBoundingClientRect().clientHeight)
		console.log(document.body.style.height)
		console.log(this.sliderHeight)
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

	openMenu(navMenuHeight: number) {
		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', navMenuHeight + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid #2c2b2b');
		setTimeout(() => { this.isMenuOpened = true }, 300);
	}

	closeMenu(navMenuHeight: number) {
		this.renderer2.setStyle(this.menuDropdown.nativeElement, 'top', (-1 * navMenuHeight) + 'px');
		this.renderer2.setStyle(this.navMenu.nativeElement, 'border-bottom', '1px solid #f6ebe5');
		setTimeout(() => { this.isMenuOpened = false }, 300);
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	scrollToSection(sectionEnum: PageSectionsEnum) {
		console.log('scroll into section')
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

}
