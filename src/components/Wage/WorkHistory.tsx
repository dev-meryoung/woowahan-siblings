/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Timestamp } from 'firebase/firestore';
import workHistoryData, { IWorkHistoryItem } from '@/components/Wage/workHistoryData';
import Button from '../Button';

const formatTimestamp = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const WorkHistory = () => {
	const [visibleItems, setVisibleItems] = useState(8);

	const handleLoadMore = () => {
		setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
	};

	return (
		<Container>
			<h2>급여 내역</h2>
			{workHistoryData.slice(0, visibleItems).map((item: IWorkHistoryItem, index: number) => (
				<HistoryItem key={index}>
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

const HistoryItem = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

const Date = styled.div`
	font-size: 14px;
	font-weight: bold;
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
