import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HamburguerButtonComponent } from '../../components/hamburguer-button/hamburguer-button.component';
import { ScreenSizeEnum, ScreenSizeService } from '../../services/screen-size.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HamburguerButtonComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  isMenuOpened: boolean = false;
  showMobileMenu: boolean = false;

  @ViewChild('menuDropdown') menuDropdown: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('hamburguerButton') hamburguerButton: HamburguerButtonComponent;
  @ViewChild('slideTop') slideTop: ElementRef;
  @ViewChild('sliderTopBox') sliderTopBox: ElementRef;
  @ViewChild('slideBottom') slideBottom: ElementRef;
  @ViewChild('sliderBottomBox') sliderBottomBox: ElementRef;

  constructor(private renderer2: Renderer2,
              private screenSizeService: ScreenSizeService )  {
  }

  ngOnInit() {
    this.screenSizeService.mediaDevice$.subscribe((mediaDevice: ScreenSizeEnum) => {
      console.log(mediaDevice)
      this.showMobileMenu = mediaDevice === ScreenSizeEnum.Mobile || mediaDevice === ScreenSizeEnum.Tablet ? true : false;
      console.log(this.showMobileMenu)
    });
  }

  ngAfterViewInit(): void {
    const copySliderTop = this.slideTop.nativeElement.cloneNode(true);
    const copySliderBottom = this.slideBottom.nativeElement.cloneNode(true);

    this.sliderTopBox.nativeElement.appendChild(copySliderTop);
    this.sliderBottomBox.nativeElement.appendChild(copySliderBottom);
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

  private copySliderContent(slide: ElementRef, sliderBox: ElementRef) {
    const copy = slide.nativeElement.cloneNode(true);
    sliderBox.nativeElement.appendChild(copy);
  }

}
