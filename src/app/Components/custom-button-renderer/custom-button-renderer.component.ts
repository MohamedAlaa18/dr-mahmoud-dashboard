import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-button-renderer',
  templateUrl: './custom-button-renderer.component.html',
  styleUrls: ['./custom-button-renderer.component.css']
})
export class CustomButtonRendererComponent {
  public params: any;

  agInit(params: any): void {
    this.params = params;
    // console.log(params.buttons)
  }

  onClick(action: any): void {
    const id = this.params.data.id;
    action(id);
  }
}
