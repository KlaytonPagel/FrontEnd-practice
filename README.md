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

2/5/2024
- Worked on Circle Thing

I continued to work on the Circle thing simulation. 
I created a method to find several points on both the oute and inner circle to use for collision checking.

2/6/2024
- More circle thing work

I as able to correct and use the several points from the circles for collision.
I use the collision to change the direction of the inner circle and physical aspects of it such as speed and size.
I added some nice looking polish by drawing the past few points of the circle for a shadowing effect and slowing changing the color of the circle.
I would like to work more on the physics and fine tuning the directional change more, but for the most part it looks close to complete.

2/7/2024
- Slight Circle Thing Tweaks
- Sand Simulator Work

I added sound to the circle thing. Now every collision will play a sound then select the next sound from the array looping back when at the end.
I still need to clean up the physics.

I added a slider for the sand simulator, so you can now change the size of the sand. I made it so the sand is now cycling through the colors.
I added the ability to click and hold to drop the sand. I made a cooldown to dropping sand so it doesn't drop every frame.

2/8/2024
- Circle Thing Work
- Working On Physics

I did more work trying to implement better physics into the circle thing.
I created two other projects used to expirement and play with physics.
I used conservasion of moment in one of my other project and it seems to work way better.

2/9/2024
- Circle thing physics
- HTML Notes

Implemented the conservaion of momentum into the circle thing project.
It is way better than previouse physics mechanics. it still feels a little unnatural and needs more work.

I created a new HTML folder and file for notes on HTML. I added comments, descriptions, and examples for different situations.
I have common elements that are used and how to use them.
