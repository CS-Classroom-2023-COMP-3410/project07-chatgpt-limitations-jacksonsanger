### What I did to get the feature working

In order to get this feature working, the changes were relatively straightforward. I made one small change to the html file (just getting rid of the number of moves and the timer as I felt those were not useful in a multiplayer setting), and the rest of the changes were to the js file.

I bascially made two new variables, one was an int to represent which player's turn it is, and the other an array to track their scores. 
Then, I made new elements to display this information on the screen. I created a new div and placed all these elements inside, then added this div above the memory game grid.

Then, in the checkForMatch() function, I check if the cards are a match. If they are, I increment the current player's score and then check if the game is finished. The turn does not switch. If the cards are not a match, the turn switches. I added helper functions to switch the turn, update the turn on the UI, update the scores on the UI, and reset all the information when the game is started/restarted.