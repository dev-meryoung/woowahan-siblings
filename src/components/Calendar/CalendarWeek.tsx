import { ICalendarWeekProps } from '@/interfaces/calendar';
import { colors } from '@/constants/colors';
import styled from '@emotion/styled';

const CalendarWeek = ({ weekName }: ICalendarWeekProps) => {
	return <Container>{weekName}</Container>;
};

export default CalendarWeek;

const Container = styled.span`
	border-bottom: 1px solid ${colors.lightGray};
	padding: 6px 0;
	&:nth-of-type(1),
	&:nth-of-type(7) {
		color: ${colors.gray};
	}
`;
