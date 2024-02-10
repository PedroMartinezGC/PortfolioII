import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
    height: '21px',
    mainColor: '#f6ebe5',
    hoverColor: '#dd7136'
  }
  currentColor: string;
  isButtonClicked: boolean = false;

  @Input() width: string;
  @Input() height: string;
  @Input() mainColor: string;
  @Input() hoverColor: string;

  @Output() isOpen = new EventEmitter();

  ngOnInit() {
    this.width = this.width ? this.width : this.defaultValues.width;
    this.height = this.height ? this.height : this.defaultValues.height;
    this.mainColor = this.mainColor ? this.mainColor : this.defaultValues.mainColor;
    this.hoverColor = this.hoverColor ? this.hoverColor : this.defaultValues.hoverColor;
    this.currentColor = this.mainColor;
  }

  onHamburguerClick() {
    if (this.allowClick) {
      this.isButtonClicked = !this.isButtonClicked;
      this.isOpen.emit(this.isButtonClicked); 
      this.allowClick = false;

      setTimeout(() => { this.allowClick = true }, 300); // Another click will be allowed in 300ms
    }
  }

  setColor(color: string) {
    this.currentColor = color;
  }
}

