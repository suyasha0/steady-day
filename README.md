The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Steady Day

## Overview

When massive amounts of work and pressure piles up on us, it can be hard to stay motivated. When faced with a neverending list of things-to-do, sometimes we may spend the day doing none of it at all! This is where Steady Day can help, by transforming your day into a steady and *rewarding* one using the power of short-term motivation.

Steady Day is a web app that will allow users to plan out tasks for their day and set rewards for particular tasks. Users can login using OpenID. Once they're logged in, they can plan our their day or, if they already made a plan previously, view their most recent plan. On the plan page, users can mark tasks as done and its corresponding reward will show up. Users can choose "End Day" at the end of the day and an overview of their day including the tasks they accomplished and the time spent on each task will show up. 


## Data Model

The application will store Users, FbUsers, and Tasks.

* User will be used when logging in normally
* FbUser will be used when logging in through Facebook
* Each User/FbUser can have multiple Tasks

(___TODO__: sample documents_)

An Example User:

```javascript
{
  username: "stressedstudent",
  hash: // a password hash,
  salt: // a password salt
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

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 + 1 points) Integrate user authentication - Passport
    * Passport is
    * (+1)I'm going to use implement signup and registration as well as FB Connect 
* (2 points) chartist.js
    * I'm going to use chartist.js to create a pie chart

8 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

