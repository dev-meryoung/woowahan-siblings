import { Timestamp } from 'firebase/firestore';
import { ISchedule } from '@/pages/Schedule/ScheduleDetail';

export const formatDateWithLeadingZeros = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export const formatDateWithoutLeadingZeros = (timestamp: Timestamp) => {
	const date = timestamp.toDate();

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDayType = (timestamp: Timestamp): 'weekday' | 'saturday' | 'sunday' => {
	const day = timestamp.toDate().getDay();
	if (day === 0) return 'sunday';
	if (day === 6) return 'saturday';
	return 'weekday';
};

export const sortByWorkType = (a: ISchedule, b: ISchedule) => {
	const workTypeOrder = ['open', 'middle', 'close'];

	const aWorkType = a.workTime[0] || '';
	const bWorkType = b.workTime[0] || '';

	return workTypeOrder.indexOf(aWorkType) - workTypeOrder.indexOf(bWorkType);
};
