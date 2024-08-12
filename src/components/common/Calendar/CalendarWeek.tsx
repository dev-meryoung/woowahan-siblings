import { colors } from '@/constants/colors';
import styled from '@emotion/styled';
import { FC } from 'react';

const weeks = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarWeek: FC = () => {
	return (
		<Container>
			{weeks.map((weekName) => (
				<span key={weekName}>{weekName}</span>
			))}
		</Container>
	);
};

export default CalendarWeek;

const Container = styled.div`
	display: flex;
	border-bottom: 1px solid ${colors.lightGray};
	padding: 6px 0;
	text-align: center;

	span {
		flex: 1;
	}
	span:nth-of-type(1) {
		color: ${colors.red};
	}
	span:nth-of-type(7) {
		color: ${colors.blue};
	}
`;
