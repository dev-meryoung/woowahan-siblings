import { mockdata } from './mockdata';
import { ICalendarDatesProps } from '../../interfaces/calendar';
import { Clock4 } from 'lucide-react';

const CalendarDates = ({ date, isOfficial }: ICalendarDatesProps) => {
	// 날짜별 데이터 필터링
	const filterdDate = (date: Date, isOfficial: boolean) => {
		return mockdata.filter(
			(item) =>
				new Date(item.workDate).toDateString() === date.toDateString() &&
				item.isOfficial === isOfficial,
		);
	};

	return (
		<div>
			{date.getDate()}
			<ul>
				{filterdDate(date, isOfficial).map((data) => (
					<li key={data.userId}>
						<Clock4 size={10} />
						{data.workType}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CalendarDates;
