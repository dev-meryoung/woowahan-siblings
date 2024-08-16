import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import characterCheese from '@/assets/character_cheese.svg';
import styled from '@emotion/styled';

interface IWageDataProps {
	year: number;
	month: number;
	wagecount: number;
	workinghours: number;
}

const SummaryInfoCard = ({ year, month, wagecount, workinghours }: IWageDataProps) => {
	return (
		<SummaryCard>
			<SummaryCardContainer>
				<FirstSection>
					<p>
						공식 근무 스케줄 | {year}년 {month.toString().padStart(2, '0')}월
					</p>
					<p>근무 시간 | {workinghours}시간</p>
				</FirstSection>
				<SecondSection>
					<p>예상 급여액</p>
					<p>{wagecount.toLocaleString()}원</p>
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
