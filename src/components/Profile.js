// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const Profile = () => {

//     const { user } = useAuth0();

//     return (
//         <div>
//             {JSON.stringify(user, null, 2)}
//         </div>
//     )
// }

// export default Profile

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    // Check if authentication is still loading
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <div>Not authenticated</div>;
    }

    // Check if user object is defined
    if (!user) {
        return <div>User data not available</div>;
    }

    console.log(user);

    return (
        <div>
            {/* Display user information */}
            <h2>Email: {user.email}</h2>
            {/* You can also display other user information */}
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default Profile;
