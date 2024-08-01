import { useState } from 'react';
import { ICalendarProps } from '@/interfaces/calendar';
import ControlDate from '@/components/Calendar/ControlDate';
import CalenderContents from '@/components/Calendar/CalenderContents';
import styled from '@emotion/styled';

const Calendar = ({ isOfficial }: ICalendarProps) => {
	const [nowDate, setNowDate] = useState<Date>(new Date());

	return (
		<Container>
			<ControlDate nowDate={nowDate} setNowDate={setNowDate} />
			<CalenderContents nowDate={nowDate} isOfficial={isOfficial} />
		</Container>
	);
};

export default Calendar;

const Container = styled.span`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;
