import React, { useState, useEffect } from "react";
import axios from 'axios';
import Map from "./components/MapContainer";
import RestaurantForm from "./components/RestaurantForm";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import FriendsPage from "./pages/FriendsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import ProfilePage from "./pages/ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";



const API_URL = "https://restaurant-rec-api-back-end.onrender.com/record"

function App() {

  const [users, setUsers] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([])
  // store all the recommendations that your friends recommended
  const [recommendationsData, setRecommendationsData] = useState([])
  const [savedRestaurants, setSavedRestaurants] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [currentFriends, setCurrentFriends] = useState([])
  const [userRecommendations, setUserRecommendations] = useState([])
  const [cityCenter, setCityCenter] = useState([47.6206, -122.3505])

  // console.log("This is the current user", currentUser);
  // console.log("This is ALL USERS", users);
  // console.log("This is currentFriends", currentFriends);
  
  useEffect(() => {
    getAllUsers();
    if (Object.keys(currentUser).length) {
      getFriends();
      getAllRestaurants();
      getUserRecommendations();
      getSavedRestaurants();
    }
  }, [currentUser.friends, currentUser.recommendations, currentUser.savedList]);


  console.log("These are all the restaurants in the db", allRestaurants)
  console.log("These are my recommendations", userRecommendations)
  console.log("These are my bookmarked restaurants", savedRestaurants)

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


  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/get-restaurants`)
      .then((response) => {
        const allRestaurantData = [];
        response.data.forEach((restaurant) => {
          allRestaurantData.push(restaurant);
        });
        setAllRestaurants(allRestaurantData);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };  


  // Get list of friends of current user
  const getFriends = async () => {
    const friendData = [];

    for (const friendId of currentUser.friends) {
      const friend = await getUserData(friendId);
      friendData.push(friend);
    }

    setCurrentFriends(friendData);
  };

  const getSavedRestaurants = async () => {
    const restaurantData = [];

    for (const restaurantId of currentUser.savedList) {
      const restaurant = await getRestaurant(restaurantId);
      restaurantData.push(restaurant);
    }

    setSavedRestaurants(restaurantData);
  };


  const createUser = (newUserData) => {
    axios
      .post(`${API_URL}/new-user`, newUserData)
      .then((response) => {
        console.log("You created a new user!", response);
      })
      .catch((error) => {
        console.log("New user was not created. Error: ", error);
      });
  };

  const findCurrentUserData = (currentUsername) => {
    for (const user_object of users) {
      if (user_object.username === currentUsername) {
        setCurrentUser(user_object);
      }
    }
  };


  const getCurrentUser = (formData) => {
    let newUser = true;

    for (const userObject of users) {
      if (userObject.username === formData.username) {
        newUser = false;
      }
    }

    const newUserData = {
      name: formData.name,
      username: formData.username
    }

    if (newUser) {
      createUser(newUserData);
    };
    findCurrentUserData(formData.username)
  };


  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/get-users/${userId}`);
      console.log("Got data from", userId)
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      console.log("Had trouble getting data from:", userId)
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


  const addNewRestaurant = async (newRestaurantData) => {
    try {
      const response = await axios.post(`${API_URL}/new-restaurant`, newRestaurantData);
      console.log("You created a new restaurant!", response);
      console.log("These are all the restaurants", allRestaurants)
      return response.data._id;
    } catch (error) {
      console.log("error: ", error);
    }
  };


  const updateUserAdd = (field, data) => {
    axios
      .patch(`${API_URL}/get-users/${currentUser.username}/${field}/add`, data)
      .then((response) => {
        addDataToCurrentUser(field, data[field]);
        console.log(`${data} has been added to ${field} successfully!`, response);
      })
      .catch((error) => {
        console.log(`Error adding ${data}:`, error);
      });
  };

  
const validateId = (arrToAdd, formData) => {
  if (currentUser[arrToAdd].includes(formData.recommendations)) {
      return false;
  }
  return true;
}


