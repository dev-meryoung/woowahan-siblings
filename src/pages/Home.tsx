import SummaryInfoCard from '@/components/Home/SummaryInfoCard';
import Calendar from '@/components/common/Calendar/Calendar';
import Title from '@/components/common/Title';
import styled from '@emotion/styled';
import useWageCheck from '@/hooks/useWageCheck';

const Home = () => {
	const { year, month, officialWageData, officialWageError, getErrorMessage } = useWageCheck();

	if (officialWageError) {
		return <div>Error: {getErrorMessage(officialWageError)}</div>;
	}

	return (
		<Container>
			<SummaryInfoCard
				year={year}
				month={month}
				wagecount={officialWageData?.totalWage || 0}
				workinghours={officialWageData?.totalWorkHour || 0}
			/>
			<Title title="공식 근무 스케줄" className="title" />
			<Calendar isOfficial={true} />
		</Container>
	);
};

export default Home;

const Container = styled.div`
	padding-bottom: 60px;
`;
