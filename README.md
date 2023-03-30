# LessonLite

This is my software solution for the assessment from LessonWise  
So far I've been able to finish the API as I'm comfortable with NestJs,
but Angular.js has taken a bit more time than I expected and the client side
is the in the works.

## How to use

1. Go into the server side application in your terminal with  
   `cd server`
2. Install the dependencies
   1. If you have yarn installed install the packages by entering `yarn install`
   2. If you only have npm, delete the `yarn.lock` file and enter `npm install`
3. Start the server with `yarn start:dev`
4. Head to `http://localhost:3000/api` on your browser

## Endpoints

## Auth

### Register

**POST** _/api/auth/register_  
This endpoint is to create an account as a tutor or student

### Login

**POST** _/api/auth/login_  
This endpoint helps you login with the user account created

## Course 

### Create Course

**GET** _/api/courses_  
This endpoint can only be accessed by tutors and helps create a course.  
This contains one of my proposed solutions, which is to explicitly declare all 
classes in a course upfront and specify a price for each class - or decide the total cost of the course, and 
have the app divide the price evenly across all classes.

### List Courses

**GET** _/api/courses_  
This endpoint lists all available courses for students to pick from

### Course Details

**GET** _/api/courses/{courseId}_  
This endpoint picks a single course for viewing with the corresponding `courseId`

### Subscribe to Course

**POST** _/api/courses/{courseId}/subscription_
This is my solution for how to subscribe to an ongoing course. The system has a list of 
classes under a course, and since each course has a price and a completed flag, the system 
automatically calculates how much a student would need to pay to join the course after some classes 
have already been completed.

## Resource

### Create Resource

**POST** _/api/resources_  
This endpoint creates a resource for a course and can only be accessed by the tutor who owns 
the course. It is as simple as uploading the file which has to be book, video or PDF - of course 
more file types will be allowed, this is just a dummy - to LessonLite and it gives automatic access to
any student subscribed to the course to view the resource inside the website.

### List Resources for User

**GET** _/api/resources?courseId={courseId}_  
This endpoint lists all resources available to a student or tutor, and allows filtering by 
a course. Only students subscribed to a course can see resources for that course

### View Resource

**GET** _/api/resources/{resourceId}_  
This endpoint would display a single resource within the application - on the client side

## Testing the endpoints

This API is documented with Swagger and is pretty straightforward. 
You register and login, then get a token, which you put in the Authorization - the little padlock 
at the top or side of some endpoints.  
Depending on your role, you can create courses and add resources, or subscribe to courses using their IDs.  

For easy testing, I have created some courses to choose from. One has one class, while 
the other has multiple classes, two of which have already taken place. You could call the 
`Subscribe to Course` endpoint as a student to see what the bill looks like.

You can also view the resources for the English and Algebra courses after you subscribe to them. I hope 
this API is easy to use, and I wanted to build a frontend to make the application more user friendly, but 
I've not been able to complete that yet.

I hope you love my entry and if you need a demo, don't hesitate to reach out to me.

Thank you.
