import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "./List";

const Patient: React.FC = () => {
	return (
			<Switch>
				<Route path="/dashboard/consultations" exact={true} component={List} />
			</Switch>
	);
}

export default Patient;