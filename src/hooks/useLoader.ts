import React from "react";

function useLoader() {
	const [loading, setLoading] = React.useState<boolean>(false);

	const start = () =>  {
		setLoading(true);
	};

	const end = () =>  {
		setLoading(false);
	};
	return {
		loading,
		start,
		end
	};
}

export default useLoader;
