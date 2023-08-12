import React from 'react';

const AboutPage = () => {
	return (
		<section className="container my-5">
			<div className="col-md-12 mx-auto">
					<h3 className="mb-3">Crafted with Love and Driven by Indecision</h3>
					<p>Sophia and Lily love to eat. But, they sometimes end up in a bit of a
							dilemma when it comes to picking where to eat. They want to avoid wasting
							time and money on dishes they're not crazy about. Although Yelp and Google
							offer a useful starting point, relying solely on the opinions of
							strangers doesn't always make it easier.
						</p>

					<p>Sophia and Lily believe that the best recommendations come from friends,
							not total strangers. That's why they built this site. Want to tap into
							the foodie wisdom of your pals? Start by adding them to your friend list.
							Once you've got even just one food-loving buddy in your network, you're
							in for a treat. You'll be able to peek at all the restaurants they love,
							right in the city you're interested in. You'll see all those spots on
							a map too, in case you're all about convenience. When you stumble upon
							a restaurant that catches your eye, you've got options. You can save
							it for later – think of it as a bookmark for your belly. Or, better yet,
							share the love if you approve of the restaurant and add it to your own
							list of recommendations. You can also access your profile page,
							which you can revise should your preferences evolve. Tweak it
							any time you want to update your flavor faves.
						</p>

					<p>Long story short, no more endless debates (or at least just shorter ones)
							or culinary FOMO. Just good food, good friends, and good times ahead!
							Follow your friends and eat the best. We hope you enjoy ‘Foodsteps’!
					</p>
					
					<h6 className="mb-2">Technologies Used:</h6>
					<ul>
						<li>MongoDB Atlas & Mongo Compass</li>
						<li>Yelp Fusion API</li>
						<li>React</li>
						<li>React Leaflet</li>
						<li>React Bootstrap</li>
						<li>CSS</li>
						<li>Auth0</li>
						<li>JavaScript</li>
					</ul>
			</div>
		</section>
	);
};

export default AboutPage;
