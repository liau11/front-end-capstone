import React from 'react';
import PropTypes from 'prop-types';
import RecommendationsResult from './RecommendationsResult';


const RecommendationsResultsList = ({ recommendationsData, updateUserAdd }) => {

    const allResults = recommendationsData.map((recommendation) => {
        console.log("Recommendation Data:", recommendation);
        return (<RecommendationsResult
            key={recommendation._id}
            restaurantId={recommendation._id}
            name={recommendation.name}
            display_phone={recommendation.display_phone}
            price={recommendation.price}
            display_address={recommendation.location.display_address}
            updateUserAdd={updateUserAdd}
        />
        )
    });

    console.log("THIS IS RECOMMENDATIONS DATA", recommendationsData);

    return (
        <section>
            <div>
                <div>
                    <ol className="restaurant-list-container">
                        {allResults}
                    </ol>
                </div>
            </div>
        </section>
    );
};

RecommendationsResultsList.propTypes = {
    recommendationsData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RecommendationsResultsList;