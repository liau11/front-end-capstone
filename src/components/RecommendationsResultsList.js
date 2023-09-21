import React from 'react';
import PropTypes from 'prop-types';
import RecommendationsResult from './RecommendationsResult';


const RecommendationsResultsList = ({ handleAddToList, currentUser, recommendationsData, updateUserAdd }) => {
	const allResults = recommendationsData.map((recommendation) => {
		return (
			<RecommendationsResult
				key={recommendation._id}
				restaurantId={recommendation._id}
				name={recommendation.name}
				display_phone={recommendation.display_phone}
				price={recommendation.price}
				display_address={recommendation.location.display_address}
				url={recommendation.url}
				imageUrl={recommendation.image_url}
				updateUserAdd={updateUserAdd}
				currentUser={currentUser}
				handleAddToList={handleAddToList}
			/>
		)
	});


	return (
		<section>
			<div>
				<div>
					<ol>
						{allResults}
					</ol>
				</div>
			</div>
		</section>
	);
};

RecommendationsResultsList.propTypes = {
	handleAddToList: PropTypes.func.isRequired,
	recommendationsData: PropTypes.arrayOf(PropTypes.object).isRequired,
	currentUser: PropTypes.object.isRequired,
	updateUserAdd: PropTypes.func.isRequired,
};


export default RecommendationsResultsList;