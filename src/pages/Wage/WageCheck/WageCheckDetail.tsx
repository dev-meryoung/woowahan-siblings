/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import workHistoryData from '@/components/Wage/workHistoryData';
import Divider from '@/components/Divider';
import { Timestamp } from 'firebase/firestore';

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

	return (
		<Container>
			<Title>급여 상세 내역</Title>
			<DetailRow>
				<Value>{item.workPlace}</Value>
			</DetailRow>
			<DetailRow>
				<Label>{item.amount}원</Label>
			</DetailRow>
			<Divider />
			<DetailRow>
				<Label>근무일</Label>
				<Value>{formatDate(item.date)}</Value>
			</DetailRow>
			<DetailRow>
				<Label>근무 시간</Label>
				<Value>{item.workingTimes}</Value>
			</DetailRow>
			<DetailRow>
				<Label>휴게 시간</Label>
				<Value>30분</Value>
			</DetailRow>
			<DetailRow>
				<Label>시급</Label>
				<Value>{(item.amount / 4.5).toLocaleString()}원</Value>
			</DetailRow>
		</Container>
	);
};

const Container = styled.div`
	padding: 20px;
`;

const Title = styled.h2`
	font-size: 24px;
	margin-bottom: 20px;
`;

const DetailRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
`;

const Label = styled.div`
	font-weight: bold;
`;

const Value = styled.div`
	text-align: right;
`;

export default WageCheckDetail;
