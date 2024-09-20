<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      Matriculation
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
      <div class="card mb-3">
         
          <div class="card-body">
            <div class="form-group">
              <label for="schoolName">School Name</label>
              <input type="text" id="schoolName" formControlName="schoolName" class="form-control" required>
              <div *ngIf="userForm.controls['schoolName'].invalid && userForm.controls['schoolName'].touched"
                class="text-danger mt-1">
                <small>School Name is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="matricPercentage">Percentage</label>
              <input type="number" id="matricPercentage" formControlName="matricPercentage" class="form-control" required>
              <div *ngIf="userForm.controls['matricPercentage'].invalid && userForm.controls['matricPercentage'].touched"
                class="text-danger mt-1">
                <small>Percentage should be between 0 and 100.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="matricPassingYear">Passing Year</label>
              <input type="number" id="matricPassingYear" formControlName="matricPassingYear" class="form-control" required>
              <div *ngIf="userForm.controls['matricPassingYear'].invalid && userForm.controls['matricPassingYear'].touched"
                class="text-danger mt-1">
                <small>Passing Year is required.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      <div class="card-header">Secondary Education</div>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
      <div class="accordion-body">
      <div class="card mb-3">
          <div class="card-header">Secondary Education</div>
          <div class="card-body">
            <div class="form-group">
              <label for="collegeNameSec">College Name</label>
              <input type="text" id="collegeNameSec" formControlName="collegeNameSec" class="form-control" required>
              <div *ngIf="userForm.controls['collegeNameSec'].invalid && userForm.controls['collegeNameSec'].touched"
                class="text-danger mt-1">
                <small>College Name is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="secPercentage">Percentage</label>
              <input type="number" id="secPercentage" formControlName="secPercentage" class="form-control" required>
              <div *ngIf="userForm.controls['secPercentage'].invalid && userForm.controls['secPercentage'].touched"
                class="text-danger mt-1">
                <small>Percentage should be between 0 and 100.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="secPassingYear">Passing Year</label>
              <input type="number" id="secPassingYear" formControlName="secPassingYear" class="form-control" required>
              <div *ngIf="userForm.controls['secPassingYear'].invalid && userForm.controls['secPassingYear'].touched"
                class="text-danger mt-1">
                <small>Passing Year is required.</small>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
      <div class="accordion-body">
      <div class="card mb-3">
          <div class="card-header">Higher Education</div>
          <div class="card-body">
            <div class="form-group">
              <label for="collegeNameHigh">College Name</label>
              <input type="text" id="collegeNameHigh" formControlName="collegeNameHigh" class="form-control" required>
              <div *ngIf="userForm.controls['collegeNameHigh'].invalid && userForm.controls['collegeNameHigh'].touched"
                class="text-danger mt-1">
                <small>College Name is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="highPercentage">Percentage</label>
              <input type="number" id="highPercentage" formControlName="highPercentage" class="form-control" required>
              <div *ngIf="userForm.controls['highPercentage'].invalid && userForm.controls['highPercentage'].touched"
                class="text-danger mt-1">
                <small>Percentage should be between 0 and 100.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="highPassingYear">Passing Year</label>
              <input type="number" id="highPassingYear" formControlName="highPassingYear" class="form-control" required>
              <div *ngIf="userForm.controls['highPassingYear'].invalid && userForm.controls['highPassingYear'].touched"
                class="text-danger mt-1">
                <small>Passing Year is required.</small>
              </div>
            </div>
          </div>
        </div>
    
    
      </div>
    </div>
  </div>
</div>