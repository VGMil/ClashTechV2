import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

import { IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import { ParticlesComponent } from './ui/particles/particles.component';

@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp, ParticlesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClashTech';
  darkMode = true;
  constructor() {
  }
}
