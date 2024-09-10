import {Component} from '@angular/core';
import {Car, CarService} from "./car.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  cars: Car[] = [];
  carForm: FormGroup;
  editMode: boolean = false;

  constructor(private carService: CarService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      id: [0],
      brand: ['', Validators.required],
      model: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(cars => this.cars = cars);
  }

  addCar(): void {
    if (this.carForm.valid) {
      this.carService.addCar(this.carForm.value).subscribe(car => {
        this.cars.push(car);
        this.carForm.reset({id: 0, brand: '', model: ''});
      });
    }
  }

  editCar(car: Car): void {
    this.carForm.setValue(car);
    this.editMode = true;
  }

  updateCar(): void {
    if (this.carForm.valid) {
      this.carService.updateCar(this.carForm.value.id, this.carForm.value).subscribe(updatedCar => {
        const index = this.cars.findIndex(car => car.id === updatedCar.id);
        this.cars[index] = updatedCar;
        this.editMode = false;
        this.carForm.reset({id: 0, brand: '', model: ''});
      });
    }
  }

  deleteCar(id: number): void {
    this.carService.deleteCarById(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id);
    });
  }

  clearCars(): void {
    this.carService.clearCars().subscribe(() => {
      this.cars = [];
    });
  }
}
