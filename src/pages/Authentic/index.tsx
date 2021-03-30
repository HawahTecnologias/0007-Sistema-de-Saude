import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useGlobalContext } from "contexts/GlobalContext";

// Depois implementa ela, refere-se a testar se usuario já está logado,
const Authentic: React.FC = () => {
	const { authentication } = useGlobalContext();

	const history = useHistory();

	useEffect(() => {
		authentication.checkCurrentUser();
	}, [authentication.currentUser]);

	if (!authentication.currentUser) {
		history.replace("/login");
	}

	if (authentication.currentUser) {
		history.replace("/dashboard");
	}

	return <CircularProgress />;
};

export default Authentic;
