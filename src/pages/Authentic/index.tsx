import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

// Depois implementa ela, refere-se a testar se usuario já está logado,
const Authentic: React.FC = () => {
	const history = useHistory();

	useEffect(() => {
		history.replace("/dashboard");
	}, [history]);
	return <CircularProgress />;
};

export default Authentic;
