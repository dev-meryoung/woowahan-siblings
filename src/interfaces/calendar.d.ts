export interface ICalendarProps {
	isOfficial: boolean;
}

export interface IControlDateProps {
	nowDate: Date;
	setNowDate: React.Dispatch<React.SetStateAction<Date>>;
}

export interface ICalenderDateProps {
	nowDate: Date;
	isOfficial: boolean;
}

export interface ICalendarDatesProps {
	date: Date;
	isOfficial: boolean;
}

export interface ICalendarWeekProps {
	weekName: string;
}
