# Persistence
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


## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | Lobby | View for user to create room and decide when there are enough players before starting the game |
  | History | Ugly spreadsheet of votes and other information |
  | GameScreen | Main view for game play, displaying board, missions, players, chat/log |
  | WinScreen | Show the results of the game (stretch) |



## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | game | Store info about game name, time started, host and whether finished or in progress |
  | users | store the list of players who can join games |

 ## Actions

 ### currentGame

 | type | data | purpose |
 | --- | --- | --- |
 | START_GAME | Players, inProgress | initialize game state |
  
 ### games
 
 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_GAMES | games | retrieve list of games for the lobby |

 ### users
 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_USERS | users | retreive the users from the server |
 

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Post | /api/game/new | Yes | Create a new game and populate with host | Game object |
| Post | /api/game/join | Yes | Add player to a game | The user id and game id |
| Post | /api/game/start | Yes | Begin a game | The game object |

## DB (Server Side)
  Game settings in seperate JSON file
  Theere should be three tables for MVP

### Users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | user_name | String |
  | display_name | String |
  | img | text |
  | hash | text |

### Games
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | is_finished | Boolean |
  | in_progress | Boolean |
  | time_stamp | Integer |

### Missions
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | outcome | Boolean |
  | game_id | Integer |

  ### Rounds
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | round_number | Integer |
  | mission_id | Integer |
  | leader_id | Integer |

  ### Intentions
  | Column Name | Data Type |
  | --- | --- |
  | intention | Boolean |
  | mission_id | Integer |
  | user_id | Integer |

  ### Votes (Join Table)

 Rounds have multiple votes
 
  | Column Name | Data Type |
  | --- | --- |
  | round_id | Integer |
  | vote | Boolean |
  | user_id | Integer |

  ### Nominations (Join Table)

 Rounds have multiple nominated players
 
  | Column Name | Data Type |
  | --- | --- |
  | round_id | Integer |
  | user_id | Integer |
  
  ### Players/Roles
  | Column Name | Data Type |
  | --- | --- |
  | game_id | Integer |
  | user_id | Integer |
  | role | String |

 ===========================================================================

### Players Chicken Tendies (Join Table M2M)

  Many Users play Many Games

 | Column Name | Data Type |
 | --- | --- |
 | user_id | Integer |
 | game_id | Integer |


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
```sh
yarn h:deploy
  - or -
npm run h:deploy
```

Run heroku migrations:
```sh
yarn h:migrate
  - or -
npm run h:migrate
```

Run heroku seeds:
```sh
yarn h:seed
  - or -
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
yarn h:rollback
  - or -
npm run h:rollback
```


### Ta-Da!
Your app should be deployed!
