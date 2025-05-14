import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getNeo4jData(): Observable<any> {
    return this.http.get(this.apiUrl + '/graph/getAll');
  }

  addNode(label: string, name: string): Observable<any> {
    return this.http.post(this.apiUrl + '/graph/add-node', { label, name });
  }
  
  addRelationship(
    sourceLabel: string, sourceProperty: string,
    targetLabel: string, targetProperty: string,
    relationshipType: string
  ): Observable<any> {
    return this.http.post(this.apiUrl + '/graph/add-relationship', {
      sourceLabel, sourceProperty, targetLabel, targetProperty, relationshipType
    });
  }
}