Hi All!

I'm making an online game called Torwolf.  The mission is twofold:

# Make a fun game.
# Teach people about secure online communication.

If you have played werewolf or mafia (the in person deception game) it is inspired by that, but is a bit different.

I want the game to be fun, so I need feedback on the design.  Here's what I have so far.

==The Scenario==
The game takes place in a country with an oppressive regime.  A rebellion is starting, the world wants to know more, and the government wants to stop it.

==Roles and Abilities==
- <b>Activist</b> - Is able to discover true rumors.
- <b>Agent</b> - Is able to kill people.  Is able to create false rumors
- <b>Editor</b> - Is able to publish a newspaper.
- <b>Journalist</b> - Is able to interview people.
- <b>Citizen</b> - Is able to create false rumors.  Will either be pro-rebellion, pro-government, or apathetic.

All roles are secret except the editor.  Everyone knows who the editor is.  The editor is also immune from being killed.

==Goals==
- <b>Rebellion</b> - They want to get three true rumors published in the paper
- <b>Journalist / Editor</b> - They want to get three true rumors published in the paper
- <b>Government</b> - They want to squelch the rebellion.  This is done by killing the activist before he is able to spread three rumors to non-government agents, or by killing all rebels.

<i>Note: Apathetic citizens have to pick a side or they can't win.  Citizens lose if they are killed.</i>

==Gameplay==
The game is round based.  Rounds last for two minutes.

At the beginning of each round the following things occur:
- Any player may create a false rumor.
- The activist may instead create a true rumor.

At the end of each round the following things occur:
- If the agent has no ammunition, he gets a bullet.
- The agent gets 1/3 of a vial of poison.
- The editor publishes a paper which includes a deep investigation of one rumor he has been exposed to.  The rumor is published and the truth of the rumor is revealed.

During the round the following things happen:
- Anyone may communicate however they want, with as many people as they want.  Communication is how rumors are spread.
- If the agent has a bullet he may shoot someone.  This kills the person, and reveals the identity of the agent.
- If the agent has a full vial of poison he may poison someone.  This kills the person and does NOT reveal the identity of the agent.
- The journalist can investigate someone.  This tells the journalist the allegiance of that player.

==Communication==
There are a few forms of communication
- <b>IRC</b>: everyone can see it, everyone is in the room.  This is where people will end up sharing their email addresses.
- <b>Email</b>: PGP and SSL are optionally enabled.
- <b>SSL</b>: Sending email with SSL means the agent doesn't learn your email credentials (and therefore can't pretend they are you).  Reading email with SSL means the agent doesn't know you read an email.  SSL doesn't stop the agent from seeing the email content because of the fact that communication between SMTP servers isn't necessarily secure.
- <b>PGP</b>: encrypts the content of your email.  The government knows who received it, but doesn't know the content.  If you have the public PGP key of someone you can send them a secure message.
- <b>Tor</b>:  If you use Tor then you can create a new email address that the agent cannot directly associate with you.  The agent knows that SOME Tor user created it.  The agent also knows that you are a Tor user.
- <b>Tor Bridge</b>: The editor can set up a Tor bridge.  Anyone who knows the address of the Tor bridge is able to use tor invisibly (the agent won't know anything about what those users are doing at all, and all traces of communication will be hidden completely).  If the agent learns the address then this is no longer the case.

Help me turn this into a fun and balanced game!

==Possible Setups==

===8 players===
1 editor
1 journalist
1 activist
1 agent
1 pro-government civilian
3 pro-activist civilians

What about more players?

===16 players===
1 editor
1 journalist
1 activist
1 agent
3 pro-government civilian
9 pro-activist civilians

(9 secrets needed to win)