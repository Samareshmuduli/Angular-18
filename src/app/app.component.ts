import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { GoogleloginComponent } from './googlelogin/googlelogin.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SocialLoginModule,GoogleloginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamForm';
}
