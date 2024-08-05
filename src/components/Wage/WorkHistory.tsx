import getOfficialWage from '@/api/work/getOfficialWage';
import Button from '@/components/common/Button/Button';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString: string) => {
	const [, month, day] = dateString.split('-').map(Number);
	return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
};

const formatWorkingTimes = (workingTimes: string | string[]) => {
	const workingTime = Array.isArray(workingTimes) ? workingTimes[0] : workingTimes;
	switch (workingTime) {
		case 'open':
			return '오픈(07:00~12:00) | 휴게 30분';
		case 'middle':
			return '미들(12:00~17:00) | 휴게 30분';
		case 'close':
			return '마감(17:00~22:00) | 휴게 30분';
		default:
			return workingTime;
	}
};

interface IWorkHistoryProps {
	year: number;
	month: number;
}

interface IOfficialWageItem {
	date: string;
	workingTimes: string | string[];
	isSub: boolean;
}

const WorkHistory = ({ year, month }: IWorkHistoryProps) => {
	const [visibleItems, setVisibleItems] = useState(8);
	const [officialWage, setOfficialWage] = useState<IOfficialWageItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const fetchOfficialWage = async (year: number, month: number) => {
		try {
			const data = await getOfficialWage(year, month);
			setOfficialWage(data.officialWage);
		} catch (error) {
			setError('Failed to fetch wage data');
		}
	};

	const handleLoadMore = () => {
		setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
	};

	const handleItemClick = (index: number) => {
		navigate(`/wage/check/${index}`);
	};

	useEffect(() => {
		fetchOfficialWage(year, month);
	}, [year, month]);

	return (
		<Container>
			<Title>급여 내역</Title>
			{error ? (
				<div>{error}</div>
			) : (
				<>
					{officialWage.slice(0, visibleItems).map((item, index: number) => (
						<HistoryItem key={index} onClick={() => handleItemClick(index)}>
							<Date>{formatDate(item.date)}</Date>
							<Details>
								<div>강남점</div>
								<span>{formatWorkingTimes(item.workingTimes)}</span>
							</Details>
							<Amount>{(item.workingTimes.length * 45135).toLocaleString()}원</Amount>
						</HistoryItem>
					))}
					{visibleItems < officialWage.length && (
						<Button
							label="더보기"
							onClick={handleLoadMore}
							size="normal"
							theme="primary"
							buttonWidth="100%"
						/>
					)}
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	padding: 20px;
	margin-bottom: 60px;
	overflow: auto;
`;

const Title = styled.div`
	font-size: ${fontSize.xxl};
	font-weight: 700;
	margin-bottom: 23px;
`;

const HistoryItem = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 26px;
	cursor: pointer;

	div {
		font-size: ${fontSize.lg};
	}

	span {
		font-size: ${fontSize.md};
		color: ${colors.gray};
	}
`;

const Date = styled.div`
	font-size: ${fontSize.lg};
	font-weight: bold;
	color: #8b95a1;
`;

const Details = styled.div`
	flex: 1;
	margin-left: 20px;
`;

const Amount = styled.div`
	font-size: 14px;
	font-weight: bold;
`;

export default WorkHistory;
