import React from "react";

import { useStyles } from "./style";

import {
	Paper,
	TableContainer,
	Table as MTable,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
} from "@material-ui/core";

import {} from "@material-ui/icons";

interface ITableProps<ItemType> {
	title: string,
	header: string[],
	rows: ItemType[],
	renderItems: (row: ItemType, index: number) => React.ReactElement;
}

function Table<ItemType> (props: ITableProps<ItemType>) {
	const classes = useStyles();
	const { title, header, rows, renderItems } = props;

	return (
		<Paper className={classes.mainContainer}>
			<Typography variant="h4">{title}</Typography>
			<TableContainer>
				<MTable stickyHeader={true}>
					<TableHead>
						<TableRow>
							{header.map((head, index) => ( 
								<TableCell key={`${head}-${index}`}>
									{head}
								</TableCell>)
							)}
						</TableRow>
					</TableHead>
					<TableBody>
							{rows.map((rowItem, index) => renderItems(rowItem, index))}
					</TableBody>
				</MTable>
			</TableContainer>
		</Paper>
	);
};

export default Table;
