import {Injectable} from '@angular/core';
import axios from "axios";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/v1/cars';

export interface Car {
  id: number;
  brand: string;
  model: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  /* ------------ AXIOS ------------ */
  async addCarAxios(car: Car): Promise<Car> {
    const response = await axios.post<Car>(API_URL, car);
    return response.data;
  }

  async getCarsAxios(): Promise<Car[]> {
    const response = await axios.get<Car[]>(API_URL);
    return response.data;
  }

  async getCarByIdAxios(id: number): Promise<Car> {
    const response = await axios.get<Car>(`${API_URL}/${id}`);
    return response.data;
  }

  async deleteCarByIdAxios(id: number): Promise<Car> {
    const response = await axios.delete<Car>(`${API_URL}/${id}`);
    return response.data;
  }

  async updateCarAxios(id: number, car: Car): Promise<Car> {
    const response = await axios.put<Car>(`${API_URL}/${id}`, car);
    return response.data;
  }

  async clearCarsAxios(): Promise<void> {
    await axios.delete(API_URL);
  }

  /* ------------ FETCH ------------ */

  async addCarFetch(car: Car): Promise<Car> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    });
    return response.json();
  }

  async getCarsFetch(): Promise<Car[]> {
    const response = await fetch(API_URL);
    return response.json();
  }

  async getCarByIdFetch(id: number): Promise<Car> {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  }

  async deleteCarByIdFetch(id: number): Promise<Car> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  async updateCarFetch(id: number, car: Car): Promise<Car> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    });
    return response.json();
  }

  async clearCarsFetch(): Promise<void> {
    await fetch(API_URL, {
      method: 'DELETE'
    });
  }

  /* ------------ ANGULAR HTTP CLIENT ------------ */
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(API_URL, car);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(API_URL);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${API_URL}/${id}`);
  }

  deleteCarById(id: number): Observable<Car> {
    return this.http.delete<Car>(`${API_URL}/${id}`);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${API_URL}/${id}`, car);
  }

  clearCars(): Observable<void> {
    return this.http.delete<void>(API_URL);
  }
}
