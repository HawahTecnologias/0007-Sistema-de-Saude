import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import CreatePatient from "./CreatePatient";
import Home from "./Home";

const Dashboard: React.FC = () => {
	return (
		<MainLayout>
		<BrowserRouter>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
				<Route path="/dashboard/createPatient" component={CreatePatient} />
			</Switch>
		</BrowserRouter>
		</MainLayout>
	);
}

export default Dashboard;