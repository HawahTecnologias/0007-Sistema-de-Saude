import React, { useEffect } from "react";
import { Switch, Route} from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

import { useGlobalContext } from "contexts/GlobalContext";

import Home from "./Home";
import Patient from "./Patient";
import Consultations from "./Consultations";
import PatientRecord from "./PatientRecord";
import Users from "./Users";

const Dashboard: React.FC = () => {

	//const { authentication } = useGlobalContext();

	return (
		<MainLayout>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
				<Route path="/dashboard/user" component={Users} />
				<Route path="/dashboard/patient" component={Patient} />
				<Route path="/dashboard/consultations" component={Consultations} />
				<Route path="/dashboard/patientRecord" component={PatientRecord} />
			</Switch>
		</MainLayout>
	);
}

export default Dashboard;