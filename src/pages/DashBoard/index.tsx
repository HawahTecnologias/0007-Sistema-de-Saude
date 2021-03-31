import React from "react";
import { Switch, Route} from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

import Home from "./Home";
import Patient from "./Patient";
import Consultations from "./Consultations";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import PatientRecord from "./PatientRecord";
<<<<<<< HEAD
>>>>>>> parent of 12c856e (create users INCOMPLETE)
=======
>>>>>>> parent of 12c856e (create users INCOMPLETE)
=======
>>>>>>> parent of 8f548b9... Prontuario

const Dashboard: React.FC = () => {
	return (
		<MainLayout>
			<Switch>
				<Route path="/dashboard" exact={true} component={Home} />
				<Route path="/dashboard/patient" component={Patient} />
				<Route path="/dashboard/consultations" component={Consultations} />
			</Switch>
		</MainLayout>
	);
}

export default Dashboard;