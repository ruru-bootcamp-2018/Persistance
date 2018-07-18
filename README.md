# Persistance
User Stories
------------

### <span id="anchor"></span>MVP

As a user:

-   I want to be able to see the state of the game at all times
-   I want to be able to create a room and play the resistance with my friends
-   I want to have game information displayed in realtime in a chat window where I can talk to other players
-   I want to be able to mouseover a player and show what missions they have been on
-   I want to be able to see clearly where the game is up to and what I need to do

### <span id="anchor-1"></span>Stretch

-   I want to see an individual player story
-   I want to increase tension with dramatic mission and game outcome reveals
-   I want to be to put the heat on people through heinous accusations
-   I want to have mission flavour
-   I want to be able to create a password protected room that only my friends can join

<span id="anchor-2"></span>Views (Client Side)
----------------------------------------------

||
||
||
||
||
||
||
||

<span id="anchor-3"></span>Reducers (Client Side)
-------------------------------------------------

||
||
||
||
||
||

<span id="anchor-4"></span>Actions
games
----------------------------------

||
||
||
||

### users

||
||
||

### rounds

||
||
||
||
||
||

### missions

||
||
||
||
||
||

### intentions

||
||
||
||

### votes

||
||
||
||

<span id="anchor-5"></span>API (Client - Server)
------------------------------------------------

||
||
||
||
||
||
||
||

<span id="anchor-6"></span>DB (Server Side)
-------------------------------------------

Game settings in seperate JSON file

There should be three tables for MVP

### Users

||
||
||
||
||
||
||

### Games

||
||
||
||
||
||

### Missions

||
||
||
||
||

### Rounds

||
||
||
||
||
||
||

### Intentions

||
||
||
||
||
||
||

### Votes

||
||
||
||
||
||
||

### Nomnomnom

||
||
||
||
||

### Players Chicken Tendies (Join Table M2M)

Many Users play Many Games

||
||
||
||

### **Round Votes (Join Table)**

Rounds have multiple votes

||
||
||
||

### Round Nominations (Join Table)

Rounds have multiple nominated players

||
||
||
||

<span id="anchor-7"></span>Setup
--------------------------------

Run the following commands in your terminal:

yarn install

yarn knex migrate:latest

yarn knex seed:run

mv .env\_example .env

To run in development:

yarn dev

 - or -

npm run dev

To run in production:

yarn start

 - or -

npm start

<span id="anchor-8"></span>Heroku!!!
------------------------------------

### <span id="anchor-9"></span>Creating your app

Create your app with **heroku create \[name\]**

You can check that this was successful by running **heroku apps** to view a list of your apps

### <span id="anchor-10"></span>Adding postgres

Add postgresql (hobby dev) to your app at **https://dashboard.heroku.com/apps/\[APP NAME HERE\]/resources**

Check that pg has been added by running **heroku addons** to ensure the postgresql db is on your app

### <span id="anchor-11"></span>Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:

yarn h:deploy

 - or -

npm run h:deploy

Run heroku migrations:

yarn h:migrate

 - or -

npm run h:migrate

Run heroku seeds:

yarn h:seed

 - or -

npm run h:seed

If ever you need to rollback, you can also:

yarn h:rollback

 - or -

npm run h:rollback

### <span id="anchor-12"></span>Ta-Da!

Your app should be deployed!
