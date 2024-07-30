import { useState } from 'react';
import { ICalendarProps } from '../../interfaces/calendar';
import ControlDate from './ControlDate';
import CalenderContents from './CalenderContents';

const Calendar = ({ isOfficial }: ICalendarProps) => {
	const [nowDate, setNowDate] = useState<Date>(new Date());

	return (
		<div>
			<ControlDate nowDate={nowDate} setNowDate={setNowDate} />
			<CalenderContents nowDate={nowDate} isOfficial={isOfficial} />
		</div>
	);
};

export default Calendar;
