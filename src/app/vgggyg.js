<div class="accordion" id="sub-accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="sub-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Company Details
            </button>
        </h2>
        <div id="sub-collapseOne" class="accordion-collapse collapse show" aria-labelledby="sub-headingOne" data-bs-parent="#sub-accordionExample">
            <div class="accordion-body">
            <div class="card mb-3">
             
              <div class="card-body">
                <div class="form-group">
                  <label for="companyName">Company Name</label>
                  <input type="text" id="companyName" formControlName="companyName" class="form-control" required>
                  <div *ngIf="userForm.controls['companyName'].invalid && userForm.controls['companyName'].touched"
                    class="text-danger mt-1">
                    <small>Company Name is required.</small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="jobTitle">Job Title</label>
                  <input type="text" id="jobTitle" formControlName="jobTitle" class="form-control" required>
                  <div *ngIf="userForm.controls['jobTitle'].invalid && userForm.controls['jobTitle'].touched"
                    class="text-danger mt-1">
                    <small>Job Title is required.</small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="experienceYears">Experience (Years)</label>
                  <input type="number" id="experienceYears" formControlName="experienceYears" class="form-control"
                    required>
                  <div
                    *ngIf="userForm.controls['experienceYears'].invalid && userForm.controls['experienceYears'].touched"
                    class="text-danger mt-1">
                    <small> Experience is required and must be a valid number.</small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="jobStartDate">Job Start Date</label>
                  <input type="date" id="jobStartDate" formControlName="jobStartDate" class="form-control" required>
                  <div *ngIf="userForm.controls['jobStartDate'].invalid && userForm.controls['jobStartDate'].touched"
                    class="text-danger mt-1">
                    <small>Job Start Date must be a valid date less than today.</small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="jobEndDate">Job End Date</label>
                  <input type="date" id="jobEndDate" formControlName="jobEndDate" class="form-control">
                </div>
              </div>
            </div>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="sub-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseTwo" aria-expanded="false" aria-controls="sub-collapseTwo">
            Skills
            </button>
        </h2>
        <div id="sub-collapseTwo" class="accordion-collapse collapse" aria-labelledby="sub-headingTwo" data-bs-parent="#sub-accordionExample">
            <div class="accordion-body">
            <div class="card mb-3">
              
              <div class="card-body">
                <div class="form-group">
                  <label for="skills">Skills</label>
                  <input type="text" id="skills" formControlName="skills" class="form-control" required>
                  <div *ngIf="userForm.controls['skills'].invalid && userForm.controls['skills'].touched"
                    class="text-danger mt-1">
                    <small> Skills are required.</small>
                  </div>
                </div>

                <div class="form-group">
                  <label for="skillsCertificate">Upload Skills Certificate:</label>
                  <input type="file" id="skillsCertificate" (change)="onFileChange($event, 'skillsCertificate')"
                    class="form-control" />
                  <div
                    *ngIf="userForm.controls ['skillsCertificate'].invalid && userForm.controls ['skillsCertificate'].touched"
                    class="text-danger mt-1">
                    <small>Skills Certificate is required.</small>
                  </div>
                </div>
                <!-- (change)="onFileChange($event, 'skillsCertificate')" -->
              </div>
            </div>
            </div>
        </div>
    </div>
   
</div>




{/* <div class="accordion-item">
<h2 class="accordion-header" id="sub-headingThree">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseThree" aria-expanded="false" aria-controls="sub-collapseThree">
        Accordion Item #3
    </button>
</h2>
<div id="sub-collapseThree" class="accordion-collapse collapse" aria-labelledby="sub-headingThree" data-bs-parent="#sub-accordionExample">
    <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
</div>
</div> */}
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withFetch,withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp}from '@angular/fire/app';
import { provideStorage, getStorage} from '@angular/fire/storage';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { examInterceptor } from './exam.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), // Provides router configuration based on your routes
    //  importProvidersFrom([
    // provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    // provideStorage(()=>getStorage())
    //   ]),
    provideRouter(routes), // Provides router configuration based on your routes
    provideClientHydration(),
    provideHttpClient( withInterceptors([examInterceptor]) ),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideHttpClient( withInterceptors([]) ),
    provideHttpClient(withFetch()),  BrowserAnimationsModule, 
    provideAnimations(), // required animations providers
    provideToastr() ,
    // ToastrModule.forRoot(),BrowserAnimationmodule(),BrowserModule
    {
    provide:'SocialAuthServiceConfig',
    useValue:{
      autoLogin: false, // Disable auto-login
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('982133624088-prs1839p8svnl5kgi837vr2eqjoj6md4.apps.googleusercontent.com'), // Replace with your Google Client ID
        },
      ],
      onError:(err):void=>{
        console.error(err);
      }
    }as SocialAuthServiceConfig,
  }
]};
function BrowserAnimationmodule(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

