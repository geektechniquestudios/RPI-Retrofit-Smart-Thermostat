package com.geek.ccta;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TemperatureUpdate {
    final private int temperature;
    final private boolean isBeingChanged;
}
