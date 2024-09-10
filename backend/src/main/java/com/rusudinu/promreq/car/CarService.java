package com.rusudinu.promreq.car;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Getter
public class CarService {
    private final List<Car> cars = new ArrayList<>();

    public Car addCar(Car car) {
        cars.add(car);
        return car;
    }

    public Car getCarById(int id) {
        return cars.get(id);
    }

    public Car deleteCarById(int id) {
        return cars.remove(id);
    }

    public Car updateCar(int id, Car car) {
        cars.set(id, car);
        return car;
    }

    public void clearCars() {
        cars.clear();
    }
}
