import ControlMonth from '@/components/Wage/ControlMonth';
import SalaryCard from '@/components/Wage/SalaryCard';
import WorkHistory from '@/components/Wage/WorkHistory';
import getPersonalWage from '@/api/work/getPersonalWage';
import getOfficialWage from '@/api/work/getOfficialWage';
import { useEffect, useState } from 'react';

const WageCheck = () => {
	const [personalWage, setPersonalWage] = useState(0);
	const [workHours, setWorkHours] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [officialWage, setOfficialWage] = useState(0);
	const [officialWorkHours, setOfficialWorkHours] = useState(0);

	const fetchPersonalWage = async (year: number, month: number) => {
		try {
			const wageData = await getPersonalWage(year, month);
			setWorkHours(wageData.totalWorkHour);
			setPersonalWage(wageData.totalWage);
		} catch (error) {
			setError('Failed to fetch user wage');
		}
	};

	const fetchOfficialWage = async (year: number, month: number) => {
		try {
			const wageOfficialData = await getOfficialWage(year, month);
			setOfficialWorkHours(wageOfficialData.totalWorkHour);
			setOfficialWage(wageOfficialData.totalWage);
		} catch (error) {
			setError('Failed to fetch user wage');
		}
	};

	useEffect(() => {
		const currentDate = new Date();
		fetchPersonalWage(currentDate.getFullYear(), currentDate.getMonth() + 1);
		fetchOfficialWage(currentDate.getFullYear(), currentDate.getMonth() + 1);
	}, []);

	const handleMonthChange = (year: number, month: number) => {
		fetchPersonalWage(year, month);
		fetchOfficialWage(year, month);
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<ControlMonth onMonthChange={handleMonthChange} />
			<SalaryCard
				title="개인근무 일정표에 따른 예상 급여액"
				wagecount={personalWage}
				workinghours={workHours}
			/>
			<SalaryCard
				title="공식 근무 스케줄에 따른 예상 급여액"
				wagecount={officialWage}
				workinghours={officialWorkHours}
			/>
			<WorkHistory />
		</>
	);
};

export default WageCheck;
