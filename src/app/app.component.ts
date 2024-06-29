import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserSettingsFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first_angular';
}