const handleAddToList = (arrToAdd, formData) => {
    const isNewRestaurant = validateId(arrToAdd, formData);
    if (isNewRestaurant) {
        updateUserAdd(arrToAdd, { [arrToAdd]: formData.recommendations });
        if (arrToAdd === "savedList") {
            alert("Bookmarked sucessfully.");
        } else if (arrToAdd === "recommendations") {
            alert("Thank you for also recommending this restaurant!");
        }
    } else {
        alert("This restaurant is already in your list.");
    }
};

  const updateUserDelete = (field, data) => {
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
    let matchFound = false; 
    
    for (const friendId of currentUser.friends) {
      const friend = await getUserData(friendId);
      
      for (const restaurantId of friend.recommendations) {
        const restaurant = await getRestaurant(restaurantId);
  
        const isRestaurantInRestaurantData = restaurantData.some(obj => obj._id === restaurantId);
        if (!isRestaurantInRestaurantData && restaurant.location.city.toLowerCase() === location.toLowerCase()) {
          restaurantData.push(restaurant);
          matchFound = true; 
        }
      }
    }
  
    if (!matchFound) {
      alert("No recommendations found in the specified location.");
    } else {
      setRecommendationsData(restaurantData);
      setCityCenter([restaurantData[0].coordinates.latitude, restaurantData[0].coordinates.longitude]);
    }
  };
  


  const getUserRecommendations = async () => {
    const restaurantData = [];

    for (const restaurantId of currentUser.recommendations) {
      const restaurant = await getRestaurant(restaurantId);
      restaurantData.push(restaurant);
    }

    setUserRecommendations(restaurantData);
  };


  const addDataToCurrentUser = (field, id) => {
    if (!currentUser[field].includes(id)) {
      setCurrentUser(prevData => ({
        ...prevData,
        [field]: [...prevData[field], id]
      }));
    }
  };

  console.log(currentUser)


  function Routes() {
    const element = useRoutes([
      { path: "/", element: <HomePage handleAddToList={handleAddToList} cityCenter={cityCenter} currentUser={currentUser} recommendationsData={recommendationsData} updateUserAdd={updateUserAdd} getFriendsRecommendations={getFriendsRecommendations} /> },
      // { path: "/", element: {<AuthenticationGuard component={<HomePage/>} }
      { path: "/restaurant-form", element: <RestaurantForm handleAddToList={handleAddToList} allRestaurants={allRestaurants} addNewRestaurant={addNewRestaurant} updateUserAdd={updateUserAdd} /> },
      { path: "/profile", element: <ProfilePage savedRestaurants={savedRestaurants} userRecommendations={userRecommendations} currentUser={currentUser} users={users} updateUserAdd={updateUserAdd} currentFriends={currentFriends}/>},
      { path: "/map", element: <Map  recommendationsData={recommendationsData}></Map> },
      { path: "*", element: <NotFoundPage /> }
    ]);
    return element;
  }

  return (
    <div>
      <h1> Title goes here</h1>
      <LoginButton />
      <LogoutButton />
      <Profile getCurrentUser={getCurrentUser} />
      <Popup trigger=
        {<button> CLICK ME FOR COOL POP UP </button>}
        modal nested>
        {
          close => (
            <div className='modal'>
              <div className='content'>
                BOO!!!
              </div>
              <div>
                <button onClick=
                  {() => close()}>
                  close
                </button>
              </div>
            </div>
          )
        }
      </Popup>
      <Router>
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>
          <Link to="/restaurant-form" style={{ padding: 5 }}>
            Recommend A Restaurant
          </Link>
          <Link to="/profile" style={{ padding: 5 }}>
            Profile
          </Link>
          <Link to="/not-found" style={{ padding: 5 }}>
            About
          </Link>
        </nav>
        <Routes />
      </Router>
      {/* <h1>Restaurant Recommendation >: D</h1>

      <h1>Restaurant Recommendation >: D</h1>
      <button onClick={createUser}>Create User</button>
      <button onClick={getUserData}>Get User</button>
      <button onClick={getRestaurant}>Get Restaurant</button>
      <button onClick={addNewRestaurant}>Add New Restaurant</button> */}
      {/* <UserForm createUser={createUser} users={users} />
      <FindFriendForm updateUserAdd={updateUserAdd} /> */}
      {/* <button onClick={updateUserAdd}>Follow</button>
      <button onClick={updateUserAdd}>Add Rec</button> */}
      {/* <button onClick={updateUserAdd}>Save Rec</button> */}
      {/* <button onClick={updateUserDelete}>Unfollow</button>
      <button onClick={updateUserDelete}>Remove Rec</button>
      <button onClick={updateUserDelete}>Remove Saved Rec</button> */}
      {/* <RestaurantForm addNewRestaurant={addNewRestaurant} /> */}
    </div >
  );
};

export default App;
