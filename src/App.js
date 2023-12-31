import React, { useState, useEffect } from "react";
import axios, { all } from 'axios';
import { BrowserRouter as Router, useRoutes, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/AboutPage";
import Profile from './components/Profile';
import ProfilePage from "./pages/ProfilePage";
import { Container, Row, Col, Navbar, Dropdown, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationGuard from "./components/AuthenticationGuard";
import "./App.css";


const API_URL = "https://restaurant-rec-api-back-end.onrender.com/record";


function App() {

  const [users, setUsers] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([])
  const [recommendationsData, setRecommendationsData] = useState([])
  const [savedRestaurants, setSavedRestaurants] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [currentFriends, setCurrentFriends] = useState([])
  const [userRecommendations, setUserRecommendations] = useState([])
  const [cityCenter, setCityCenter] = useState([47.6206, -122.3505])
  const [activeTab, setActiveTab] = useState('bookmarks');


  useEffect(() => {
    getAllUsers();
    if (Object.keys(currentUser).length) {
      getFriends();
      getAllRestaurants();
      getUserRecommendations();
      getSavedRestaurants();
    }
  }, [currentUser.friends, currentUser.recommendations, currentUser.savedList]);

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();


  // Fetches all user data from the API and updates the users state with the retrieved data
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
        console.log(error.message);
      });
  };


  // Fetches all restaurant data from the API and updates the allRestaurants state with the retrieved data
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


  // Retrieves data of the friends of the current user and updates the currentFriends state with the friend data
  const getFriends = async () => {
    const friendData = [];

    for (const friendId of currentUser.friends) {
      const friend = await getUserData(friendId);
      friendData.push(friend);
    }

    setCurrentFriends(friendData);
  };


  // Retrieves data of the saved (bookmarked) restaurants of the current user and updates the savedRestaurants state with the restaurant data
  const getSavedRestaurants = async () => {
    const restaurantData = [];

    for (const restaurantId of currentUser.savedList) {
      const restaurant = await getRestaurant(restaurantId);
      restaurantData.push(restaurant);
    }

    setSavedRestaurants(restaurantData);
  };


  // Sends a POST request to the API to create a new user based on provided user data
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


  // Searches through the list of all users to find the user with a specific username and updates the currentUser state with the found user's data.
  const findCurrentUserData = (currentUsername) => {
    for (const user_object of users) {
      if (user_object.username === currentUsername) {
        setCurrentUser(user_object);
      }
    }
  };


  // Checks if user is new based on formData
  const validateUser = (formData) => {
    if (users.length) {
      let newUser = true;

      for (const userObject of users) {
        if (userObject.username === formData.username) {
          newUser = false;
          break;
        }
      }

      return newUser;
    }
  }


  // Creates a new user if needed and set current user
  const createAndFindUserIfNeeded = (formData) => {
    const newUser = validateUser(formData);

    if (newUser) {
      const newUserData = {
        name: formData.name,
        username: formData.username
      };
      createUser(newUserData);
    }

    findCurrentUserData(formData.username);
  };


  //  Retrieves detailed user data based on a given user ID
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


  // Retrieves detailed restaurant data based on a given restaurant ID
  const getRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(`${API_URL}/get-restaurants/${restaurantId}`);
      console.log("This is the response for restaurant", response.data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };


  // Sends a POST request to the API to create a new restaurant based on provided restaurant data. Returns the ID of the newly created restaurant.
  const addNewRestaurant = async (newRestaurantData) => {
    try {
      const response = await axios.post(`${API_URL}/new-restaurant`, newRestaurantData);
      console.log("You created a new restaurant!", response);
      return response.data._id;
    } catch (error) {
      console.log("error: ", error);
    }
  };


  // Sends a PATCH request to the API to add a specific ID (e.g., friend ID, recommendation ID) to a field (e.g., friends, recommendations) of the current user's data.
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


  // Validates whether a specific ID is already present in a user's field (e.g., savedList, recommendations)
  const validateId = (arrToAdd, formData) => {
    if (currentUser[arrToAdd].includes(formData[arrToAdd])) {
      return false;
    }
    return true;
  }


  // Handles the logic of adding a new restaurant to a user's array, considering validation and providing appropriate alerts.
  const handleAddToList = (arrToAdd, formData) => {
    const isNewRestaurant = validateId(arrToAdd, formData);

    if (isNewRestaurant) {
      updateUserAdd(arrToAdd, { [arrToAdd]: formData[arrToAdd] });

      if (arrToAdd === "savedList") {
        alert("Bookmarked successfully.");
      } else if (arrToAdd === "recommendations") {
        alert("Thank you for also recommending this restaurant!");
        console.log("You should see this")
      }

    } else {
      alert("This restaurant is already in your list.");
    }
  };


  // Sends a PATCH request to the API to remove a specific ID from a field of the current user's data.
  const updateUserDelete = (field, data) => {
    axios
      .patch(`${API_URL}/get-users/${currentUser.username}/${field}/delete`, data)
      .then((response) => {
        console.log("This is the id I want to delete", data[field])
        removeDataFromCurrentUser(field, data[field]);
        console.log(`${data} has been deleted from ${field} successfully!`, response);
      })
      .catch((error) => {
        console.log(`Error deleting ${data}:`, error);
      });
  };


  // Retrieves restaurant recommendations from the friends of the current user, filtering by a specified location. Updates the recommendationsData state and the cityCenter state for map display.
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


  // Retrieves detailed data for the restaurants recommended by the current user and updates the userRecommendations state.
  const getUserRecommendations = async () => {
    const restaurantData = [];

    for (const restaurantId of currentUser.recommendations) {
      const restaurant = await getRestaurant(restaurantId);
      restaurantData.push(restaurant);
    }

    setUserRecommendations(restaurantData);
  };


  // Adds a new ID to a specific field of the current user's data and updates the currentUser state with the new ID accordingly
  const addDataToCurrentUser = (field, id) => {
    if (!currentUser[field].includes(id)) {
      setCurrentUser(prevData => ({
        ...prevData,
        [field]: [...prevData[field], id]
      }));
    }
  };


  // Removes a specific ID from an array of the current user's data and updates the state accordingly.
  const removeDataFromCurrentUser = (field, idToRemove) => {
    setCurrentUser(prevData => ({
      ...prevData,
      [field]: prevData[field].filter(_id => _id !== idToRemove)
    }));

  };


  // Removes restaurantId from savedList and add it to recommendations
  const handleMoveToRecommendations = (restaurantId) => {
    updateUserDelete('savedList', { 'savedList': restaurantId });
    handleAddToList('recommendations', { 'recommendations': restaurantId });
  };


  function Routes() {
    const element = useRoutes([
      {
        path: "/",
        element: <HomePage
          addNewRestaurant={addNewRestaurant}
          allRestaurants={allRestaurants}
          handleAddToList={handleAddToList}
          cityCenter={cityCenter}
          currentUser={currentUser}
          recommendationsData={recommendationsData}
          updateUserAdd={updateUserAdd}
          getFriendsRecommendations={getFriendsRecommendations}
        />
      },
      {
        path: "/profile",
        element: <AuthenticationGuard
          component={ProfilePage}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          updateUserDelete={updateUserDelete}
          savedRestaurants={savedRestaurants}
          userRecommendations={userRecommendations}
          currentUser={currentUser} users={users}
          updateUserAdd={updateUserAdd}
          currentFriends={currentFriends}
          handleMoveToRecommendations={handleMoveToRecommendations}
        />
      },
      { path: "*", element: <NotFoundPage /> }
    ]);
    return element;
  }

  return (
    <div>
      <Router>
        <Container fluid style={{ backgroundColor: '#f8f9fa' }}>
          <Row className="align-items-center justify-content-between">
            <Col className="d-flex justify-content-center align-items-center">
              <Link to="/" style={{ padding: 5, textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
                <img className="logo smaller-image" src="https://i.imgur.com/005YOB7.png" alt="logo" style={{ height: "180px" }} />
                <h1 className="text-center mt-4 mb-2 pt-2 pb-1"> Foodsteps </h1>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container fluid >
          <Navbar sticky="top" bg="light" variant="light" expand="lg" className="d-flex justify-content-between shadow-sm navbar-full-width">
            <Dropdown >
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="ms-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="dark gray" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/about">About</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex align-items-center">
              <div className="mr-auto"></div>
              <Navbar.Brand>
                <Profile createAndFindUserIfNeeded={createAndFindUserIfNeeded} />
              </Navbar.Brand>
              <div className="d-flex justify-content-end">
                {isAuthenticated ? (
                  <>
                    <Button variant="outline-secondary" className="me-4" onClick={() => logout({ returnTo: window.location.origin })}>Log Out </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline-secondary" className="me-4" onClick={loginWithRedirect}>Log In / Sign up</Button>
                  </>
                )}
              </div>
            </div>
          </Navbar>
          <Routes />
        </Container>
      </Router>
    </div >
  );
};

export default App;
