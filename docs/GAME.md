Our mission with Torwolf is twofold:

1. Make a fun game.
2. Teach people about secure online communication.

If you have played [werewolf or mafia](https://en.wikipedia.org/wiki/Mafia_(party_game)) (the in person deception game) it is inspired by that, but is a significantly different scenario and ruleset.

#The Scenario

The game takes place in a fictional country with an oppressive regime.  A rebellion is starting, the world wants to know more, and the government wants to stop that from happening.

##Roles and Abilities
- <b>Activist</b> - This is a citizen with a secret, and they want to get the secret safely to the journalist.
- <b>Agent</b> - Trying to stop true rumors from getting published.
- <b>Journalist</b> - Trying to get the true scoop.
- <b>Pro-Rebellion Citizen</b> - Wants to help get the secrets out there.
- <b>Pro-Government Citizen</b> - Wants to help the government stop the rebellion.
- <b>Apathetic Citizen</b> - A citizen who needs to pick a side.

All roles are secret.

##Goals
- <b>Rebellion</b> - They want to get rumors published in the paper.
- <b>Journalist</b> - They want to get rumors published in the paper.
- <b>Government</b> - They want to squelch the rebellion and keep the rest of the world out of it.  This is done by killing the current activist or the journalist before three rumors are published.

<i>Note: Apathetic citizens have to pick a side or they can't win.</i>

##Gameplay

The game is round based.  Rounds last for two minutes.

**At the beginning of the game:**

- Each player is randomly assigned a role.
- Each player is given one false rumor.
- The activist is instead given one true rumors.

**At the end of each round:**

- The journalist may submit a rumor to the newspaper.  It is published, along with a deep investigation, revealing the truth of the rumor to the world (and all players).
- If the journalist has not sent a rumor for investigation in three rounds, the newspaper ends their funding for the project and the government wins.
- If the journalist has sent four rumors incorrectly, the newspaper fires the journalist and the government wins.

**When a true rumor is published:**

- The agent has an opportunity to assasinate someone.  This ends the game.  In this case if the person was the Journalist or the current Activist, the Government wins.  Otherwise the activists win.
- Everyone is given a new rumor and a new activist is randomly selected among all pro-activist citizens.  Once again all rumors are false except for the rumor provided to the activist.

**During the round:**
- Anyone may communicate however they want, with as many people as they want.  Communication is how rumors are spread.

##Communication

There are a few forms of communication

- **IRC:** everyone uses it and everyone is directly linked to their username.  There is a single public room and private messages are allowed.  SSL can be enabled.
- **Email:** PGP can be enabled with proper key sharing.  SSL can also be enabled.

There are also a few forms of security the players have access to

- **SSL:** Sending emails with SSL means the agent doesn't learn your email credentials (and therefore can't pretend they are you).  Reading email with SSL means the agent doesn't know you read an email.  SSL doesn't stop the agent from seeing the email content because of the fact that communication between SMTP servers isn't necessarily secure.  Furthermore, when the agent subpoenas the email server SSL no longer provides any benefits.
- **PGP:** encrypts the content of your email.  The government knows which account received it, but doesn't know the content.  If you have the public PGP key of someone you can send them a secure message.
- **Tor:**  If you use Tor then you can create a new email address that the agent cannot directly associate with you.  The agent only knows that a Tor user created it.  The agent also knows who is using Tor.  Nobody can use Tor unless they have been trained by someone who knows how to use it.  The journalist starts as the only person who knows how to use Tor.

##Agent Snooping

The goal is to simulate the way the real world works.  There are a few places where this is difficult because there is a disparity between what is technically possible and what is realistically possible in the real world.  It boils down to this: The game involves 8 players, the world has 8 billion.

For example, in a world of 8 players it is technically possible to tell not only who is using Tor, but when they send out messages.  In a land of 8 billion you wouldn't be tracked so closely unless there was reason to.  In a real world land of 8 you could wiretap everyone with minimal cost.

It is possible that the agent should only be allowed to wiretap one person at a time to get the explicit details on them?

This section describes how the various forms of communication can be tracked by an agent.

KEY: 
 {+} means something good for the agent, without agent action.
 
 {*} means the agent gets this information only when the agent has gained an explicit advantage.
 
 {-} means something the activists can use to fight against the agent

###Tor

 {+} The agent knows who has enabled Tor.

 {+} Citizens can't use Tor unless they have been trained.

 {-} The journalist starts the game trained to use Tor.

 {-} Anybody who has been trained to use Tor can train another person to use Tor by sending instructions.
 
###Email

 {+}  The agent can read the content of all emails.

 {-} ... unless the sender uses PGP encryption (the agent will still see the content, but it will be encrypted.)

 {+}  The agent can tell when an email account has sent an email.

 {+}  The agent can view the destination (to, from, cc, bcc) of all emails.

 {+}  The agent knows which email accounts a player is accessing.

 {+}  The agent knows which emails have been read, and when.

 {-} ... unless the player is using SSL.

 {+} ... until the agent subpoenas the Email server, at which point SSL no longer has any effect.

 {-} ... unless the player is using Tor.  Users of Tor always have the benefits of SSL.

###IRC

 {+}  The agent can see when a player takes any action.

 {-} ... unless the player is using SSL.

 {+} ... until the agent subpoenas the IRC server, at which point SSL no longer has any effect.

 (note: Tor will have no effect on IRC for the first version)

###In General

 {*} The agent knows when a player has taken an action on a service using SSL.

 {-} ... unless the player is using Tor.

##Possible Setup

###8 players
1 journalist
1 agent
1 pro-government civilian
1 apathetic civilian
4 pro-activist civilians (including one active activist)
