import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Pages
import Authentic from "./Authentic";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} component={Authentic}/>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path="/login" component={Login}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;