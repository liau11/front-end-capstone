import React, { useState, useEffect } from "react";
import axios from 'axios';
import Map from "./components/MapContainer";
import UserForm from "./components/UserForm";
import RestaurantForm from "./components/RestaurantForm";
import GetRecommendationsForm from './components/GetRecommendationsForm';
import FindFriendForm from './components/FindFriendForm';
import RecommendationsResultsList from "./components/RecommendationsResultsList";
// import RoutesPath from "./Routes";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';



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


  function Testing() {
    console.log("I AM IN TESTING COMPONENT")
    // const { slug } = useParams();
    return (
      <h2>I AM TESTING</h2>
    );
  }

  function TestingLink() {
    return (
      <Link to='/forms/testing-link'>
        <h2>Link to Testing</h2>
      </Link>
    );
  }

  function Routes() {
    const element = useRoutes([
      { path: "/", element: <HomePage recommendationsData={recommendationsData} updateUserAdd={updateUserAdd} getFriendsRecommendations={getFriendsRecommendations} /> },
      // { path: "/", element: {<AuthenticationGuard component={<HomePage/>} }
      { path: "/forms", element: <TestingLink /> },
      { path: "/forms/testing-link", element: <Testing /> },
      {
        path: "/friends",
        element: (
          <>
            <FindFriendForm updateUserAdd={updateUserAdd} />

          </>
        )
      },
      { path: "/map", element: <Map recommendationsData={recommendationsData}></Map> },
      { path: "*", element: <NotFoundPage /> }
    ]);
    return element;
  }

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <Profile />
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
          <Link to="/forms" style={{ padding: 5 }}>
            Forms
          </Link>
          <Link to="/friends" style={{ padding: 5 }}>
            Friends
          </Link>
          <Link to="/not-found" style={{ padding: 5 }}>
            Not Found
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
