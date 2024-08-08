import styled from '@emotion/styled';

interface ISalaryCardProps {
	title: string;
	wagecount: number;
	workinghours: number;
	iconSrc?: string;
}

const SalaryCard = ({ title, wagecount, workinghours, iconSrc }: ISalaryCardProps) => {
	return (
		<Card>
			<TextContainer>
				<Title>{title}</Title>
				<WageCount>{wagecount.toLocaleString()}원</WageCount>
				<WorkingHours>근무시간 | {workinghours}시간</WorkingHours>
			</TextContainer>
			<IconContainer>{iconSrc && <img src={iconSrc} alt="icon" />}</IconContainer>
		</Card>
	);
};

const Card = styled.div`
	display: flex;
	background-color: #ffc700;
	border-radius: 10px;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 20px;
	color: white;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 14px;
	font-weight: bold;
`;

const WageCount = styled.div`
	font-size: 24px;
	font-weight: bold;
	margin-top: 5px;
`;

const WorkingHours = styled.div`
	font-size: 12px;
	margin-top: 5px;
`;

const IconContainer = styled.div`
	width: 84px;
	height: 84px;

	img {
		width: 100%;
		height: 100%;
	}
`;

export default SalaryCard;
