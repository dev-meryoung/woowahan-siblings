import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IControlDateProps } from '@/interfaces/calendar';
import { fontSize } from '@/constants/font';
import IconButton from '@/components/IconButton';
import styled from '@emotion/styled';

const ControlDate = ({ nowDate, setNowDate }: IControlDateProps) => {
	const changeMonth = (month: number) => {
		setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + month, 1));
	};

	return (
		<Container>
			<span>{nowDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
			<ButtonContainer>
				<IconButton
					IconComponent={ChevronLeft}
					shape="line"
					onClick={() => changeMonth(-1)}
				/>
				<IconButton
					IconComponent={ChevronRight}
					shape="line"
					onClick={() => changeMonth(1)}
				/>
			</ButtonContainer>
		</Container>
	);
};

export default ControlDate;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;

	span {
		font-size: ${fontSize.lg};
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
