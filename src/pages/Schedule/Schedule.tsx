import Loading from '@/components/Loading';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';
const Calendar = lazy(() => import('@/components/common/Calendar/Calendar'));

const Schedule = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Container>
				<Title>개인근무 일정표</Title>
				<Calendar isOfficial={false} />
			</Container>
		</Suspense>
	);
};

export default Schedule;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 20px 0 60px 0;
`;

const Title = styled.span`
	font-size: ${fontSize.xl};
	padding: 0 20px;
	font-weight: 600;
`;
