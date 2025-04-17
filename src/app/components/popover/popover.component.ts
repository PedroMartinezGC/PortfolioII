import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'pf-popover',
	standalone: true,
	imports: [],
	templateUrl: './popover.component.html',
	styleUrl: './popover.component.scss'
})
export class PopoverComponent {
	private allowClick: boolean = true; // used for avoid double click

	constructor(private renderer: Renderer2) {
	}

	ngOnInit() {
	}

	@ViewChild('popover', { static: true }) popover!: ElementRef;

	onTogglePopover(open: boolean) {
		if (this.allowClick) {
			this.allowClick = false;
			open ? this.openPopover() : this.closePopover();
			setTimeout(() => { this.allowClick = true }, 300); // Another click will be allowed in 300ms
		}
	}

	private openPopover() {
		console.log('open')
		this.renderer.setStyle(this.popover.nativeElement, 'height', 'auto');
	}

	private closePopover() {
		console.log('close')
		this.renderer.setStyle(this.popover.nativeElement, 'height', '40px');
	}
}
