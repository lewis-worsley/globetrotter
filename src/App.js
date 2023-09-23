import styles from "./App.module.css";

import NavBar from './components/NavBar';

import Container from "react-bootstrap/Container";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import './api/axiosDefaults';

import Footer from "./components/Footer";

import HomePage from "./pages/home/HomePage";

import JourneyCreateForm from "./pages/journeys/JourneyCreateForm";
import JourneyEditForm from "./pages/journeys/JourneyEditForm";
import JourneyPage from "./pages/journeys/JourneyPage";
import JourneysPage from "./pages/journeys/JourneysPage";

import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";

import BlogsPage from "./pages/blogs/BlogsPage";
import BlogCreateForm from "./pages/blogs/BlogCreateForm";
import BlogPage from "./pages/blogs/BlogPage";
import BlogEditForm from "./pages/blogs/BlogEditForm";

import NewsPage from "./pages/news/NewsPage";
import NewssPage from "./pages/news/NewssPage";

import NotFound from "./components/NotFound";

function App() {
	return (
		<div className={styles.App}>
			<NavBar />
			<Container className={`${styles.Main} ${styles.MinPageHeight}`}>
				<Switch>
					<Route exact path='/' render={() => <HomePage />} />
					<Route
						exact
						path='/journeys'
						render={() => (
							<JourneysPage
								message="No results found. Adjust the search keyword."
							/>
						)}
					/>
					<Route exact path='/signin' render={() => <SignInForm />} />
					<Route exact path='/signup' render={() => <SignUpForm />} />
					<Route
						exact
						path='/blogs'
						render={() => (
							<BlogsPage
								message="No results found. Adjust the search keyword."
							/>
						)}
					/>
					<Route exact path='/blogs/create' render={() => <BlogCreateForm />} />
					<Route exact path='/blogs/:id' render={() => <BlogPage />} />
					<Route exact path='/blogs/:id/edit' render={() => <BlogEditForm />} />
					<Route exact path='/journeys/create' render={() => <JourneyCreateForm />} />
					<Route exact path='/journeys/:id' render={() => <JourneyPage />} />
					<Route exact path='/journeys/:id/edit' render={() => <JourneyEditForm />} />
					<Route exact path='/profiles/:id' render={() => <ProfilePage />} />
					<Route
						exact
						path='/news'
						render={() => (
							<NewssPage
								message="No results found. Adjust the search keyword."
							/>
						)}
					/>
					<Route exact path='/news/:id' render={() => <NewsPage />} />
					<Route
						exact
						path='/profiles/:id/edit/username'
						render={() => <UsernameForm />}
					/>
					<Route
						exact
						path='/profiles/:id/edit/password'
						render={() => <UserPasswordForm />}
					/>
					<Route
						exact
						path='/profiles/:id/edit'
						render={() => <ProfileEditForm />}
					/>
					<Route render={() => <NotFound />} />
				</Switch>
			</Container>
			<Footer />
		</div>
	);
};

export default App;