import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import useLoader from "./useLoader";

interface ITable<TableData> {
	getItemsData: () =>  Promise<AxiosResponse<TableData[]>>
}

function useTableForm<TableData> (props: ITable<TableData>) {
	const [itemsData, setItemsData] = useState<TableData[]>([]);
	const loader = useLoader();

	const getItems = async (newPage?: number) => {
		if (loader.loading) {
			return;
		}

		try {
			loader.start();
			const results = await props.getItemsData();
			setItemsData(results.data);
			console.log("results", results);
		} catch (e) {
			console.log(e.message);
		} finally {
			loader.end();
		}
	}

	useEffect(() => {
		getItems();
	}, [])

	const { loading } = loader;
	return {
		itemsData,
		loading,
	};
};

export default useTableForm;
