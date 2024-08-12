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

//해당 월의 총 일수를 반환
const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

//해당 월의 첫 날의 요일을 반환
const getFirstDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month, 1).getDay();
};

//해당 월의 마지막 날의 요일을 반환
const getLastDayOfMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDay();
};

//시작일부터 종료일까지의 Date 객체 배열을 생성
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

//특정 날짜(nowDate)를 기반으로 해당 월의 날짜 목록을 생성하는 함수
const monthList = (nowDate: Timestamp): Timestamp[] => {
	const date = nowDate.toDate();
	const nowYear = date.getFullYear();
	const nowMonth = date.getMonth();

	const firstDayOfMonth = getFirstDayOfMonth(nowYear, nowMonth);
	const lastDayOfMonth = getLastDayOfMonth(nowYear, nowMonth);

	const prevMonthDays = firstDayOfMonth; //현재 월의 첫 날 전의 요일 수
	const currentMonthDays = getDaysInMonth(nowYear, nowMonth); //현재 월의 총 일수
	const nextMonthDays = 6 - lastDayOfMonth; //현재 월의 마지막 날 이후의 요일 수

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

export default monthList;
