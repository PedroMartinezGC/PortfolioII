import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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

	@ViewChild('menuDropdown') menuDropdown: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
	@ViewChild('hamburguerButton') hamburguerButton: HamburguerButtonComponent;
	@ViewChild('experienceSection') experienceSection: ElementRef;
	@ViewChild('contactSection') contactSection: ElementRef;

	constructor(private renderer2: Renderer2,
		private screenSizeService: ScreenSizeService) {
	}

	ngOnInit() {
		this.screenSizeService.mediaDevice$.subscribe((mediaDevice: ScreenSizeEnum) => {
			this.showMobileMenu = mediaDevice === ScreenSizeEnum.Mobile || mediaDevice === ScreenSizeEnum.Tablet ? true : false;
		});
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
