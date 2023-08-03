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
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Check if authentication is still loading
    // if (isLoading) {
    //     return <div>Loading ...</div>;
    // }

    // Check if user is authenticated
    // if (!isAuthenticated) {
    //     console.log(user);
    //     < div > Not authenticated</div >;
    // }


    // Check if user object is defined
    // if (!user) {
    //     return <div>User data not available</div>;
    // }

    console.log(user);

    return (
        isAuthenticated && (
            <div>
                {/* <img src={user.picture} alt={user.name} /> */}
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

export default Profile;
