import { useState, Suspense, startTransition } from 'react';
import { useQuery } from 'react-query';
import ControlMonth from '@/components/Wage/ControlMonth';
import SalaryCard from '@/components/Wage/SalaryCard';
import WorkHistory from '@/components/Wage/WorkHistory';
import getPersonalWage from '@/api/work/getPersonalWage';
import getOfficialWage from '@/api/work/getOfficialWage';
import Loading from '@/components/Loading';

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
		{ suspense: true },
	);

	const { data: officialWageData, error: officialWageError } = useQuery(
		['officialWage', year, month],
		() => fetchOfficialWage(year, month),
		{ suspense: true },
	);

	const handleMonthChange = (newYear: number, newMonth: number) => {
		startTransition(() => {
			setYear(newYear);
			setMonth(newMonth);
		});
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
				<>
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
					<Suspense fallback={<Loading />}>
						<WorkHistory year={year} month={month} />
					</Suspense>
				</>
			</Suspense>
		</>
	);
};

export default WageCheck;
