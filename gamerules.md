Hi All!

I'm making an online game called Torwolf.  The mission is twofold:

# Make a fun game.
# Teach people about secure online communication.

If you have played werewolf or mafia (the in person deception game) it is inspired by that, but is a bit different.

I want the game to be fun, so I need feedback on the design.  Here's what I have so far.

==The Scenario==

The game takes place in a country with an oppressive regime.  A rebellion is starting, the world wants to know more, and the government wants to stop it.

==Roles and Abilities==
- <b>Activist</b> - Trying to get the word out to the world.
- <b>Agent</b> - Trying to stop true rumors from getting published.
- <b>Journalist</b> - Trying to get the true scoop.
- <b>Citizen</b> - Will either be pro-rebellion, pro-government, or apathetic.

All roles are secret.

==Goals==
- <b>Rebellion</b> - They want to get three true rumors published in the paper.
- <b>Journalist</b> - They want to get three true rumors published in the paper.
- <b>Government</b> - They want to squelch the rebellion by keeping the rest of the world out of it.  This is done by killing the activist or the journalist before three rumors are published.

<i>Note: Apathetic citizens have to pick a side or they can't win.</i>

==Gameplay==
The game is round based.  Rounds last for two minutes.

At the beginning of the game:
- Each player is randomly assigned a role.
- Each player is given three false rumors.
- The activist is instead given three true rumors.

At the end of each round the following things occur:
- The journalist may (secretly) submit a story to the newspaper.  It is published, and includes a deep investigation of one rumor he has been exposed to.  The rumor is published and the truth of the rumor is revealed.

During the round the following things happen:
- Anyone may communicate however they want, with as many people as they want.  Communication is how rumors are spread.
- The agent may shoot someone.  This ends the game.  If the person was the Journalist or Activist, the government wins.  Otherwise the activists win.

==Communication==
There are a few forms of communication
- <b>IRC</b>: everyone can see it, everyone is in the room.  This is where people will end up sharing their email addresses.
- <b>Email</b>: PGP and SSL are optionally enabled.
- <b>SSL</b>: Sending email with SSL means the agent doesn't learn your email credentials (and therefore can't pretend they are you).  Reading email with SSL means the agent doesn't know you read an email.  SSL doesn't stop the agent from seeing the email content because of the fact that communication between SMTP servers isn't necessarily secure.
- <b>PGP</b>: encrypts the content of your email.  The government knows who received it, but doesn't know the content.  If you have the public PGP key of someone you can send them a secure message.
- <b>Tor</b>:  If you use Tor then you can create a new email address that the agent cannot directly associate with you.  The agent knows that SOME Tor user created it.  The agent also knows that you are a Tor user.

==Agent Snooping==
The goal is to simulate the way the real world works.  There are a few places where this is difficult because there is a disparity between what is technically possible and what is realistically possible in the real world.  It boils down to this: The game involves 8 players, the world has 8 billion.

For example, in a world of 8 players it is technically possible to tell not only who is using Tor, but when they send out messages.  In a land of 8 billion you wouldn't be tracked so closely unless there was reason to.  In a real world land of 8 you could wiretap everyone with minimal cost.

It is possible that the agent should only be allowed to wiretap one person at a time to get the explicit details on them?

This section describes what COULD be tracked by an agent.  It will be pruned down to what we are actually going to track as we think it through.

KEY:
+ means the agent gets this information regardless of wiretapping
* means the agent gets this information only when wiretapped
- means it is a way for the user to fight against the agent

===Tor===
+ The agent knows who has enabled Tor.
- ... unless a player is using a private Tor bridge, in which case the agent know nothing.
* ... unless the player is wiretapped, in which case the agent still knows the player is using Tor.

===Email===
+ The agent can read the content of all emails.
- ... unless the sender uses PGP encryption (the agent will still see the content, but it will be encrypted.)
+ The agent can therefore tell when a specific account has sent an email.
+ The agent can also therefore view the destination (to, from, cc, bcc) of all emails.
+ The agent knows which email accounts a player is accessing.
- ... unless the player is using SSL or Tor.

===IRC===
+ The agent can see when a user does any action.
+ The agent can see when a player does any action.
- ... unless the player is using SSL or Tor.

===In General===
* The agent knows when a player has taken an action on a service using SSL.
- ... unless the player is using Tor.

Help me turn this into a fun and balanced game!

==Possible Setups==

===8 players===
1 journalist
1 activist
1 agent
1 pro-government civilian
4 pro-activist civilians

What about more players?

===16 players===
1 journalist
1 activist
1 agent
3 pro-government civilian
10 pro-activist civilians
