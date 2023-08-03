import { BrowserRouter as Router, useRoutes, Link, Outlet, useParams } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
// import RecommendationsResultsList from './components/RecommendationsResultsList';

const slug = "something";

function Testing() {
    console.log("I AM IN TESTING COMPONENT")
    // const { slug } = useParams();
    return (
        <h2>I AM TESTING</h2>
    );
}

function List() {
    return (
        <Link to='/forms/something'>
            <h2>Get Lists</h2>
        </Link>
    );
}

function Routes() {
    const element = useRoutes([
    { path: "/", element: <HomePage/> },
    { path: "/testing", element: <Testing />},
    { 
        path: "/forms",
        element: <List/>,
        children: [
        // { index: true, element: <List/> },
        { path: "something", element: <Testing/> }
        ],
    },
    // { path: "/not-found", element: <NotFoundPage/> },
    { path: "*", element: <NotFoundPage/>}
    ]);
    return element;
}

const RoutesPath = () => {
    return (
        <Router>
            <nav style={{ margin: 10 }}>
                <Link to="/" style={{ padding: 5 }}>
                Home
                </Link>
                <Link to="/forms" style={{ padding: 5 }}>
                Forms
                </Link>
                <Link to="/testing" style={{ padding: 5 }}>
                Testing
                </Link>
                <Link to="/not-found" style={{ padding: 5 }}>
                Not Found
                </Link>
            </nav>
            <Routes />
        </Router>
    );
};

export default RoutesPath;