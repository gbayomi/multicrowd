# Introduction

Machine learning or statistics-based projects usually rely on a large amount of labeled data. One of the upcoming challenges of the ever-growing field is to obtain reliable labeled information in a world where most of the data is unstructured. Amazon Mechanical Turk is one of the tools that are constantly used for labeling information: it provides an inexpensive and fast way to reach long and usually time-consuming tasks. However, when it comes to crowdsourcing frameworks, data reliability is a serious and complicated problem to solve. The gravity of reliability is even deeper when the nature of the task relies on multimodal interactions. Evaluating, understanding and annotating the context of multimodal interactions can be a difficult task even for specialized individuals. The idea of this project is to build upon the previous Articulab work for a text annotation framework. The goal is to extend it for multimodal interactions and dive further into the reliability issue. 

# Quick Setup

After cloning the repository, the following commands will start the application:

```
- cd SARA-AMT-Framework
- npm install 
- npm start
```

# Framework Design and Considerations


### Multimodal Interactions and Replayability

<b>Challenge:</b> The current platform is text-based: it uses only language models to label the presented information. However, most of the current Articulab data is multimodal: extensive dialogues with different levels of complexity, where gestures, movements, voice tonality and other characteristics are key components in order to evaluate different levels of social interactions. The tasks are already complex to fully determine and the addition of multimodal features, incorporating video and audio, are fundamental for the success of future turkers. Therefore, one of the challenges it to extend the platform and synchronize video content and transcriptions. Moreover, it's not always straight-forward to label video + text data in one single try. Sometimes, it's necessary to replay the content multiple times in order to truly release a reliable label and, thus, it's important to also guarantee a 'replayability' functionality that enable turkers to go back and re-label content when necessary.

<b>Proposed Solution:</b> We propose a session-based frontend solution for both parts of this challenge. The idea is that each session will be able to capture, maintain and update the current information. It means that the backend interaction will only occur at the end of the session or if the session is interrupted. The whole process of 'replayability' and synchronization will be updated/maintained, using a combination of frontend libraries (videojs, jquery, etc). The information sent to the backend will be verified in terms of synchronization and content reliability in order to guarantee that only reasonable information is saved.  


### General Reliability

<b>Challenge:</b> Besides IRR, it's important to make sure that the information stored is genuine and reliable. A lot of AMT workers use automation software to raise money fast and randomly complete tasks. Another part of workers try to be as fast as possible in order to finish as many tasks as possible regardless of the final quality. Unfortunately, these types of turkers are not uncommon and can easily jeopardize a lot of experiments, specially with sensible and complex dialogue data, where a lot of attention is needed. However, there are a lot of supervised and unsupervised learning techniques that are able to identify this kind of behavior. The main challenge here is to find the most intelligent solution in terms of general reliability.

<b>Proposed Solution:</b> We propose two different solutions here. First, a combination of techniques (unsupervised and supervised) in order to increase general reliability. We intend to use previous work like MACE (unsupervised) and other regression/decision trees methods (supervised) to weed out potential scammers or unreliable users or at least diminish their weight on the overall task. The other idea is related to the first challenge: API-based solution. It means that all information will be saved for session and might be used to constantly upgrade the model and, then, it will always be an open-ended project with no fixed learning technique to detected fraud, misuse or unreliable sources.

### Design Choices for Turker Interface

<b>Challenge:</b> Most AMT workers have to guarantee that they are doing worthwhile work in order to make sure they acquire enough money by their weekly goals. It means that any interface directly communicating with AMT workers needs to be clear and direct to ensure that the information is easy to understand and task is straightforward. However, this is not necessarily trivial for conversational strategies labeling, where the process can be confusing even for experience annotators. Therefore, one of the challenges is to guarantee results reliability by producing a clear, direct and usable framework.

<b>Proposed Solution:</b> <STILL UNDER DISCUSSION> We propose a multimodal framework where each context of a part of the overall video is presented individually and the turker is able to go easily back and forth on the task development based on subdivision of the overall task. It means that each context is compartmentalized to assure information quality and clarity for the end user.


### Inter Rater Reliability (IRR)

<b>Challenge:</b> For large tasks at AMT, IRR is one of the biggest issues when it comes to reliability. Each worker has different work ethics, perspectives or even experience with a determined task. It means that some turkers have a higher tendency to be closer to the pre-established ground truth than others. The previous Articulab platform made use of a quiz before the task in order to measure how reliable a turker is. The main challenge for IRR is to make sure that the overall ability of each worker is high enough for the complexity of the task and the variance between answers are under limited and understandable parameters.

<b>Proposed Solution:</b>  We propose three different solutions for this challenge. First, a preparation task similar to the previous one used for the older version of the project, intended to prepare the worker candidate ability to solve the task and to check the basic individual work ethics. Secondly, the most important design change is to  implement an API-based system where all the inputs (quiz, randomized known tasks, time spent, etc) is saved on Firebase for each round and then are easily retrieved afterwards in order to constantly change the modeling parameters of the platform for optimization.

# Framework Overview


