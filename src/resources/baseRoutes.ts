import strings from "./strings";

import { Home, 
	AccessibilityNew
} from '@material-ui/icons';

const routesStrings = strings.baseRoutes;

export const baseRoutes = [
	{
		title: routesStrings.home,
		icon: Home,
		path: "/dashboard",
	},
	{
		title: routesStrings.patient,
		icon: AccessibilityNew,
		path: "/dashboard/patient",
	},
];

