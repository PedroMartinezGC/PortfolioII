import { NgStyle } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'pf-magnetic-button',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './magnetic-button.component.html',
	styleUrl: './magnetic-button.component.scss'
})
export class MagneticButtonComponent {

	@ViewChild('magneticButton') magneticButton: ElementRef;

	moveStrength: number = 20;

	@Input() horizontalPadding: string = '50px';
	@Input() verticalPadding: string = '30px';
	@Input() text: string = 'Test';

  moveMagnet(event: MouseEvent) {
    const magnetButton = event.currentTarget as HTMLElement;
    const bounding = magnetButton.getBoundingClientRect();
    const offsetX = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * this.moveStrength;
    const offsetY = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * this.moveStrength;

    magnetButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  resetMagnet(event: MouseEvent) {
    const magnetButton = event.currentTarget as HTMLElement;
    magnetButton.style.transform = 'translate(0, 0)';
  }
}
