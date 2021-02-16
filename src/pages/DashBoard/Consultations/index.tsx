import React from "react";
import { Switch, Route } from "react-router-dom";
import Create from "./Create";

import List from "./List";

const Patient: React.FC = () => {
	return (
		<Switch>
			<Route
				path="/dashboard/consultations"
				exact={true}
				component={List}
			/>
			<Route path="/dashboard/consultations/create" component={Create} />
		</Switch>
	);
};

export default Patient;
