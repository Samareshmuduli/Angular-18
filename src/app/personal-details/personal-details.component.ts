import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']  
})
export class PersonalDetailsComponent {
  userForm: FormGroup;
  currentStep = 1;
  imageUrl: any;
  fullImageUrl: any;
  uploadedSkillsCertificate: File | null = null;
  uploadedImagePath: string | null = null; 
  loginEmail: string | null = localStorage.getItem('email')
  
  
  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService,private http:HttpClient,private toster:ToastrService) {
    // console.log('vhfhhvf======',this.loginEmail)
    this.userForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
      fatherName: ['', [Validators.required, Validators.minLength(5)]],
      motherName: ['', [Validators.required, Validators.minLength(5)]],
      email: [this.loginEmail, [Validators.required,  Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      currentAddress: ['', [Validators.required, Validators.minLength(5)]],
      permanentAddress: ['', [Validators.required, Validators.minLength(5)]],
      dob: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      aadhaarNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      
      // Educational Details
      schoolName: ['', [Validators.required]],
      matricPercentage: [null, [Validators.required, Validators.max(100), Validators.min(0)]],
      matricPassingYear: [null, [Validators.required, Validators.pattern(/^\d{4}$/),Validators.max(new Date().getFullYear())]],
      collegeNameSec: ['', [Validators.required]],
      secPercentage: [null, [Validators.required, Validators.max(100), Validators.min(0)]],
      secPassingYear: [null, [Validators.required, Validators.pattern(/^\d{4}$/),Validators.max(new Date().getFullYear())]],
      collegeNameHigh: ['', [Validators.required]],
      highPercentage: [null, [Validators.required, Validators.max(100), Validators.min(0)]],
      highPassingYear: [null, [Validators.required,Validators.pattern(/^\d{4}$/),Validators.max(new Date().getFullYear())]],
    
      // Company and Skills Details
      companyName: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      experienceYears: [null, [Validators.required, Validators.min(0)]],
      jobStartDate: ['', [Validators.required]],
      jobEndDate: [''],
      skills: ['', [Validators.required]],
      skillsCertificate:['',[Validators.required]]
    });
    

  }

  nextStep() {
    this.currentStep++;
  }
  
  

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  onSubmit() {
    console.log("=======================================",this.userForm)

    if (this.userForm.valid) {

      console.log('Form Data:', {...this.userForm.value, user_id:localStorage.getItem('user_id')});
      this.dataService.formSubmit({...this.userForm.value, user_id:localStorage.getItem('user_id')}).subscribe(
        (data: any) => {
          console.log('data', data);
           this.toster.success("Form submited Sucessfully.")
          this.router.navigate(['dashboard']);
        },
        (error: any) => {
          this.toster.error(error.error.message);
          console.log("register error", error);
          
        }
      );
      
      // this.router.navigate(['login']);
    } else {
      console.error('Form is invalid');
    }
  }
  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (field === 'skillsCertificate') {
        this.uploadedSkillsCertificate = input.files[0];
        // console.log(this.uploadedSkillsCertificate);
      }
    }
  }
  uploadFile() {
    if (this.uploadedSkillsCertificate) {
      console.log(this.uploadedSkillsCertificate);
      const formData = new FormData();
      
      formData.append('skillsCertificate', this.uploadedSkillsCertificate);
      console.log(formData);

      this.http.post('http://localhost:2000/upload', formData).subscribe(
        (response: any) => {
          console.log('Upload success', response);
          this.toster.success("uploaded sucessfully")
          this.imageUrl = response.filePath;
          this.userForm.get('skillsCertificate')?.setValue(this.imageUrl);
        // Construct the full URL to display the image
        this.fullImageUrl = `http://localhost:2000/${this.imageUrl}`;
        },
        (error) => {
          this.toster.error("upload fail");
          console.error('Upload error', error);
        }
      );
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
