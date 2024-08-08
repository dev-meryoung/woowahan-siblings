import Loading from '@/components/Loading';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';

const SummaryInfoCard = lazy(() => import('@/components/Home/SummaryInfoCard'));
const Calendar = lazy(() => import('@/components/common/Calendar/Calendar'));

const Home = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Container>
				<SummaryInfoCard />
				<Title>공식 근무 스케줄</Title>
				<Calendar isOfficial={true} />
			</Container>
		</Suspense>
	);
};

export default Home;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-bottom: 60px;
`;

const Title = styled.span`
	font-size: ${fontSize.xl};
	padding: 0 20px;
	font-weight: 600;
`;
