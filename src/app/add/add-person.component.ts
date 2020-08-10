import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../shared/person.model';
import { PersonStorageService } from '../shared/person-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddComponent implements OnInit {
  addPersonForm: FormGroup;
  subscription: Subscription;
  message: string = null;
  dataSaved: boolean = false;

  /*Error messages*/
  errMes = 'This field is required!';
  regexErr = 'You must enter only numbers!';
  minLenErr = 'Phone number must at least be 6 characters long!';

  constructor(
    private router: Router, 
    private personStorageService: PersonStorageService) { }

  ngOnInit() {
    // Initialize form
    this.addPersonForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [Validators.required, 
                                          Validators.pattern(/^[0-9]*$/), 
                                          Validators.minLength(6)])
      });
  }

  onSubmit() {
    const person = this.addPersonForm.value;

    // Store person in a database 
    this.createPerson(person);

    this.addPersonForm.reset();
    setTimeout(() => this.router.navigate(['search']), 4000);
  }

  // Function for creating new person
  createPerson(person: Person) {
    this.subscription = this.personStorageService.storePerson(person).subscribe((person) => {
      this.dataSaved = true;
      this.message = person.FirstName + " " + person.LastName + " added successfully!";
    }, error => console.log(error));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
