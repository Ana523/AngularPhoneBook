import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Person } from './person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonStorageService {
  dbUrl = 'http://localhost:62585/api/PersonDetail';
  constructor(private http: HttpClient) {

  }

  getPeopleFromDb(): Observable<Person[]> {
    return this.http.get<Person[]>(this.dbUrl + '/GetPeople');
  }

  storePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.dbUrl + '/SetPerson', person);
  }
}
