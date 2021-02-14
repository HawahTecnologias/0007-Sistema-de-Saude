import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Pages
import Dashboard from "./Dashboard";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/dashboard" exact={true} component={Dashboard} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;