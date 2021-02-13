import React from "react";

import { BrowserRouter, Switch, Route} from "react-router-dom";

// Layout
import MainLayout from "../../layout/MainLayout";

// Pages
import Home from "./Home";

const DashBoard: React.FC = () => {
	return (
		<MainLayout>
		<BrowserRouter>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
			</Switch>
		</BrowserRouter>
		</MainLayout>
	);
}

export default DashBoard;