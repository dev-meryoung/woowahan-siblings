import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { colors } from '@/constants/colors';
import { formatDate, getDayType, sortByWorkType } from '@/utils/dateUtils';
import { IScheduleProps } from '@/hooks/useSchedules';
import CalendarBadge from '@/components/common/Calendar/CalendarBadge';
import styled from '@emotion/styled';

interface ICalendarDatesProps {
	date: Timestamp;
	isOfficial: boolean;
	schedules: IScheduleProps[];
	currentMonth: number;
	currentYear: number;
}

const CalendarDates: FC<ICalendarDatesProps> = ({
	date,
	isOfficial,
	schedules,
	currentYear,
	currentMonth,
}) => {
	const navigate = useNavigate();
	const [filteredSchedules, setFilteredSchedules] = useState<IScheduleProps[]>([]);
	const [isCurrentMonth, setIsCurrentMonth] = useState(false);
	const formattedDate = formatDate(date, true, 'line');

	const handleDateClick = () => {
		if (isCurrentMonth && !isOfficial) {
			navigate(`/schedule/${formattedDate}`);
		}
	};

	useEffect(() => {
		const filtered = schedules
			.filter((schedule) => schedule.date === formattedDate)
			.sort(sortByWorkType)
			.map((schedule) => ({
				...schedule,
				workingTimes: [...schedule.workingTimes].sort((a, b) => {
					const order = ['open', 'middle', 'close'];
					return order.indexOf(a) - order.indexOf(b);
				}),
			}));
		setFilteredSchedules(filtered);
	}, [schedules, formattedDate]);

	useEffect(() => {
		const cellDate = date.toDate();
		setIsCurrentMonth(
			cellDate.getMonth() === currentMonth && cellDate.getFullYear() === currentYear,
		);
	}, [date, currentMonth, currentYear]);

	return (
		<DatesContainer
			isOfficial={isOfficial}
			clickable={isCurrentMonth && !isOfficial}
			onClick={() => {
				handleDateClick();
			}}
		>
			<DayContainer dayType={getDayType(date)} isCurrentMonth={isCurrentMonth}>
				{date.toDate().getDate()}
			</DayContainer>
			{filteredSchedules.map((data) => (
				<DateListContainer key={data.date}>
					{data.workingTimes.map((workingTime, index) => (
						<CalendarBadge
							key={`${data.date}-${workingTime}-${index}`}
							workingTime={workingTime}
						/>
					))}
				</DateListContainer>
			))}
		</DatesContainer>
	);
};

export default CalendarDates;

const DatesContainer = styled.div<{
	isOfficial: boolean;
	clickable: boolean;
}>`
	display: flex;
	flex-direction: column;
	gap: 4px;
	border-bottom: 1px solid ${colors.lightGray};
	min-height: 96px;
	padding: 2px;

	&:nth-last-of-type(-n + 7) {
		border-bottom: 0;
	}

	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
	${({ clickable }) =>
		clickable &&
		`
        &:hover {
            background-color: ${colors.lightestGray};
        }
    `}
`;

const DayContainer = styled.span<{
	dayType: 'weekday' | 'saturday' | 'sunday';
	isCurrentMonth: boolean;
}>`
	color: ${({ dayType, isCurrentMonth }) => {
		if (!isCurrentMonth) return colors.lightGray;

		switch (dayType) {
			case 'sunday':
				return colors.red;
			case 'saturday':
				return colors.blue;
			default:
				return colors.black;
		}
	}};
`;

const DateListContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;
