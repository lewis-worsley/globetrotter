import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Footer from "./components/Footer";
import JourneyCreateForm from "./pages/journeys/JourneyCreateForm";
import JourneyPage from "./pages/journeys/JourneyPage";





function App() {

	return (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Main}>
				<Switch>
					<Route exact path='/home' render={() => <h1 className={styles.Headings}>Home page</h1>} />
					<Route exact path='/signin' render={() => <SignInForm />} />
					<Route exact path='/signup' render={() => <SignUpForm />} />
					<Route exact path='/journeys/create' render={() => <JourneyCreateForm />} />
					<Route exact path='/journeys/:id' render={() => <JourneyPage />} />
					<Route render={() => <h1 className={styles.Headings}>Page not found!</h1>} />
				</Switch>
			</Container>
			<Footer />
		</div>
	);
};

export default App;