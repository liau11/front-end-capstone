import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = ({ getCurrentUser, currentUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && !currentUser.length) {
      const formData = {
        name: user.given_name,
        username: user.email,
      };
      getCurrentUser(formData);
    }
  }, [isAuthenticated, currentUser]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.given_name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};



export default Profile;