### Articulab Interface
##### Video Upload
<b>Link: </b> localhost:3000/uploadvid
<br>
<b>Quick Description: </b> Upload a video and the respective transcript, deciding on the time division schedule in seconds.

##### Task Creation

<b>Link: </b> localhost:3000/create
<br>
<b>Quick Description: </b> Create a task based on the uploaded videos, selecting sentence/frame level and type of labeling.

### Turker Interface
##### Task Interface
<b>Link: </b> localhost:3000/turker
<br>
<b>Quick Description: </b> A turker is able to label values based on the previously created tasks.

# Articulab Interface

### Video Upload


![demo](Screenshots/uploadvideo.gif)


<h5>User - Uploading Process</h5>

* Click on 'Browse';
* Select a division time <DIV_TIME> on the left of 'Browse' (i.e. 30 will divide each video into 30 second chunks);
* Select or drag all the target mp4 video files <FILENAME>.mp4 that will be divided into <DIV_TIME>;
* Select a target transcription for each video <FILENAME>.csv with the same name as the original .mp4 file; 
* Click upload files;
* Wait until the loading bar is complete to create a task.


<h5>Video Requirements</h5>

* format should be .mp4.

<h5>Transcriptions Requirements</h5>

* format should be .csv;
* Same name as related video;
* Each row should follow the format: start time (s), end time (s), text (string).



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

### Task Creation



![demo](Screenshots/createtask.gif)


<h5>User - Task Creation</h5>

* Select the thumbnail of a video for task (or group of videos that will have the same task specifications);
* Select the <DIV_TIME> of the task (only available for the previously uploaded divisions);
* Select if the evaluation will be on sentence-level or frame-level;
* Select if the evaluation will be on categorical or numerical values;
* Select the values that will be labeled.

<br>

<h5>Backend - Task Creation</h5>

* Collect the information from the user on a JSON object (frontend):

```json
"classic-8ffa7d08-2658" : {
      "categories" : [ "SOJE", "FDFD" ],
      "div_time" : "30",
      "help_video_id" : "8d70f3c8-",
      "level_type" : "Sentence",
      "price" : "10"
```

* Send the object (frontend);
* Create an entry sub_videos on the JSON object;
* Located the respective division folder for transcriptions and videos and save content on a JSON object;
* Merge the two JSON objects:

```json
"classic-8ffa7d08-2658" : {
      "categories" : [ "SOJE", "FDFD" ],
      "div_time" : "30",
      "help_video_id" : "8d70f3c8-",
      "level_type" : "Sentence",
      "price" : "10",
      "sub_videos" : {
        "video_0" : {
          "id" : "div_classic_0",
          "sentence_intervals" : [ [ 0.1, 5.5 ], [ 22.3, 28 ] ],
          "sentences" : [ "ok how are you", "fine, thanks" ]
        },
        "video_1" : {
          "id" : "div_classic_1",
          "sentence_intervals" : [ [ 0.1, 5.5 ], [ 22.3, 28 ] ],
          "sentences" : [ "ok how are you", "fine, thanks" ]
        },
        "video_2" : {
          "id" : "div_classic_2",
          "sentence_intervals" : [ [ 0.1, 5.5 ], [ 22.3, 28 ] ],
          "sentences" : [ "ok how are you", "fine, thanks" ]
        },
        "video_3" : {
          "id" : "div_classic_3",
          "sentence_intervals" : [ [ 0.1, 5.5 ], [ 22.3, 28 ] ],
          "sentences" : [ "ok how are you", "fine, thanks" ]
        }
      },
      "time_to_complete" : "800",
      "type:" : "categorical",
      "video_id" : "classic"
    }
```

* Save the results on Firebase.

# Turker Interface (WILL BE CHANGED IN A FEW DAYS)

### Task Hit Interface



![demo](Screenshots/enterid.gif)


![demo](Screenshots/turker1.gif)


![demo](Screenshots/turker2.gif)


<h5>Turker - Task Hit</h5>

* Enter the specified task ID;
* For each subdivision of the video, annotate with the correct label;
* Click on a sentence to play the specific respective part of the video;
* After each subdivision, press the next arrow to go forward or backward to change a previous label;
* When the task is complete, the submit button will be available;
* Click submit to finalize the task.

<br>

<h5>Backend - Task Hit </h5>

* Get the task ID;
* Call the task by the ID from Firebase;
* Load the task (frontend);
* Link each sentence with a start/stop time (frontend);
* When the task is complete, update the json with the predicted labels;
* Save the final result from Firebase.

<br>


# TO-DO

- single opening page
- make a production-ready firebase database
- make better auto generated ids
- make better folder organization
- some firebase video corrections
- some sanity checks and additional error handlings
- security in terms of database/authentication 
- task direct interaction with AMT
- change for Saloni version of turker interface
- code refactorization
- google pages saving
- fix numerical capability
- limit create task page capabilities
- generalize some task creation capabilities
- simplify firebase retrieval method
- basic, simple graphs page
- JSDoc

# Problems / Limitations

- specific formats for video input
- specific formats for transcriptions input
- specific format inside transcriptions file
- time to upload
- only numerical or categorical
- some parts of AMT integration/payment might be confusing
