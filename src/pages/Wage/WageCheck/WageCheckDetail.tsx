/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import workHistoryData from '@/components/Wage/workHistoryData';
import Divider from '@/components/Divider';
import { Timestamp } from 'firebase/firestore';
import { fontSize } from '@/constants/font';

const WageCheckDetail = () => {
	const { id } = useParams<{ id: string }>();

	if (id === undefined) {
		return <Container>잘못된 접근입니다.</Container>;
	}

	const item = workHistoryData[parseInt(id, 10)];

	if (!item) {
		return <Container>해당 항목을 찾을 수 없습니다.</Container>;
	}

	const formatDate = (timestamp: Timestamp) => {
		const date = timestamp.toDate();
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	const extractWorkingTimes = (workingTimes: string) => {
		return workingTimes.split('|')[0].trim();
	};

	return (
		<Container>
			<HeaderWrapper>
				<Title>급여 상세 내역</Title>
				<WorkPlaceRow>
					<Value>{item.workPlace}</Value>
				</WorkPlaceRow>
				<WageRow>
					<Label>{item.amount.toLocaleString()}원</Label>
				</WageRow>
			</HeaderWrapper>
			<Divider />
			<DetailWrapper>
				<DetailRow>
					<Label>근무일</Label>
					<Value>{formatDate(item.date)}</Value>
				</DetailRow>
				<DetailRow>
					<Label>근무 시간</Label>
					<Value>{extractWorkingTimes(item.workingTimes)}</Value>
				</DetailRow>
				<DetailRow>
					<Label>휴게 시간</Label>
					<Value>30분</Value>
				</DetailRow>
				<DetailRow>
					<Label>시급</Label>
					<Value>{(item.amount / 4.5).toLocaleString()}원</Value>
				</DetailRow>
			</DetailWrapper>
		</Container>
	);
};

const Container = styled.div`
	padding: 20px;
`;

const HeaderWrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const DetailWrapper = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.h2`
	font-size: 32px;
	margin-bottom: 40px;
`;

const DetailRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
`;
const WageRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	margin-bottom: 20px;
	font-size: 30px;
	font-weight: bold;
`;
const WorkPlaceRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	font-size: ${fontSize.xl};
`;

const Label = styled.div`
	margin-bottom: 20px;
	font-weight: 600;
`;

const Value = styled.div`
	text-align: right;
	font-weight: bold;
`;

export default WageCheckDetail;
