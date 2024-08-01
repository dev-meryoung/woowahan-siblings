/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import IconButton from '@/components/IconButton'; // IconButton 컴포넌트 임포트

const ControlMonth = () => {
	const [date, setDate] = useState(new Date());

	const handlePreviousMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
	};

	const handleNextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
	};

	const formatDate = (date: Date) => {
		return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
	};

	return (
		<CalendarContainer>
			<IconButton
				IconComponent={FaChevronLeft}
				shape="line"
				color="gray"
				size={24}
				onClick={handlePreviousMonth}
			/>
			<MonthDisplay>{formatDate(date)}</MonthDisplay>
			<IconButton
				IconComponent={FaChevronRight}
				shape="line"
				color="gray"
				size={24}
				onClick={handleNextMonth}
			/>
		</CalendarContainer>
	);
};

const CalendarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 20px;
`;

const MonthDisplay = styled.div`
	font-size: 24px;
	font-weight: bold;
`;

export default ControlMonth;
