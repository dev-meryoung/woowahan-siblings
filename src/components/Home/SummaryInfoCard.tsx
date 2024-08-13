import { useState, useEffect, useCallback, useMemo } from 'react';
import getOfficialWage from '@/api/work/getOfficialWage';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import characterCheese from '@/assets/character_cheese.svg';
import styled from '@emotion/styled';

interface IWageDataProps {
	totalWorkHour: number;
	totalWage: number;
}

const SummaryInfoCard = () => {
	const [wageData, setWageData] = useState<IWageDataProps | null>(null);
	const [error, setError] = useState<string | null>(null);

	const dateInfo = useMemo(() => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const monthString = month.toString().padStart(2, '0');
		return { year, month, monthString };
	}, []);

	const fetchWageData = useCallback(async () => {
		setError(null);
		try {
			const data = await getOfficialWage(dateInfo.year, dateInfo.month);
			setWageData(data);
		} catch (error) {
			setError('급여 정보를 불러오는 데 실패했습니다');
		}
	}, [dateInfo.year, dateInfo.month]);

	useEffect(() => {
		fetchWageData();
	}, [fetchWageData]);

	if (error) return <p>{error}</p>;
	if (!wageData) return <p>급여정보가 없습니다.</p>;

	return (
		<SummaryCard>
			<SummaryCardContainer>
				<FirstSection>
					<p>
						공식 근무 스케줄 | {dateInfo.year}년 {dateInfo.monthString}월
					</p>
					<p>근무 시간 | {wageData.totalWorkHour}시간</p>
				</FirstSection>
				<SecondSection>
					<p>예상 급여액</p>
					<p>{wageData.totalWage.toLocaleString()}원</p>
				</SecondSection>
			</SummaryCardContainer>
			<img src={characterCheese} alt="치즈캐릭터" />
		</SummaryCard>
	);
};

export default SummaryInfoCard;

const SummaryCard = styled.div`
	margin: 20px 20px 40px;
	padding: 16px;
	height: 150px;
	display: flex;
	justify-content: space-between;
	border-radius: 8px;
	color: ${colors.white};
	background-color: ${colors.primaryYellow};

	img {
		height: 100%;
	}
`;

const SummaryCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const FirstSection = styled.div`
	font-weight: ${fontWeight.semiBold};
	font-size: ${fontSize.sm};
`;

const SecondSection = styled.div`
	font-weight: ${fontWeight.bold};
	p:nth-of-type(2) {
		font-size: ${fontSize.xxl};
	}
`;
