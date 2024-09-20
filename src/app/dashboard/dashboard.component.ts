import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  userForm!: FormGroup;
  userName: string |null =localStorage.getItem('user_name');
  route: any;
user: any;
 
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router:Router,
    // private route: ActivatedRoute // For getting user ID from the route or localStorage
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.userForm = this.fb.group({
      FirstName: [''],
      LastName: [''],
      fatherName: [''],
      motherName: [''],
      email: [''],
      phoneNumber: [''],
      currentAddress: [''],
      permanentAddress: [''],
      dob: [''],
      sex: [''],
      aadhaarNumber: [''],
      schoolName: [''],
      matricPercentage: [''],
      matricPassingYear: [''],
      collegeNameSec: [''],
      secPercentage: [''],
      secPassingYear: [''],
      collegeNameHigh: [''],
      highPercentage: [''],
      highPassingYear: [''],
      companyName: [''],
      jobTitle: [''],
      experienceYears: [''],
      jobStartDate: [''],
      jobEndDate: [''],
      skills: [''],
      skillsCertificate: ['']
    });

    // Fetch user data (based on route param or token)
    const userId = localStorage.getItem('formId');
    if (userId) {
      this.fetchUserData(userId); // Call the method with userId
    } else {
      console.error('No user ID found in localStorage');
    }
  }

  fetchUserData(userId: string): void {
    this.dataService.showdata(userId).subscribe(
      (data) => {
        console.log('------========',data.Blogs);
        // Patch the form with the fetched data
        // for(let i of data.payload.length ){
        // console.log( '====================',data.payload[i].FirstName );
        // }
        // console.log("Array length : "+String(data.Blogs.length))
        this.userForm.patchValue({
          FirstName: data.Blogs.FirstName,
          LastName: data.Blogs.LastName,
          fatherName: data.Blogs.fatherName,
          motherName: data.Blogs.motherName,
          email: data.Blogs.phoneNumber,
          currentAddress: data.Blogs.currentAddress,
          permanentAddress: data.Blogs.permanentAddress,
          dob: data.Blogs.dob,
          sex: data.Blogs.sex,
          aadhaarNumber: data.Blogs.aadhaarNumber,
          schoolName: data.Blogs.schoolName,
          matricPercentage: data.Blogs.matricPercentage,
          matricPassingYear: data.Blogs.matricPassingYear,
          collegeNameSec: data.Blogs.collegeNameSec,
          secPercentage: data.Blogs.secPercentage,
          secPassingYear: data.Blogs.secPassingYear,
          collegeNameHigh: data.Blogs.collegeNameHigh,
          highPercentage: data.Blogs.highPercentage,
          highPassingYear: data.Blogs.highPassingYear,
          companyName: data.Blogs.companyName,
          jobTitle: data.Blogs.jobTitle,
          experienceYears: data.Blogs.experienceYears,
          jobStartDate: data.Blogs.jobStartDate,
          jobEndDate: data.Blogs.jobEndDate,
          skills: data.Blogs.skills,
          skillsCertificate: data.Blogs.skillsCertificate
        });

        // You can also set the user name and image path
        
        console.log(this.userForm.value);


      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('formId');
    this.router.navigate(['/dashboard']);
  }
}

