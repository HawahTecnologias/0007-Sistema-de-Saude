import React from "react";
import { Switch, Route } from "react-router-dom";

import CreatePatient from "./CreatePatient";
import ListPatient from "./ListPatient";

const Patient: React.FC = () => {
	return (
			<Switch>
				<Route path="/dashboard/patient" exact={true} component={ListPatient} />
				<Route path="/dashboard/patient/createPatient" component={CreatePatient} />
			</Switch>
	);
}

export default Patient;