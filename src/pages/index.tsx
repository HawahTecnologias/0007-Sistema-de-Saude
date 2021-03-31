
import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

import SnackBar from "../layout/SnackBar";
import { GlobalContext } from "../contexts";

import Authentic from "./Authentic";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App: React.FC = () => {
	return (
		<BrowserRouter>
		<GlobalContext>
			<SnackBar />
			<Switch>
				<Route path="/" exact={true} component={Authentic}/>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path="/login" component={Login}/>
			</Switch>
		</GlobalContext>
		</BrowserRouter>
	);
}

export default App;