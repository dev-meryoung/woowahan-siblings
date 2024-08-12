import { FC, useEffect, useMemo, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import CalendarWeek from '@/components/common/Calendar/CalendarWeek';
import CalendarDates from '@/components/common/Calendar/CalendarDates';
import monthList from '@/utils/dateUtils';
import styled from '@emotion/styled';
import useSchedules from '@/hooks/useSchedules';

export interface ICalenderDateProps {
	nowDate: Timestamp;
	isOfficial: boolean;
}

const CalenderContents: FC<ICalenderDateProps> = ({ nowDate, isOfficial }) => {
	const [currentDate, setCurrentDate] = useState(nowDate.toDate());
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

	const calendarDates = useMemo(() => monthList(nowDate), [nowDate]);
	const schedules = useSchedules(currentYear, currentMonth + 1, isOfficial);

	useEffect(() => {
		const today = nowDate.toDate();
		setCurrentDate(today);
		setCurrentYear(today.getFullYear());
		setCurrentMonth(today.getMonth());
	}, [nowDate]);

	return (
		<div>
			<CalendarWeek />
			<CalendarDatesWrap>
				{calendarDates.map((date: Timestamp) => (
					<CalendarDates
						key={date.toMillis().toString()}
						date={date}
						currentYear={currentYear}
						currentMonth={currentMonth}
						isOfficial={isOfficial}
						schedules={schedules}
					/>
				))}
			</CalendarDatesWrap>
		</div>
	);
};

export default CalenderContents;

const CalendarDatesWrap = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;
`;
