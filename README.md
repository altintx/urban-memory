A multiplayer turn based tactics game. This repository contains:

- High level game overview (below)
- The datamodels to represent game state
- A socketio.js server to facilitate communication of the game state
- `cli/index.js` a CLI implementation of the data models
- `resources` a single campaign, a single mission, and two maps, used for sample gameplay.


## Game
### Story
Something something cold war tactics 2020s tech but in the 80s when it was future tech.

### Themes

### Gameplay
Turn based tactical shooter. Game plays out on a grid. Characters take turns taking actions, which may include attacks, movements, healing, and others TBD. Characters have classes which establish base stats like allowed movement distance and number of action points distributed per turn. They also have experience points which allow finer customization. Lastly, characters have ranks, which limit availabile customizations and also grant passive buffs.

## Running

This will run inside or outside of docker. If you want to use docker, follow the
instructions from [glowing-fiesta-installer](https://github.com/altintx/glowing-fiesta-installer).
To run locally, you'll need Redis running and then

1. yarn
2. yarn serve
3. (or) yarn servedev
## Architecture

### Sockets
There are 2 concepts, "announcements" and "events." The frontend sends a message
over a socket, which this application interprets as an event. Messages sent from
this application to the frontend are announcements. When an event is processed,
an announcement is often sent in response, forming a type of RPC. This is not
mandatory. In some cases, an event is simply processed. In others an announcement
is broadcast to all players subscribed to a game. The fact RPC is enabled does
not mean this is primarily an RPC mechanism.

### Data Models
I'm a business applications developer and data models are how I think of things.
This may not be common for a game. I don't know. But it's what I know so it's
what I'm doing.

Early in building this, I tried to make objects immutable as a way if forcing
announcements when the state changed. I did not do a good job of sticking to that.
Being immutable is the goal, but it's not the present. 

## Todo
There's a lot todo. Here are some of the bigger ideas.

- **Multiplayer** This type of game is usually single player but I want this to be multiplayer. When a group of characters is sent into a fight, different IRL people should control them. It might be a single IRL person controlling multiple characters, but I want the game to assume there are many. This neccessitates putting more authority in this server app and less in the frontend. As I write this, movement validation is a front end concern but that ought to move into websockets. Same with attack validation. Additionally, the interface the active player is interacting with shows highlights and selections; other players should see this same interaction.
- **Enemy waves** Today all enemies are spawned at the beginning of a mission. Enemies should have triggers to spawn them, one trigger being "start of game" but others being proximity detection, reduced numbers of enemies, or other similar concepts.
- **Loot drops** All characters, including enemies, carry some of weaponry, medical, defensive equipment, and perhaps other specialized gear. When a character is downed, some of their gear should become available on the map for other characters to pick up. 
