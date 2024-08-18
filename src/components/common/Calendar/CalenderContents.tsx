import { FC, useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import CalendarWeek from '@/components/common/Calendar/CalendarWeek';
import CalendarDates from '@/components/common/Calendar/CalendarDates';
import { monthList } from '@/utils/dateUtils';
import styled from '@emotion/styled';
import useSchedules from '@/hooks/useSchedules';

export interface ICalenderDateProps {
	nowDate: Timestamp;
	isOfficial: boolean;
}

interface IDateStateProps {
	date: Date;
	year: number;
	month: number;
}

const CalenderContents: FC<ICalenderDateProps> = ({ nowDate, isOfficial }) => {
	const [date, setDate] = useState<IDateStateProps>({} as IDateStateProps);
	const [calendarDates, setCalendarDates] = useState<Timestamp[]>([]);
	const schedules = useSchedules(date.year, date.month + 1, isOfficial);

	useEffect(() => {
		const currentDate = nowDate.toDate();
		setDate({
			date: currentDate,
			year: currentDate.getFullYear(),
			month: currentDate.getMonth(),
		});
		setCalendarDates(monthList(nowDate));
	}, [nowDate]);

	return (
		<div>
			<CalendarWeek />
			<CalendarDatesWrap>
				{calendarDates.map((day: Timestamp) => (
					<CalendarDates
						key={day.toMillis().toString()}
						date={day}
						currentYear={date.year}
						currentMonth={date.month}
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
