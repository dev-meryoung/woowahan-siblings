import { ICalendarWeekProps } from '../../interfaces/calendar';

const CalendarWeek = ({ weekName }: ICalendarWeekProps) => {
	return <div>{weekName}</div>;
};

export default CalendarWeek;
