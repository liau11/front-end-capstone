import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({ getCurrentUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const handleAuth = () => {
      if (isAuthenticated) {
        const formData = {
          name: user.given_name ? user.given_name : user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1),
          username: user.email,
        };
        getCurrentUser(formData);
      }
    };

    handleAuth();
  }, [isAuthenticated]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }



  return (
    isAuthenticated && (
      <div>
        <h2>
          Welcome, {user.given_name ? user.given_name : user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)}!
        </h2>
      </div>
    )
  );
};



export default Profile;