import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HamburguerButtonComponent } from '../../components/hamburguer-button/hamburguer-button.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HamburguerButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isMenuOpened: boolean = false;

  @ViewChild('menuDropdown') menuDropdown: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('hamburguerButton') hamburguerButton: HamburguerButtonComponent;

  constructor( private renderer2: Renderer2 )  {
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

}
