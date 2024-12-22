import { NgIf } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [NgIf]
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() isLoading: boolean = false; 
  message: string = "Cargando";
  private interval: any;

  ngOnInit(): void {
    let count = 0;
    this.interval = setInterval(() => {
      this.message = 'Cargando' + '.'.repeat(count % 4);
      count++;
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
