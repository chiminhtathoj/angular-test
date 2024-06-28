import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-user-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})

export class UserSettingsFormComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.settingsForm = this.fb.group({
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.apiService.updateUserSettings(this.settingsForm.value).subscribe({
      next: response => console.log('Settings updated', response),
      error: error => console.error('Error updating settings', error),
      complete: () => console.log('Update complete')
    });
  }
}
