package com.rusudinu.promreq.car;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Car {
    private final Long id;
    private final String brand;
    private final String model;
}
