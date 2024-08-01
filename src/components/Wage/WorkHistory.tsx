/** @jsxImportSource @emotion/react */
import workHistoryData, { IWorkHistoryItem } from '@/components/Wage/workHistoryData';
import styled from '@emotion/styled';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const formatTimestamp = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	return `${(date.getMonth() + 1).toString().padStart(2, '0')}. ${date.getDate().toString().padStart(2, '0')}`;
};

const WorkHistory = () => {
	const [visibleItems, setVisibleItems] = useState(8);
	const navigate = useNavigate();

	const handleLoadMore = () => {
		setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
	};

	const handleItemClick = (index: number) => {
		navigate(`/wage/check/${index}`);
	};

	return (
		<Container>
			<Title>급여 내역</Title>
			{workHistoryData.slice(0, visibleItems).map((item: IWorkHistoryItem, index: number) => (
				<HistoryItem key={index} onClick={() => handleItemClick(index)}>
					<Date>{formatTimestamp(item.date)}</Date>
					<Details>
						<div>{item.workPlace}</div>
						<div>{item.workingTimes}</div>
					</Details>
					<Amount>{item.amount.toLocaleString()}원</Amount>
				</HistoryItem>
			))}
			{visibleItems < workHistoryData.length && (
				<Button
					label="더보기"
					onClick={handleLoadMore}
					size="normal"
					theme="primary"
					buttonWidth="100%"
				/>
			)}
		</Container>
	);
};

const Container = styled.div`
	padding: 20px;
	overflow: auto;
`;

const Title = styled.div`
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 10px;
`;

const HistoryItem = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Date = styled.div`
	font-size: 14px;
	font-weight: bold;
	color: #8b95a1;
`;

const Details = styled.div`
	flex: 1;
	margin-left: 10px;
`;

const Amount = styled.div`
	font-size: 14px;
	font-weight: bold;
`;

export default WorkHistory;
