import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() InputId = '';
  @Input() control = new FormControl();
  @Input() label = '';

  constructor() {}

  ngOnInit(): void {}
}
