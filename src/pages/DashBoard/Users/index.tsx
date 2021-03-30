import React from "react";
import { Switch, Route } from "react-router-dom";

import CreateUser from "./CreateUser";

const User: React.FC = () => {
	return (
			<Switch>
				<Route path="/dashboard/user/createUser" component={CreateUser} />
			</Switch>
	);
}

export default User;