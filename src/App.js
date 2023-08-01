import React, { useState, useEffect } from "react";
import axios from 'axios';
import Map from "./components/MapContainer";
import UserForm from "./components/UserForm";
import RestaurantForm from "./components/RestaurantForm";
import GetRecommendationsForm from "./components/GetRecommendationsForm";
import FindFriendForm from "./components/FindFriendForm";
import RecommendationsResultsList from "./components/RecommendationsResultsList";
import { useRoutes } from "react-router-dom";

const sampleData = [
  {
    "id": "pa6yR1ezl4r-wqqPSd-iZw",
    "alias": "pier-88-boiling-seafood-and-bar-lynnwood-lynnwood",
    "name": "Pier 88 Boiling Seafood & Bar Lynnwood",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/sdZh-fM3KCQbCV2lq4urBQ/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/pier-88-boiling-seafood-and-bar-lynnwood-lynnwood?adjust_creative=6PrpBBzTCAzuiH25czJUZw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6PrpBBzTCAzuiH25czJUZw",
    "review_count": 30,
    "categories": [
      {
        "alias": "seafood",
        "title": "Seafood"
      },
      {
        "alias": "cajun",
        "title": "Cajun/Creole"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 47.83221,
      "longitude": -122.2738
    },
    "transactions": [],
    "location": {
      "address1": "3015 184th St SW",
      "address2": null,
      "address3": "",
      "city": "Lynnwood",
      "zip_code": "98037",
      "country": "US",
      "state": "WA",
      "display_address": [
        "3015 184th St SW",
        "Lynnwood, WA 98037"
      ]
    },
    "phone": "+14256788516",
    "display_phone": "(425) 678-8516",
    "distance": 2058.718123612021
  },
  {
    "id": "Gp59imszlw9Hb-609x_eMQ",
    "alias": "modoo-restaurant-lynnwood",
    "name": "Modoo Restaurant",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ypD653OMVDMgvpX6T51U1Q/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/modoo-restaurant-lynnwood?adjust_creative=6PrpBBzTCAzuiH25czJUZw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=6PrpBBzTCAzuiH25czJUZw",
    "review_count": 205,
    "categories": [
      {
        "alias": "korean",
        "title": "Korean"
      },
      {
        "alias": "soulfood",
        "title": "Soul Food"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 47.830311,
      "longitude": -122.306581
    },
    "transactions": [
      "delivery"
    ],
    "price": "$$",
    "location": {
      "address1": "18601 Hwy 99",
      "address2": "Ste 100",
      "address3": null,
      "city": "Lynnwood",
      "zip_code": "98037",
      "country": "US",
      "state": "WA",
      "display_address": [
        "18601 Hwy 99",
        "Ste 100",
        "Lynnwood, WA 98037"
      ]
    },
    "phone": "+14259675360",
    "display_phone": "(425) 967-5360",
    "distance": 462.10518857244745
  }
]


const API_URL = "https://restaurant-rec-api-back-end.onrender.com/record"

function App() {

  const currentUserData = {
    _id: "64c2e9cc8d528bb29bc102b8",
    name: "Jerrica",
    username: "jerricausername",
    password: "jerricapw",
    friends: ["64c8029074318fce505131ab", "64c331a5da7cc1f7dbaba44d", "64c802871a53ffc4917d8ede"],
    //friends: cocoa, lily, sophia
    recommendations: ["64c18a8dc47da522804cdd70", "64c185cf4fed1955e28555ab"],
    savedList: []
  }

  const [users, setUsers] = useState([])
  // store all the recommendations that your friends recommended
  const [recommendationsData, setRecommendationsData] = useState([])
  const [currentUser, setCurrentUser] = useState(currentUserData)

  const getAllUsers = () => {
    axios
      .get(`${API_URL}/get-users`)
      .then((response) => {
        const allUserData = [];
        response.data.forEach((user) => {
          allUserData.push(user);
        });
        setUsers(allUserData);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const createUser = (newUserData) => {
    axios
      .post(`${API_URL}/new-user`, newUserData)
      .then((response) => {
        console.log("You created a new user!", response);
        setCurrentUser(newUserData);
        getAllUsers();
      })
      .catch((error) => {
        console.log("New user was not created. Error: ", error);
      });
  };

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/get-users/${userId}`);
      console.log("This is the response", response.data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(`${API_URL}/get-restaurants/${restaurantId}`);
      console.log("This is the response for restaurant", response.data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // console.log("THIS IS FRIENDS DATA", recommendationsData)

  const addNewRestaurant = (newRestaurantData) => {
    axios
      .post(`${API_URL}/new-restaurant`, newRestaurantData)
      .then((response) => {
        console.log("You created a new restaurant!", response);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const updateUserAdd = (field, data) => {
    // Test Data, eventually data will be passed down
    // const username = "lilyuser";
    // const field = "savedList";
    // const data = {
    //   savedList: "pa6yR1ezl4r-wqqPSd-iZw"
    // };

    axios
      .patch(`${API_URL}/get-users/${currentUser.username}/${field}/add`, data)
      .then((response) => {
        console.log(`${data} has been added to ${field} successfully!`, response);
      })
      .catch((error) => {
        console.log(`Error adding ${data}:`, error);
      });
  };

  const updateUserDelete = (field, data) => {
    // Test Data, eventually data will be passed down
    // const username = "lilyuser";
    // const field = "savedList";
    // const data = {
    //   savedList: "pa6yR1ezl4r-wqqPSd-iZw"
    // }

    axios
      .patch(`${API_URL}/get-users/${currentUser.username}/${field}/delete`, data)
      .then((response) => {
        console.log(`${data} has been deleted from ${field} successfully!`, response);
      })
      .catch((error) => {
        console.log(`Error deleting ${data}:`, error);
      });
  };

  const getFriendsRecommendations = async (location) => {
    const restaurantData = [];

    for (const friendId of currentUser.friends) {
      const friend = await getUserData(friendId);
      for (const restaurantId of friend.recommendations) {
        const restaurant = await getRestaurant(restaurantId);
        if (restaurant.location.city.toLowerCase() === location.toLowerCase()) {
          restaurantData.push(restaurant);
        }
      }
    }
    setRecommendationsData(restaurantData);
  };

  return (
    <div>
      <h1>Restaurant Recommendation >: D</h1>
      <button onClick={createUser}>Create User</button>
      <button onClick={getUserData}>Get User</button>
      <button onClick={getRestaurant}>Get Restaurant</button>
      <button onClick={addNewRestaurant}>Add New Restaurant</button>
      <UserForm createUser={createUser} users={users} />
      <FindFriendForm updateUserAdd={updateUserAdd} />
      <button onClick={updateUserAdd}>Follow</button>
      <button onClick={updateUserAdd}>Add Rec</button>
      {/* <button onClick={updateUserAdd}>Save Rec</button> */}
      <button onClick={updateUserDelete}>Unfollow</button>
      <button onClick={updateUserDelete}>Remove Rec</button>
      <button onClick={updateUserDelete}>Remove Saved Rec</button>
      <RecommendationsResultsList recommendationsData={recommendationsData} updateUserAdd={updateUserAdd} />
      <RestaurantForm addNewRestaurant={addNewRestaurant} />
      <GetRecommendationsForm getFriendsRecommendations={getFriendsRecommendations}></GetRecommendationsForm>
      <Map recommendationsData={recommendationsData} />
    </div >
  );
};
export default App;
