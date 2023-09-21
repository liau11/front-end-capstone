import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";


const Profile = ({ createAndFindUserIfNeeded }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const handleAuth = () => {
      if (isAuthenticated) {
        const formData = {
          name: user.given_name ? user.given_name : user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1),
          username: user.email,
        };

        createAndFindUserIfNeeded(formData);
      }
    };

    handleAuth();
  }, [isAuthenticated]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    isAuthenticated && (
      <div style={{ color: "gray" }}>
        Welcome, {user.given_name ? user.given_name : user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)}!
      </div>
    )
  );
};


Profile.propTypes = {
  createAndFindUserIfNeeded: PropTypes.func.isRequired,
};


export default Profile;