import React from "react";
import { Switch, Route } from "react-router-dom";

import CreatePatient from "./CreatePatient";

const Patient: React.FC = () => {
	return (
			<Switch>
				<Route path="/dashboard/patient" exact={true} component={CreatePatient} />
			</Switch>
	);
}

export default Patient;