import CalendarWeek from './CalendarWeek';
import CalendarDates from './CalendarDates';
import monthList from '../../hooks/useCalendar';
import { ICalenderDateProps } from '../../interfaces/calendar';
import styled from '@emotion/styled';

const CalenderContents = ({ nowDate, isOfficial }: ICalenderDateProps) => {
	const weeks = ['일', '월', '화', '수', '목', '금', '토'];
	const calendarDates = monthList(nowDate);

	return (
		<Container>
			{weeks.map((week) => (
				<CalendarWeek key={week} weekName={week} />
			))}
			{calendarDates.map((date: Date) => (
				<CalendarDates key={date.toDateString()} date={date} isOfficial={isOfficial} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;

export default CalenderContents;
