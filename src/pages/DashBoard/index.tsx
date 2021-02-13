import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Pages
import Home from "./Home";

const DashBoard: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default DashBoard;