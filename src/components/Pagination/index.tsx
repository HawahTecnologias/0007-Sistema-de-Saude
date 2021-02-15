// MARK: React
import * as React from "react";

// MARK: Styles
import useStyles from "./style";

// Mark Material
import {
	Box,
	Typography,
	IconButton,
	} from "@material-ui/core";
import { ChevronRight as MChevronRightIcon,
	ChevronLeft as MChevronLeftIcon } from "@material-ui/icons";

interface IProps {
	lenght: number;
	pageOffset: number;
	onNextClick?: () => void;
	onPrevClick?: () => void;
    paginationStyle?: string;
}

function Pagination ( props: IProps ) {
	const classes = useStyles();
	const {
		lenght,
		pageOffset,
		onNextClick,
		onPrevClick,
        paginationStyle,
	} = props;

	return (
		<Box className={paginationStyle || classes.paginationControl}>
			<IconButton onClick={onPrevClick} disabled={pageOffset === 1}>
				<MChevronLeftIcon />
			</IconButton>
			<Typography variant="subtitle2">{pageOffset}</Typography>
			<IconButton onClick={onNextClick} disabled={lenght === 0 || lenght < 20}>
				<MChevronRightIcon />
			</IconButton>
		</Box>
	);
}

export default Pagination;
