import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
       statusButton:{
           width: 90,
           fontSize: 12,
       }, 
       confirmBtn:{
        width: 90,
        fontSize: 12,
        borderColor: green[500],
        
        color: green[500],
    },
	}),
);
