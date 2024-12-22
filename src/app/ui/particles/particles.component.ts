import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.scss'],
  imports: [NgClass,NgFor]
})
export class ParticlesComponent  implements OnInit {
  @Input() darkMode: boolean = false;
  constructor() { }

  ngOnInit() {}

}
