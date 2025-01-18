import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'pf-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {
  isActive: boolean = false;

  @ViewChild('toggleButton', { static: true }) toggleButton!: ElementRef;
  @Output() onToggle = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
    onClick(): void {
      const button = this.toggleButton.nativeElement;
      button.classList.toggle('active');

      this.isActive = button.classList.contains('active');
      this.onToggle.emit(this.isActive)
    }
  
}
