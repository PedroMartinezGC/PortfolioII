import { NgStyle, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
	selector: 'pf-infinite-marquee',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './infinite-marquee.component.html',
	styleUrl: './infinite-marquee.component.scss'
})
export class InfiniteMarqueeComponent implements OnInit {
	lerp = { current: 0, target: 0 };
	
	@Input() text: string = 'INFINITE MARQUEE';
	@Input() interpolationFactor: number = 0.1;
	@Input() direction: number = -1; // -1 (to-left), 1 (to-right)
	@Input() speed: number = 0.2;
	@Input() fontFamily: string = 'sans-serif';

  	constructor( private renderer: Renderer2, 
		private elementRef: ElementRef,
		@Inject(PLATFORM_ID) private platformId: Object) {
	}
	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {

		}
		const el = this.elementRef.nativeElement.querySelector('.loop-container');
		this.renderer.setStyle(el, 'position', 'relative');
		this.renderer.setStyle(el, 'display', 'inline-flex');
		this.renderer.setStyle(el, 'white-space', 'nowrap');

		const items = this.elementRef.nativeElement.querySelectorAll('.item');
		this.renderer.setStyle(items[1], 'position', 'absolute');
		this.renderer.setStyle(items[1], 'left', `${100 * -this.direction}%`);

		this.render();
	}

	animate() {
		this.lerp.target += this.speed;
		this.lerp.current = this.lerp.current * (1 - this.interpolationFactor) + this.lerp.target * this.interpolationFactor;

		if (this.lerp.target > 100) {
			this.lerp.current -= this.lerp.target;
			this.lerp.target = 0;
		}

		const x = this.lerp.current * this.direction;
		const el = this.elementRef.nativeElement.querySelector('.loop-container');
		this.renderer.setStyle(el, 'transform', `translateX(${x}%)`);
	}

	render() {
		this.animate();
		if (isPlatformBrowser(this.platformId)) {
			window.requestAnimationFrame(() => this.render());
		}
	}
}
