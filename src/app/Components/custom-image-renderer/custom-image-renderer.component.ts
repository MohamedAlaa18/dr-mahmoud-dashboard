import { ICellRendererParams } from '@ag-grid-enterprise/all-modules';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-image-renderer',
  templateUrl: './custom-image-renderer.component.html',
  styleUrls: ['./custom-image-renderer.component.css'],
})
export class CustomImageRendererComponent {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
}
