package com.geek.ccta;

import com.pi4j.io.gpio.event.GpioPinListenerDigital;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pi4j.io.gpio.*;

import javax.annotation.PostConstruct;


@Slf4j
@RestController
public class TemperatureController {
    final GpioController gpio = GpioFactory.getInstance();

    GpioPinDigitalOutput temperatureUpOutput = gpio.provisionDigitalOutputPin(
            RaspiPin.GPIO_00,
            PinState.LOW);

    GpioPinDigitalOutput temperatureDownOutput = gpio.provisionDigitalOutputPin(
            RaspiPin.GPIO_01,
            PinState.LOW);

    final GpioPinDigitalInput temperatureUpListener = gpio.provisionDigitalInputPin(
            RaspiPin.GPIO_07, PinPullResistance.PULL_DOWN);

    final GpioPinDigitalInput temperatureDownListener = gpio.provisionDigitalInputPin(
            RaspiPin.GPIO_15, PinPullResistance.PULL_DOWN);


    @Autowired
    public TemperatureController(RedisConfig redisConfig) {
        this.redis = redisConfig;
    }

    private int countdown;
    private boolean isBeingChanged = false;
    private int globalRecentTemp;
    final private RedisConfig redis;


    @PostConstruct
    private void setup() {
        checkForFirstRun();
        globalRecentTemp = Integer.parseInt(redis.get("most-recent-temperature"));

        temperatureUpOutput.setShutdownOptions(true);
        temperatureDownOutput.setShutdownOptions(true);
        temperatureUpListener.setShutdownOptions(true);
        temperatureDownListener.setShutdownOptions(true);

        temperatureDownListener.setDebounce(600);
        temperatureDownListener.addListener((GpioPinListenerDigital) event -> {
            System.out.println(" --> GPIO PIN STATE CHANGE: " + event.getPin() + " = " + event.getState());
            if (event.getState() == PinState.HIGH && !isBeingChanged) {
                updateTemperatureInRedis(--globalRecentTemp);
            }
        });

        temperatureUpListener.setDebounce(600);
        temperatureUpListener.addListener((GpioPinListenerDigital) event -> {
            System.out.println(" --> GPIO PIN STATE CHANGE: " + event.getPin() + " = " + event.getState());
            if (event.getState() == PinState.HIGH && !isBeingChanged) {
                updateTemperatureInRedis(++globalRecentTemp);
            }
        });
    }

    private void checkForFirstRun() {
        if (redis.get("most-recent-temperature") == null)
            redis.set("most-recent-temperature", "70");
    }

    @CrossOrigin
    @GetMapping("/get_temperature")
    public TemperatureUpdate getTemperature() {
        log.info("sending most recent temp: {}", globalRecentTemp);
        return new TemperatureUpdate(globalRecentTemp, isBeingChanged);
    }

    @CrossOrigin
    @PutMapping("/update_temperature")
    public void updateTemperature(@RequestBody TemperatureContainer newTemperature) throws InterruptedException {
        log.info("Updating Temperature to {}", newTemperature.getTemperature());
        globalRecentTemp = newTemperature.getTemperature();
        manageCountdown();
    }

    private void manageCountdown() throws InterruptedException {
        if (countdown == 0)
            startCountdown();
        else countdown = 10;
    }

    @Synchronized
    private void startCountdown() throws InterruptedException {
        countdown = 3;
        isBeingChanged = true;
        while (countdown > 0) {
            log.info("Countdown has {} seconds remaining", countdown);
            Thread.sleep(1000);
            countdown--;
        }
        reconcileDiff(globalRecentTemp);
        isBeingChanged = false;
    }

    @Synchronized
    private void reconcileDiff(int mostRecentTemperature) throws InterruptedException {
        int mostRecentlyStoredTemperature = Integer.parseInt(redis.get("most-recent-temperature"));
        log.info("Reconciling temperature difference from {} to {}", mostRecentlyStoredTemperature, mostRecentTemperature);
        while (mostRecentTemperature < mostRecentlyStoredTemperature)
            mostRecentlyStoredTemperature = thermostatDown(mostRecentlyStoredTemperature);
        while (mostRecentTemperature > mostRecentlyStoredTemperature)
            mostRecentlyStoredTemperature = thermostatUp(mostRecentlyStoredTemperature);
        updateTemperatureInRedis(mostRecentTemperature);
        log.info("Temperature adjustment complete");
    }

    private void updateTemperatureInRedis(int adjustment) {
        log.info("New redis temperature: {}", adjustment);
        redis.set("most-recent-temperature", String.valueOf(adjustment));
    }

    private int thermostatUp(int mostRecentlyStoredTemperature) throws InterruptedException {
        temperatureUpOutput.setState(PinState.HIGH);
        Thread.sleep(500);
        temperatureUpOutput.setState(PinState.LOW);
        Thread.sleep(500);
        int newTemperature = mostRecentlyStoredTemperature + 1;
        log.info("Temp adjusted up to {}", newTemperature);
        globalRecentTemp = newTemperature;
        return newTemperature;
    }

    private int thermostatDown(int mostRecentlyStoredTemperature) throws InterruptedException {
        temperatureDownOutput.setState(PinState.HIGH);
        Thread.sleep(500);
        temperatureDownOutput.setState(PinState.LOW);
        Thread.sleep(500);
        int newTemperature = mostRecentlyStoredTemperature - 1;
        log.info("Temp adjusted down to {}", newTemperature);
        globalRecentTemp = newTemperature;
        return newTemperature;
    }
}
