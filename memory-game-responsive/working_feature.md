### What I did to get the feature working


To get this feature working was honestly a lot harder than I anticipated. Fortunately now, the grid is visible on all different screen widths. 

I started this assignment by trying two different frameworks: tailwind and bulma. I attempted to use their framework to center the game container and make it responsive, but I just couldn't get it to work.

Then, I reset everything to the original state and switched to my own grid layout. I created a new container and wrapped it around the game container, and gave this new container (wrapper) display: grid. Then, I defined the grid to be 5x5 with fractional units for each row/column.

Then, inside the game-container, I centered it horizontally/made it responsive by setting the grid-column to 2/span3. For the grid-row, the grid of cards is too large for the container, so there is always only one row. This was an issue as the height was too large, so to combat this, I added margin to the game container to make sure it fit inside the wrapper. 

Finally, I modified the generateBorder() function in the js so that the border now generates around the scroll width and height, instead of the visible screen width and height.