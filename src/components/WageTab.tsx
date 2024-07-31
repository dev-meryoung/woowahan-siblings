/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

interface INavLinkProps {
	isActive: boolean;
}

const WageTab = () => {
	return (
		<StyledUl>
			<StyledNavLink to="check">
				{({ isActive }: INavLinkProps) => (
					<StyledLi className={isActive ? 'active' : ''}>급여 확인</StyledLi>
				)}
			</StyledNavLink>
			<StyledNavLink to="correction">
				{({ isActive }: INavLinkProps) => (
					<StyledLi className={isActive ? 'active' : ''}>정정 신청</StyledLi>
				)}
			</StyledNavLink>
		</StyledUl>
	);
};

const StyledUl = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 10px;
	border-radius: 5px;
`;

const StyledLi = styled.li`
	margin: 0;
	padding: 10px 20px;
	&:hover {
		background-color: #f2f3f6;
		border-radius: 5px;
	}
`;

const StyledNavLink = styled(NavLink)`
	text-decoration: none;
	color: #333;
	font-weight: bold;
	&:hover {
		color: black;
	}
	&.active {
		color: #ffc700;
	}
`;

export default WageTab;
