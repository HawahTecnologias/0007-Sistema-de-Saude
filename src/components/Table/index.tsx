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
	LinearProgress,
	IconButton,
} from "@material-ui/core";

import { Delete, Edit, Visibility } from "@material-ui/icons";

import Pagination from "../Pagination";

interface ITableProps<ItemType> {
	title?: string,
	header: string[],
	rows: ItemType[],
	renderItems: (row: ItemType, index: number) => React.ReactElement;
	loading: boolean;
	tableTop?: React.ReactElement;
	pageOffset?: number;
	onNextClick?: () => void;
	onPrevClick?: () => void;
	tableFooter?: React.ReactElement;
    mainContainerStyles?: string;
	onEdit?: () => void;
	onDetails?: () => void;
	onDelete?: () => void;
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
		loading,
	} = props;

	React.useEffect(()=>{
	},[]);

	return (
		<Paper className={mainContainerStyles || classes.mainContainer} elevation={3}>
			<Box className={classes.tableTop}>
				{title && (
					<Typography variant="h6">{title}</Typography>
				)}
				{tableTop && tableTop}
			</Box>
			<Divider/>
			{loading && (
				<LinearProgress />
			)}
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
							{!loading && rows.map((rowItem, index) => renderItems(rowItem, index))}
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
