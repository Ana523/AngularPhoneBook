import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../shared/person.model';
import { PersonStorageService } from '../shared/person-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  people: Person[];
  subscription: Subscription;
  p: number = 1;

  // Properties defined for filter pipe
  filteredFirstName: string = '';
  filteredLastName: string = '';
  filteredCountry: string = '';
  filteredCity: string = '';

  constructor(private personStorageService: PersonStorageService) {

  }

  ngOnInit() {
    this.subscription = this.personStorageService.getPeopleFromDb().subscribe(people =>
      this.people = people
    ), error => console.log(error);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
