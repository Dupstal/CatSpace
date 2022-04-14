import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';

@Injectable()
export class MatchService {
    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    fetchImages(): Observable<string[]> {
        return this.http.get<any[]>(this.apiUrl, {
            params: {
              limit: 8,
              mime_types: 'jpg'
            }
        }).pipe(
            map(result => {
                let returnedImagePaths: string[] = [];
                result.forEach(cat => {
                    returnedImagePaths.push(cat.url);
                });
            return returnedImagePaths;
        }));
    }
}