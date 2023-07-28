import React from "react";
import axios from 'axios';
import Map from "./MapContainer";
import UserForm from "./UserForm";

// const sampleData = []


const API_URL = "https://restaurant-rec-api-back-end.onrender.com/record"

function App() {


  const createUser = () => {
    // Test Data, eventually user data will be passed down
    const newUserData = {
      "name": "Jerrica",
      "username": "Jerricausername",
      "password": "Jerricapw"
    }

    axios
      .post(`${API_URL}/new-user`, newUserData)
      .then((response) => {
        console.log("You created a new user!", response);
      })
      .catch((error) => {
        console.log("New user was not created. Error: ", error);
      });
  }

  const getUser = () => {
    // Test Data, eventually user data will be passed down
    const userId = "64c2e9cc8d528bb29bc102b8"
    axios.get(`${API_URL}/get-users/${userId}`)
      .then((response) => {
        console.log("This is the user info", response)
      })
      .catch((error) => {
        console.log("error: ", error);
      })
  }


  return (
    <div>
      <h1>Restaurant Recommendation >: D</h1>
      <button onClick={createUser}>Create User</button>
      <button onClick={getUser}>Get User</button>
      <UserForm createUser={createUser} />
      <Map />
    </div>
  );
}

export default App;
