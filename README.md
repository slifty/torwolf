TorWolf: A game of communication, deception, and media
=============

This document explains how to set up the code.

If you have any questions at all please don't be afraid to ask.

Installing
-------------

Setting up the client and backend

1. Install Node.js (http://nodejs.org/)

2. Install MongoDB (http://www.mongodb.org/)

3. Using a terminal, navigate to the the same directory as this README)

4. Install the Express module (http://expressjs.com/guide.html)

5. Install the Jade module (https://github.com/visionmedia/jade#readme)

6. Install the MongoDB module (http://www.mongodb.org/display/DOCS/node.JS)

7. Install the Mongoose module (http://mongoosejs.com/)

8. Install the SocketIO module (http://socket.io/)

9. Install the node-uuid module (https://github.com/broofa/node-uuid/)

10. Create a local config file
		cp config.default.js config.js
		vi config.js

Please note that the brains for this (question generation) exists in a separate repository, location TBD.

Starting the Server
-------------

1. start the mongo daemon

    mongod

2. start the node server

    node app.js


Code Conventions
=============

Communication Method and Class Naming
-------------
For the sake of simplicity, function and class names concerning communication are always from the perspective of the server, even in client code.

"In" means the message is going from client->server ("into" the server).

"Out" means the message is going server->client ("out" of the server).

jQuery
-------------
Chain when possible
	.because the code
	.is easier
	.to read

Misc
-------------
In situations where order is functionally irrelevant, lists of things should be sorted alphabetically.  This means classes, constants, lists of lists (e.g. this), switch statements, variable declarations, etc.

Variable Naming
-------------
Variable names are camelCase.  This includes acronyms -- "ID" is "Id" and "URL" is "Url"
An attribute can only be called "id" if it is the id of that object.  If it refers to the id of another object it should be "[objectType]Id" e.g. "gameId" or "playerId"

Function Calls
-------------
Function calls should generally be on one line, except in the case of the server side's sendMessage, which should have each part on its own line.

Language
-------------
Torwolf has been built from the beginning to be localize (holy crap over-engineering).  Make sure that any language that will end up on a user's screen goes through the locale structure.

Licensing
=============
The MIT License (MIT)
-------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.