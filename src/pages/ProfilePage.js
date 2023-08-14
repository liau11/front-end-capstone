import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FriendsPage from './FriendsPage';
import UserRecommendationData from '../components/UserRecommendationData';
import UserSavedData from '../components/UserSavedData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css'; 

const ProfilePage = ({
  updateUserDelete,
  savedRestaurants,
  currentUser,
  userRecommendations,
  users,
  updateUserAdd,
  currentFriends,
  activeTab,
  setActiveTab,
  handleAddToList
}) => {

	const handleTabSelect = (selectedTab) => {setActiveTab(selectedTab)};
	
	const allRecommendationResults = userRecommendations.map((restaurant) => {
		const addressString = restaurant.location.display_address.join(" ");
		
	
		return (
			<UserRecommendationData
				key={restaurant._id}
				restaurantId={restaurant._id}
				name={restaurant.name}
				address={addressString}
				url={restaurant.url}
				imageUrl={restaurant.image_url}
				price={restaurant.price}
				updateUserDelete={updateUserDelete}
				handleAddToList={handleAddToList}
			/>
		);
	});
	

	const allSavedResults = savedRestaurants.map((restaurant) => {
		const addressString = restaurant.location.display_address.join(" ");

	
		return (
			<UserSavedData
				key={restaurant._id}
				restaurantId={restaurant._id}
				name={restaurant.name}
				address={addressString}
				url={restaurant.url}
				imageUrl={restaurant.image_url}
				price={restaurant.price}
				updateUserDelete={updateUserDelete}
			/>
		);
	});
	

  return (
    <section>
      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className='active-tab'>
				<Tab eventKey="bookmarks" title="My Bookmarks">
          <div className="grid-container">
						{allSavedResults}
					</div>
        </Tab>
        <Tab eventKey="recommendations" title="My Recommendations">
					<div className="grid-container">
						{allRecommendationResults}
					</div>
        </Tab>
				<Tab eventKey="friends" title="My Friends"> 
          <FriendsPage
            updateUserDelete={updateUserDelete}
            currentUser={currentUser}
            users={users}
            updateUserAdd={updateUserAdd}
            currentFriends={currentFriends}
          />
        </Tab>
      </Tabs>
    </section>
  );
};

export default ProfilePage;
