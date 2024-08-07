import ControlMonth from '@/components/Wage/ControlMonth';
import SalaryCard from '@/components/Wage/SalaryCard';
import { Suspense, lazy, useState } from 'react';
import { useQuery } from 'react-query';
import getOfficialWage from '@/api/work/getOfficialWage';
import getPersonalWage from '@/api/work/getPersonalWage';
import Loading from '@/components/Loading';

const WorkHistory = lazy(() => import('@/components/Wage/WorkHistory'));

const fetchPersonalWage = async (year: number, month: number) => {
	const wageData = await getPersonalWage(year, month);
	return wageData;
};

const fetchOfficialWage = async (year: number, month: number) => {
	const wageOfficialData = await getOfficialWage(year, month);
	return wageOfficialData;
};

const WageCheck = () => {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1);

	const { data: personalWageData, error: personalWageError } = useQuery(
		['personalWage', year, month],
		() => fetchPersonalWage(year, month),
	);

	const { data: officialWageData, error: officialWageError } = useQuery(
		['officialWage', year, month],
		() => fetchOfficialWage(year, month),
	);

	const handleMonthChange = (newYear: number, newMonth: number) => {
		setYear(newYear);
		setMonth(newMonth);
	};

	const getErrorMessage = (error: unknown): string => {
		if (error instanceof Error) {
			return error.message;
		}
		return 'An unknown error occurred';
	};

	if (personalWageError || officialWageError) {
		return (
			<div>
				Error:{' '}
				{personalWageError
					? getErrorMessage(personalWageError)
					: getErrorMessage(officialWageError)}
			</div>
		);
	}

	return (
		<>
			<ControlMonth onMonthChange={handleMonthChange} />
			<Suspense fallback={<Loading />}>
				<SalaryCard
					title="개인근무 일정표에 따른 예상 급여액"
					wagecount={personalWageData?.totalWage || 0}
					workinghours={personalWageData?.totalWorkHour || 0}
				/>
				<SalaryCard
					title="공식 근무 스케줄에 따른 예상 급여액"
					wagecount={officialWageData?.totalWage || 0}
					workinghours={officialWageData?.totalWorkHour || 0}
				/>
				<WorkHistory year={year} month={month} />
			</Suspense>
		</>
	);
};

export default WageCheck;
