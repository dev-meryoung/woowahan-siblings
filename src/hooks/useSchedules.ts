import { useState, useEffect } from 'react';
import getOfficialSchedule from '@/api/schedule/getOfficialSchedule';
import getPersonalSchedule from '@/api/schedule/getPersonalSchedule';
import monthList from '@/utils/getMonthList';
import { Timestamp } from 'firebase/firestore';

export interface IScheduleProps {
	date: string;
	workingTimes: string[];
}

const useSchedules = (currentDate: Timestamp, isOfficial: boolean): IScheduleProps[] => {
	const [schedules, setSchedules] = useState<IScheduleProps[]>([]);

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const dates = monthList(currentDate);

				// 필요한 모든 년월 조합을 추출
				const yearMonths = [
					...new Set(
						dates.map((date) => {
							const today = date.toDate();
							return `${today.getFullYear()}-${today.getMonth() + 1}`;
						}),
					),
				];

				// 모든 필요한 데이터를 병렬로 가져옴
				const fetchedData = await Promise.all(
					yearMonths.map(async (yearMonth) => {
						const [year, month] = yearMonth.split('-').map(Number);
						if (isOfficial) {
							const { officialScheduleData } = await getOfficialSchedule(year, month);
							return officialScheduleData.map((schedule) => ({
								...schedule,
								date: `${year}-${month.toString().padStart(2, '0')}-${schedule.date.split('-')[2].padStart(2, '0')}`,
							}));
						} else {
							const { personalScheduleData } = await getPersonalSchedule(year, month);
							return personalScheduleData.map((schedule) => ({
								...schedule,
								date: `${year}-${month.toString().padStart(2, '0')}-${schedule.date.split('-')[2].padStart(2, '0')}`,
							}));
						}
					}),
				);

				const allData = fetchedData.flat();

				setSchedules(allData);
			} catch (error) {
				setSchedules([]);
			}
		};

		fetchSchedules();
	}, [currentDate, isOfficial]);

	return schedules;
};

export default useSchedules;
