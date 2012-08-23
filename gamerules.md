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
