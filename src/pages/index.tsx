import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Pages
import DashBoard from "./DashBoard";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/dashboard" exact={true} component={DashBoard} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;