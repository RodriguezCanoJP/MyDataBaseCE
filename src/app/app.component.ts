import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mydatabase';

  public name = '';

  public onValueChange(event: Event): void {
    const value = (event.target as any).value;
    this.name = value;
  }

}
