# Introduction

Machine learning or statistics-based projects usually rely on a large amount of labeled data. One of the upcoming challenges of the ever-growing field is to obtain reliable labeled information in a world where most of the data is unstructured. Amazon Mechanical Turk is one of the tools that are constantly used for labeling information: it provides an inexpensive and fast way to reach long and usually time-consuming tasks. However, when it comes to crowdsourcing frameworks, data reliability is a serious and complicated problem to solve. The gravity of reliability is even deeper when the nature of the task relies on multimodal interactions. Evaluating, understanding and annotating the context of multimodal interactions can be a difficult task even for specialized individuals. The idea of this project is to build upon the previous Articulab work for a text annotation framework. The goal is to extend it for multimodal interactions and dive further into the reliability issue. 

# Quick Setup

First of all, it's necessary to set the server to start running the project, based on another googlecast project: custom-receiver. <br>
It is a express-node.js server. It has implemented a CORS application that allows the information to be sent Cross-Domain. <br>
Extra parts -> Analytics and Streaming: The server also has a POST request definition, used for saving data used by the Analytics/Streaming part. Therefore, it's necessary to also install some modules other than just express. It was constructed to simulate a possible use for the information sent by the Cast Player after a session.<br>

<h5>If there is no interest in the Streaming Analytics Part, there is a simple server version [here](./extra/simple-server.js).</h5><br>

- Install Node.js (https://nodejs.org/)
- Clone this project with github
- Go to the cloned folder with the command line
```
- $npm install express
- $npm install querystring
- $npm install body-parser
- $node server.js
```

# Framework Design and Considerations



# Framework Overview


<b>Articulab Interface</b>
- Video Upload: 
- Task Creation: 

<br>

<b>Turker Interface</b>
- Task Interface: 


# Articulab Interface

<b>Video Upload</b>

<br>

<h5>Uploading Process, User</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<h5>Uploading Process, Backend</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<b>Task Development</b>

<br>

<h5>Uploading Process, User</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<h5>Uploading Process, Backend</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

# Turker Interface

<b>Task Hit Interface</b>

<br>

<h5>Task, Turker Perspective</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<h5>Task, Backend Perspective </h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<b>Task Development</b>

<br>

<h5>Uploading Process, User</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>

<h5>Uploading Process, Backend</h5>

* Get the Chromecast device
* Upload the project to a website that can be accessed from Chromecast. When the application is published, it will need to host so that it is accessible using HTTPS.
* Register the application on the Developers Console (http://cast.google.com/publish). Enter the URL for the player.html or whichever is the name of the html that will be used by the device. 
* The serial # of the Chromecast device needs to be registered in the developer console as well.
* 15 minutes after you have updated the developers console, you should reboot your Chromecast, so that it picks up the changes

<br>


# Firebase

This simulates the use of the information sent by ajax for a server. For simplicity and to exemplify the general idea, this is all implemented in one unique server. When the server receives a POST request, it handles the acquired data and saves it in two different ways (streaming/analytics) in a Firebase database. For instance, the data for the analytics part looks like this:

```json
{
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4": {
    "title": "For Bigger Escape",
    "duration": 15.046531,
    "secondsSeen": "1/1/1/1/1/1/1/1/1/1/1/1/1/1/1/0",
    "secondsPaused": "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/1",
    "secondsRestart": "1/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0",
    "secondsVolumeChanged": "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0",
    "Views": 1,
    "AvgPercentageWatched": 0.9375,
    "MilestonePercentagePerSession": [0, 0, 0, 0, 1],
    "viewsYear": {"2015": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]}
  }
}
```
It is structured as a "dictionary" or an associative array in Javascript language. Each primary key is the unique contentId of each video. The value of each of these keys is another associative array object that contains all the current data for a lot of different attributes of the video. It is written in a way to easily get the data afterwards and to save space. The full explanation of each one of the attributes is explained [here](./firebase.md).

The structure of the POST is set to receive very specific data structure, anything different from that would be not uploaded in the updated json file created. The POST uses -bodyparser- to get the JSONIFIED string and use it as an object. Then it uses some logical components to add the values to each attribute correctly. In the end, it saves the new data in the database using the Set method.

# TO-DO

The idea of the whole project is to create the possibility of a full implemented custom receiver that could be easily changed and styled, save data from the user and also a separate part of the application to show how this data could be used by the content provider.

The main logic: <br>
1. Server implements the online website that will provide information for the device. => Exemplifies the online application<br>
2. Receiver implements the custom receiver, supporting DRM, queues, saving data, all the listened events and easy to change styles. => Exemplifies the full implemented custom app<br>
3. Server and Firebase implements the data storage. => Exemplifies the way to get and store data from the custom app<br>
4. Analytics/Streaming implements the statistical visualization of the data. => Exemplifies the way to use the acquired data to visualize the statistical information.<br>

There are still a lot of possible improvements for the Server/Database(3) part related to security and efficiency of the Analytics/Streaming (4). The whole implementation server->database->streaming/analytics here provided is not yet supposed to be a ready-for-production App, but skeleton for a future fully designed Application. 

# Future Work and Considerations

<b>Receiver Folder (The New Custom Receiver): </b> <br>
<i>CSS/HTML</i><br> Provides the general design styling for the App. The loading, launching, paused, next-video, queue pages are presented here. 

<i>JAVASCRIPT</i><br> The javascript is essential to present the design animations, DRM capabilities, queueing and to save data from the user session for all the different events listened while casting. Therefore, the new version is capable of getting the information from each event and sending it via AJAX calls to an external server and then use the data for any particular matter. The data is divided into Cast Sessions and is particular for each video watched. The data is sent externally via two different ways: <i>Constant Update</i> and <i>Session Data</i>. The constant update is sent to a chosen server every time a different event occur (milestones for parts of the video watched for example). The Sessiopn Data is also sent to a chosen server in the end of each casting. The chromecast runs a simple html, powered with javascript and css. As it is fairly easy to get the speed of the application decreased, the best way to deal with the data is to sent it externally via an Asynchronous Call (AJAX). <br>
