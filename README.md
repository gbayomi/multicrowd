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

image

<br>

<h5>User - Uploading Process</h5>

* Click on 'Browse';
* Select a division time <DIV_TIME> on the left of 'Browse' (i.e. 30 will divide each video into 30 second chunks);
* Select or drag all the target mp4 video files <FILENAME>.mp4 that will be divided into <DIV_TIME>;
* Select a target transcription for each video <FILENAME>.csv with the same name as the original .mp4 file; 
* Click upload files;
* Wait until the loading bar is complete to create a task.


<h5>Video Requirements</h5>
* .mp4 format

<h5>Transcriptions Requirements</h5>
* .csv format;
* Same name as related video;
* Each row should follow the format: start time (s), end time (s), text (string);


<br>

<h5>Backend - Uploading Process</h5>

* Separate the .mp4 and .csv files
* Return the expected time to finish to the frontend (34s for each 1 min of video)
* Save each .mp4 video file on the videos folder with a generated video id name.
* Use ThumbnailGenerator to create a thumbnail for each video on the thumbnails folder;
* For each video, create a specific folder with the format '<DIV_TIME>_<VIDEO_ID>_vd'; 
* Use ffmpeg to divide each video into <DIV_TIME> chunks and save them on their specific folder; 
* Use ThumbnailGenerator to create a thumbnail for each divided video on the thumbnails folder;
* Match each transcription with the respective video;
* Save each .csv transcription file on the transcriptions folder with the previously generated video id name.
* For each transcription, create a specific folder with the format '<DIV_TIME>_<VIDEO_ID>_tr'; 
* Use fs to divide each transcription file into <DIV_TIME> chunks and save them on their specific folder;

<br>

<b>Task Creation</b>

<br>

<h5>User - Task Creation</h5>

* 

<br>

<h5>Backend - Task Creation</h5>

* 

<br>

# Turker Interface

<b>Task Hit Interface</b>

<br>

<h5>Task, Turker Perspective</h5>

* 

<br>

<h5>Task, Backend Perspective </h5>

* 

<br>

<b>Task Development</b>

<br>

<h5>Uploading Process, User</h5>

* 

<br>

<h5>Uploading Process, Backend</h5>

* 


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


# TO-DO


The main logic: <br>
1. Server implements the online website that will provide information for the device. => Exemplifies the online application<br>

There are still a lot of possible improvements for the Server/Database(3) part related to security and efficiency of the Analytics/Streaming (4). The whole implementation server->database->streaming/analytics here provided is not yet supposed to be a ready-for-production App, but skeleton for a future fully designed Application. 

# Future Work and Considerations

<b>Receiver Folder (The New Custom Receiver): </b> <br>
<i>CSS/HTML</i><br> Provides the general design styling for the App. The loading, launching, paused, next-video, queue pages are presented here. 
