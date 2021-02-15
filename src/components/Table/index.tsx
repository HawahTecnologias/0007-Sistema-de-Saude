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
	Box,
	Divider,
	TableFooter,
	Button,
} from "@material-ui/core";

import {} from "@material-ui/icons";

import Pagination from "../Pagination";

interface ITableProps<ItemType> {
	title?: string,
	header: string[],
	rows: ItemType[],
	renderItems: (row: ItemType, index: number) => React.ReactElement;
	tableTop?: React.ReactElement;
	pageOffset?: number;
	onNextClick?: () => void;
	onPrevClick?: () => void;
	tableFooter?: React.ReactElement;
    mainContainerStyles?: string;
}

function Table<ItemType> (props: ITableProps<ItemType>) {
	const classes = useStyles();
	const {
		title,
		header,
		rows,
		renderItems,
		tableTop,
		pageOffset,
		onNextClick,
		onPrevClick,
		tableFooter,
		mainContainerStyles,
	} = props;

	return (
		<Paper className={mainContainerStyles || classes.mainContainer}>
			<Box className={classes.tableTop}>
				{title && (
					<Typography variant="h6">{title}</Typography>
				)}
				{tableTop && tableTop}
			</Box>
			<Divider/>
			<TableContainer className={classes.tableContainer}>
				<MTable stickyHeader={true}>
					<TableHead>
						<TableRow>
							{header.map((head, index) => ( 
								<TableCell key={`${head}-${index}`} align="center">
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
			<Divider />
			<Box className={classes.tableFooter}>
				{tableFooter && tableFooter}
				{pageOffset && (
					<Pagination 
						paginationStyle={classes.pagination} 
						lenght={rows.length}
						pageOffset={pageOffset}
						onNextClick={onNextClick}
						onPrevClick={onPrevClick}
					/>
				)}
			</Box>
		</Paper>
	);
};

export default Table;
