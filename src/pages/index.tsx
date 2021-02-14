import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Pages
import Authentic from "./Authentic";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} component={Authentic}/>
				<Route path="/dashboard" component={Dashboard}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;