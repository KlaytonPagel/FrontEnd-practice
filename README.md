There has been work done on this repository before now, I just now decided to log the main changes today

2/2/2024
- Started Sand Simulator

I started working on a sand simulation in Java Script using the HTML Canvas tag.
So far the simulation is fully functional, you can click to spawn sand in and it will fall until it lands on the bottom or another peice of sand.
If the sand can't go staight down it will try to go dowwn and to a side, this causes it to pile up.

2/3/2024
- Worked on Sand Simulation

I essentially finished the sand simulation, there are a couple other ideas I might play with later but I am happy with the outcome.
The sand now spawns a few pieces when you click randomly near where you click.
I now stop the walls from moving outside the bounds of the canvas so their aren't pieces being drawn you can't see.
I set a flag on the sand after a certain amount of time to stop it from checking if it can move. This increased performance by not checking each piece for every piece of sand.

2/4/2024
- Started Circle Thing Simulation

My TikTok has been showing me some simulation thing that has a ball that bounces inside of a circle changing one trait every collision. 
These traits can be thing like increaseing speed, size, changing shape, or adding more balls.
I decided to try making my own version of this using Java script, and HTML canvas.
So far I have methods to generate the large circle container and the smaller ball inside.
I added basic collision and the ability to change the size, speed, ore both.
I started the preperations to implement more complicated collisions.
