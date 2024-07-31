import { IArrowButtonProps } from '@/interfaces/arrowButton';
import { ChevronLeft as ArrowLeft, ChevronRight as ArrowRight } from 'lucide-react';
import { colors } from '@/constants/colors';
import styled from '@emotion/styled';

export const LeftArrowButton = ({ onClick }: IArrowButtonProps) => {
	return <StyledChevronLeft onClick={onClick} />;
};

export const RightArrowButton = ({ onClick }: IArrowButtonProps) => {
	return <StyledChevronRight onClick={onClick} />;
};

const StyledChevronLeft = styled(ArrowLeft)`
	border-radius: 50px;
	border: 1px solid ${colors.lightestGray};
	color: ${colors.gray};
	padding: 5px;
	cursor: pointer;
	width: 24px;
	height: 24px;
`;

const StyledChevronRight = styled(ArrowRight)`
	border-radius: 50px;
	border: 1px solid ${colors.lightestGray};
	color: ${colors.gray};
	padding: 5px;
	cursor: pointer;
	width: 24px;
	height: 24px;
`;
