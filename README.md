# RPI-Retrofit-Smart-Thermostat 
### (CCTA/ClimateControlThermostatApplication)
###### This project is a multi-tier extensible collection of applications meant to work on a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) that controls an older non-smart thermostat. Any other pi would likely work just fine.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)


## [Click for a Live Demo](https://5f84069fe6479b37533defb2--stoic-fermi-00dc16.netlify.app/)

While this isn't the first RPI thermostat, I haven't seen one quite like what I've made here. This project was designed with extensibility in mind, so **you can easily build any service to communicate with your thermostat**. The [API](https://app.swaggerhub.com/apis/geektechniquestudios/RpiThermostatCCTA/1.0.0#/Temperature/post_update_temperature) is exceedingly simple and easy to use. Two relays superficially control an older thermostat by simulating button presses.

[![](react-demo.gif)](https://5f84069fe6479b37533defb2--stoic-fermi-00dc16.netlify.app/)
![](react-native-demo.gif)

[img of thermostat being used to update temp] @todo


## Installation Guide

 <details>
  <summary>
   Easy Setup
  </summary>
 <br>

Pasting this into a terminal on the pi will clone this repo into your "~/" directory, install all dependencies, and append the crontab for the root user to launch both the spring boot server and react server start on boot. 

```console
sudo bash -c 'apt update -y && apt upgrade -y && apt install redis-server openjdk-8-jre wiringpi nodejs npm git -y && npm i -g serve --save && cd ~ && git clone https://github.com/geektechniquestudios/RPI-Retrofit-Smart-Thermostat && cd /home/pi/RPI-Retrofit-Smart-Thermostat/CCTA-React-Client && npm run-script build && (crontab -l ; echo "@reboot java -jar /home/pi/RPI-Retrofit-Smart-Thermostat/ccta-1.0.0.jar\n@reboot sudo serve -l 80 -s /home/pi/RPI-Retrofit-Smart-Thermostat/CCTA-React-Client/build") | crontab -' 
```
	
 </details>

 <details>
  <summary>
   Advanced Setup (optional alternative)
  </summary>
 <br>
 
 In case you'd rather individually install your dependencies:
 
 
 Don't forget to ```sudo apt update``` first
 
  - a redis server running on the pi
  
      ```sudo apt install redis-server```
      
  - a java 1.8+ jre
      
      ```sudo apt install openjdk-8-jre```
      
  - node
  	  
     ```sudo apt install nodejs```
     
  - npm	  
  	  
     ```sudo apt install npm```
     
  - serve
  	  
     ```sudo npm i -g serve --save```
     
  - wiringpi
     
     ```sudo apt install wiringpi```

 You'll need to build the react project before serving it. You can do that by navigating into the ccta-react-client folder and running
 
 ```npm run-script build```

 If you'd like the pi to automatically start the spring boot and react servers on boot, you'll probably want to add them to a crontab. You can do that by typing
 
  ```crontab -e```
 
 and appending the following lines to the end of the file
 
 ```console
 @reboot java -jar /home/pi/RPI-Retrofit-Smart-Thermostat/ccta-1.0.0.jar
 @reboot sudo serve -l 80 -s /home/pi/RPI-Retrofit-Smart-Thermostat/CCTA-React-Client/build
 ```
 
 </details> 

## How to Use This Software

![](dataflow.png)

[link to video to come]


As this is still a WIP, this system operates on the pretense that your LAN router IP address is 10.0.0.1 with the pi having the reserved address 10.0.0.6. Your LAN IP might be 192.168.1.1 or something else, so you may have to change the IP addresses in the code to get this working in your environment. The ease-of-setup will be drastically improved in future releases.

While figuring out what GPIO pins to use to control the relay, reference the [pi4j wiring documentation](https://pi4j.com/1.2/pins/model-zerow-rev1.html). It may vary from board to board, so carefully ensure you have the correct wiring. Based on wiringpi's wiring and **not the pi's header numbering**, this code uses ```gpio pin 0``` for temperature down, and ```gpio pin 1``` for temperature up.

Once you have everything installed, restart your pi. You should be able to access the pi over your LAN by typing 10.0.0.6 into a web browser. As a convenience you can change this to ```thermostat/``` if your router supports local DNS; alternatively, use [dnsmasq](https://help.ubuntu.com/community/Dnsmasq).


## How to Physically install

[image of wiring](thermostat-wiring.jpg)

AC units have a 24v AC line(the red wire) and a continuous ground (usually black). You can get a transformer for 5 or 10 dollars on Amazon. I bought [this one](https://www.amazon.com/gp/product/B00SO4T7IU/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1) because it has a potentiometer, allowing you to control the output voltage. Pis can be powered by connecting 5v DC power to the respective positive and negative rails of the board.

![](rpi0w-pic.jpg) ![](behind-wall.gif)

Fortunately my bathroom mirror leads directly to the thermostat, so that dictated the size of the plastic box I'm using in the above image. The pi changes the temperature by shorting the connection that the button normally bridges when depressed.

## More About This Software

- There is a 10 second debounce on the spring boot server. That means any input you give the thermostat takes a moment to execute. You can change this value in the spring boot thermostat controller if you want it to be snappier.

- The react native app is very simple and easy to modify. It is only about 80 lines of code and serves more as a proof of concept, whereas I actually use the react web client on a daily basis. Feel free to make changes or improvements. I invite collaboration.


###### [API reference](https://app.swaggerhub.com/apis/geektechniquestudios/RpiThermostatCCTA/1.0.0#/Temperature/post_update_temperature)
###### *google home action integration soon to come*
