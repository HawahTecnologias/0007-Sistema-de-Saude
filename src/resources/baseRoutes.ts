import strings from "./strings";

import { Home, 
	AccessibilityNew,
	ListAlt,
	Alarm,
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
	{
		title: routesStrings.consultations,
		icon: Alarm,
		path: "/dashboard/consultations",
	},
	{
		title: routesStrings.medicalRecord,
		icon: ListAlt,
		path: "/dashboard/patientRecord",
	},
];

