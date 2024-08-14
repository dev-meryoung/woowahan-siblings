import { Timestamp } from 'firebase/firestore';
import { IScheduleProps } from '@/hooks/useSchedules';
import { ISchedule } from '@/pages/Schedule/ScheduleDetail';

export const formatDate = (date: string | Timestamp, useLeadingZeros: boolean, type: string) => {
	let dateObj: Date;

	if (date instanceof Timestamp) {
		dateObj = date.toDate();
	} else {
		dateObj = new Date(date);
	}

	if (useLeadingZeros) {
		if (type === 'dot') {
			return `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
		} else if (type === 'line') {
			return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
		}
	} else {
		if (type === 'dot') {
			return `${dateObj.getFullYear()}.${dateObj.getMonth() + 1}.${dateObj.getDate()}`;
		} else if (type === 'line') {
			return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
		}
	}
};

export const getDayType = (timestamp: Timestamp): 'weekday' | 'saturday' | 'sunday' => {
	const day = timestamp.toDate().getDay();
	if (day === 0) return 'sunday';
	if (day === 6) return 'saturday';
	return 'weekday';
};

export const sortByWorkType = (
	a: IScheduleProps | ISchedule,
	b: IScheduleProps | ISchedule,
): number => {
	const workTypeOrder = ['open', 'middle', 'close'];
	const aWorkType = 'workingTimes' in a ? a.workingTimes[0] : a.workTime;
	const bWorkType = 'workingTimes' in b ? b.workingTimes[0] : b.workTime;
	return workTypeOrder.indexOf(aWorkType) - workTypeOrder.indexOf(bWorkType);
};

const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month, 1).getDay();
};

const getLastDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDay();
};

const generateDateArray = (
	start: number,
	end: number,
	year: number,
	month: number,
): Timestamp[] => {
	return Array.from({ length: end - start + 1 }, (_, index) =>
		Timestamp.fromDate(new Date(year, month, start + index)),
	);
};

const monthList = (nowDate: Timestamp): Timestamp[] => {
	const date = nowDate.toDate();
	const nowYear = date.getFullYear();
	const nowMonth = date.getMonth();

	const firstDayOfMonth = getFirstDayOfMonth(nowYear, nowMonth);
	const lastDayOfMonth = getLastDayOfMonth(nowYear, nowMonth);

	const prevMonthDays = firstDayOfMonth;
	const currentMonthDays = getDaysInMonth(nowYear, nowMonth);
	const nextMonthDays = 6 - lastDayOfMonth;

	const prevMonthEndDate = getDaysInMonth(nowYear, nowMonth - 1);

	const prevMonthDates = generateDateArray(
		prevMonthEndDate - prevMonthDays + 1,
		prevMonthEndDate,
		nowYear,
		nowMonth - 1,
	);
	const currentMonthDates = generateDateArray(1, currentMonthDays, nowYear, nowMonth);
	const nextMonthDates = generateDateArray(1, nextMonthDays, nowYear, nowMonth + 1);

	return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const convertDateToServerFormat = (date: string): string => {
	if (date.includes('년') || date.includes('월') || date.includes('일')) {
		const parts = date
			.split(/년|월|일/)
			.map((part) => part.trim())
			.filter(Boolean);
		if (parts.length !== 3) {
			throw new Error(`Invalid date format: ${date}`);
		}
		const [year, month, day] = parts;
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	} else {
		return date;
	}
};

export default monthList;
