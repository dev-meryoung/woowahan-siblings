import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const WageCheckDetail = () => {
	const location = useLocation();
	const { item } = location.state || {};

	if (!item) {
		return <Container>잘못된 접근입니다.</Container>;
	}

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
	};

	const extractWorkingTimes = (workingTimes: string | string[]) => {
		const time = Array.isArray(workingTimes)
			? workingTimes[0].split('|')[0].trim()
			: workingTimes.split('|')[0].trim();
		switch (time) {
			case 'open':
				return '오픈';
			case 'middle':
				return '미들';
			case 'close':
				return '마감';
			default:
				return time;
		}
	};

	return (
		<Container>
			<HeaderWrapper>
				<Title>급여 상세 내역</Title>
				<WorkPlaceRow>
					<WorkValue>강남점</WorkValue>
				</WorkPlaceRow>
				<WageRow>
					<WageLabel>{(item.workingTimes.length * 45135).toLocaleString()}원</WageLabel>
				</WageRow>
			</HeaderWrapper>
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
					<Value>{(10030).toLocaleString()}원</Value>
				</DetailRow>
			</DetailWrapper>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderWrapper = styled.div`
	padding: 20px;
	flex: 0 0 auto;
`;

const DetailWrapper = styled.div`
	padding: 20px;
	flex: 1 1 auto;
`;

const Title = styled.h2`
	font-size: ${fontSize.xxl};
	margin-bottom: 40px;
`;

const DetailRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	flex-grow: 1;
`;

const WageRow = styled.div`
	padding: 10px 0;
	font-size: ${fontSize.lg};
	font-weight: bold;
`;

const WorkPlaceRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	font-size: ${fontSize.lg};
`;

const Label = styled.div`
	font-weight: 600;
	font-size: ${fontSize.lg};
`;

const WageLabel = styled.div`
	font-weight: 600;
	font-size: 32px;
`;

const Value = styled.div`
	text-align: right;
	font-weight: bold;
	font-size: ${fontSize.lg};
`;

const WorkValue = styled.div`
	text-align: right;
	font-weight: bold;
`;

export default WageCheckDetail;
