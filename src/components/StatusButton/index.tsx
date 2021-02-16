import React from "react";

import { useStyles } from "./style";

import { Box,
    Button,
    Switch,
	TableCell,
	TableRow,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

export enum Status{
    Cancel = "Cancelado",
    Confirm = "Confirmado",
    Attended = "Atendido",
    Missed = "Faltou",
    InAttendance = "Em atendimento",
    WaitingForService = "Aguardando Atendimento",
    scheduled = "Agendado"
}

interface IProps {
    status: Status;
}

const StatusButton = ( props: IProps) => {
	const classes = useStyles();
    const { status } = props;

	const RenderStatus = () => {
        switch (status) {
            case Status.Cancel:
                return (
                    <Button className={classes.statusButton} variant="outlined" color="secondary">
                    Cancelado
                  </Button>
                );
                case Status.Confirm:
                return (
                    <Button className={classes.confirmBtn} variant="outlined">
                    Confirmado
                  </Button>
                );
                case Status.Attended:
                return (
                    <Button className={classes.statusButton} variant="outlined" color="secondary">
                    Cancelado
                  </Button>
                );
                case Status.InAttendance:
                return (
                    <Button className={classes.statusButton} variant="outlined" color="secondary">
                    Cancelado
                  </Button>
                );
                case Status.Missed:
                return (
                    <Button className={classes.statusButton} variant="outlined" color="secondary">
                    Cancelado
                  </Button>
                );
                default: 
                return <Button/>;

        }
    }
    return <RenderStatus/>

};

export default StatusButton;
