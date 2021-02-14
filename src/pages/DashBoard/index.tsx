import React from "react";
import { Switch, Route} from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

import Home from "./Home";
import Patient from "./Patient";

const Dashboard: React.FC = () => {
	return (
		<MainLayout>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
				<Route path="/dashboard/patient" component={Patient} />
			</Switch>
		</MainLayout>
	);
}

export default Dashboard;