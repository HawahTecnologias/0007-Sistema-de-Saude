import React from "react";

import { useStyles } from "./style";

import { Button } from "@material-ui/core";


export enum Status {
	Cancel = "Cancelado",
	Confirm = "Confirmado",
	Attended = "Atendido",
	Missed = "Faltou",
	InAttendance = "Em atendimento",
	WaitingForService = "Aguardando Atendimento",
	scheduled = "Agendado",
}

interface IProps {
	status: Status;
}

const StatusButton = (props: IProps) => {
	const classes = useStyles();
	const { status } = props;

	const RenderStatus = () => {
		switch (status) {
			case Status.Cancel:
				return (
					<Button
						className={classes.statusButton}
						variant="outlined"
						color="secondary"
					>
						{Status.Cancel}
					</Button>
				);
			case Status.Confirm:
				return (
					<Button className={classes.confirmBtn} variant="outlined">
						{Status.Confirm}
					</Button>
				);
			case Status.Attended:
				return (
					<Button className={classes.confirmBtn} variant="outlined">
						{Status.Attended}
					</Button>
				);
			case Status.InAttendance:
				return (
					<Button className={classes.statusButton} variant="outlined" color="primary">
						{Status.InAttendance}
					</Button>
				);
			case Status.Missed:
				return (
					<Button
						className={classes.statusButton}
						variant="outlined"
						color="secondary"
					>
						{Status.Missed}
					</Button>
				);
			case Status.WaitingForService:
				return (
					<Button className={classes.waitingBtn} variant="outlined">
						{Status.WaitingForService}
					</Button>
				);
			case Status.scheduled:
				return (
					<Button className={classes.waitingBtn} variant="outlined">
						{Status.scheduled}
					</Button>
				);
			default:
				return <Button />;
		}
	};
	return <RenderStatus />;
};

export default StatusButton;
