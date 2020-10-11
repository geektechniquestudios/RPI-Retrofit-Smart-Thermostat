### Actively writing now

# RPI-Retrofit-Smart-Thermostat (CCTA)
This multi-tier set of applications is meant to work on a raspberry pi 0w, but any other pi would likely work just fine.

[img of thermostat screenshot] gif??

!!!!startup instructions?
!!!!Disclaimer about yt deprecating endpoint

crontab
@reboot java -jar ccta-0.3.2.jar
@reboot sudo serve -l 80 -s /home/pi/ccta-react-client/build



Dependencies
 Don't forget       sudo apt update
  - a redis server running on the pi
      sudo apt install redis-server
  - a java 1.8+ jre
      sudo apt install openjdk-8-jre
  - node
  	  sudo apt install nodejs
  - npm	  
  	  sudo apt install npm
  - serve
  	  sudo npm i -g serve --save

[img of data flow]

[link to video to come]

While there are many rpi thermostats out there, I haven't seen one quite like what I've made here. This project was designed with extensibility in mind, so *you can easily build any service to communicate with the thermostat*. The Rest API is exceedingly simple and easy to use.

As this is still a WIP, the code is based on my LAN subnet of(10.255.255.255) with my pi having the reserved address 10.0.0.6. Yours might be (192.168.255.255) or something else, so you may have to change the ip addresses I use in my code to get this working in your environment.

