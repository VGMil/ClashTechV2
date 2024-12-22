import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  imports: [IonRouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
