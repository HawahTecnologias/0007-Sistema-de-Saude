import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "./List";
import Create from "./Create";

const PatientRecord: React.FC = () => {
	return (
			<Switch>
				<Route path="/dashboard/patientRecord" exact={true} component={List} />
				<Route path="/dashboard/patientRecord/create" component={Create} />
			</Switch>
	);
}

export default PatientRecord;