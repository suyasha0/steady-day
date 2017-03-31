# Steady Day

## Overview

When massive amounts of work and pressure piles up on us, it can be hard to stay motivated. When faced with a neverending list of things-to-do, sometimes we may spend the day doing none of it at all! This is where Steady Day can help, by transforming your day into a steady and *rewarding* one using the power of short-term motivation.

Steady Day is a web app that will allow users to plan out tasks for their day and set rewards for particular tasks. Users can login using OpenID. Once they're logged in, they can plan our their day or, if they already made a plan previously, view their most recent plan. On the plan page, users can mark tasks as done and its corresponding reward will show up. Users can choose "End Day" at the end of the day and an overview of their day including the tasks they accomplished and the time spent on each task will show up. 


## Data Model

The application will store Users, FbUsers, and Tasks.

* User will be used when logging in normally
* FbUser will be used when logging in through Facebook
* Each User/FbUser can have multiple Tasks
* Task represents a task the user plans to accomplish at a specific time interval 

An Example User:

```javascript
{
  username: "stressedstudent",
  hash: // a password hash,
  tasks: // an array of references to Task documents
}
```

An Example FbUser:

```javascript
{
  fbId: "procrastinator",
  tasks: // an array of references to Task documents
}
```

An Example Task:

```javascript
{
  user: // a reference to a User document,
  info: "Work on HW05",
  timeStart: "2:00",
  timeEnd: "5:00",
  reward: "bubble tea"
}
```

## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/ - page for logging in

![login](documentation/login.png)

/register - page for registering

![register](documentation/register.png)

/plan - page for adding tasks 

![plan](documentation/setplan.png)

/today - page for displaying and checking off tasks

![today](documentation/plan.png)

/overview - page for showing overview of day (tasks done etc.)

![overview](documentation/overview.png)

## Site map

Here's a [sitemap](documentation/sitemap.png).

## User Stories or Use Cases

1. as a non-registered user, I can register a new account with the site
2. as a non-registered user, I can sign in with Facebook and become a user
3. as a user, I can log in to the site
4. as a user, I can add tasks and set their start and end times
5. as a user, I can set rewards for each task
6. as a user, I can check off items on my task list
7. as a user, I can reset my task list for a new day

## Research Topics

* (5 + 1 points) Integrate user authentication - Passport
    * Passport is an authentication middleware. It has different authentication mechanisms, known as strategies, that can be used.
    * (+1)I'm going to use implement signup and registration as well as FB Connect.
* (2 points) chartist.js
    * Chartist is a charting libary that supports responsive charts. It can produce really neat looking animated charts.
    * I'm going to use chartist.js to create a pie chart that shows how much of the user's day was spent on each task.

8 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
1. [passport.js authentication docs](http://passportjs.org/docs) - *no code used yet*
2. [chartist examples](http://gionkunz.github.io/chartist-js/examples.html#simple-pie-chart) - *no code used yet*

