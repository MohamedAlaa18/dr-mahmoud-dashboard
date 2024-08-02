import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-button-renderer',
  template: `
    <button class="btn-simple" (click)="onClick()">Push Me!</button>
  `,
  styles: ['.btn-simple { background-color: #007bff; color: #fff; border: none; }']
})
export class CustomButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onClick(): void {
    if (this.params.onClick instanceof Function) {
      this.params.onClick(this.params.value);
    }
  }
}
