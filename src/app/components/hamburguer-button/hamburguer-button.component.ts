import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'pf-hamburguer-button',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './hamburguer-button.component.html',
  styleUrl: './hamburguer-button.component.scss'
})
export class HamburguerButtonComponent implements OnInit{

  private allowClick: boolean = true; // used for avoid double click
  private defaultValues = {
    width: '27px',
    height: '21px'
  }

  @Input() width: string;
  @Input() height: string;

  @ViewChild('hamburguerButton', { static: true }) hamburguerButton!: ElementRef;

  ngOnInit() {
    this.width = this.width ? this.width : this.defaultValues.width;
    this.height = this.height ? this.height : this.defaultValues.height;
  }

  onHamburguerClick() {
    if (this.allowClick) {
      this.allowClick = false;

	  const button = this.hamburguerButton.nativeElement;
      button.classList.toggle('active');
      setTimeout(() => { this.allowClick = true }, 300); // Another click will be allowed in 300ms
    }
  }

}

