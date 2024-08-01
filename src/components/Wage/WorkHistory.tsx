/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { Timestamp } from 'firebase/firestore';
import workHistoryData, { IWorkHistoryItem } from '@/components/Wage/workHistoryData';

const formatTimestamp = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const WorkHistory = () => {
	const [visibleItems, setVisibleItems] = useState(8);

	const handleLoadMore = () => {
		setVisibleItems((prevVisibleItems) => prevVisibleItems + 1);
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
				<MoreButton onClick={handleLoadMore}>더보기</MoreButton>
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

const MoreButton = styled.button`
	width: 100%;
	padding: 10px;
	background-color: #f2f3f6;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;
export default WorkHistory;
