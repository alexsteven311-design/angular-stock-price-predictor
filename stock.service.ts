import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PredictionResponse {
  dates: string[];
  prices: number[];
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private apiUrl = 'http://127.0.0.1:8000/predict';

  constructor(private http: HttpClient) {}

  predict(ticker: string, days: number): Observable<PredictionResponse> {
    return this.http.post<PredictionResponse>(this.apiUrl, { ticker, days });
  }
}
