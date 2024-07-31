import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { INavItemProps } from '@/interfaces/INavItemProps';
import { colors } from '@/constants/colors';

const NavItem = ({ to, icon, label, isActive }: INavItemProps) => (
	<NavItemContainer>
		<StyledLink to={to} isActive={isActive}>
			<IconWrapper>{icon}</IconWrapper>
			<LinkText isActive={isActive}>{label}</LinkText>
		</StyledLink>
	</NavItemContainer>
);

export default NavItem;

const NavItemContainer = styled.li`
	display: flex;
	align-items: center;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
	display: flex;
	align-items: center;
	flex-direction: column;
	color: ${({ isActive }) => (isActive ? colors.black : colors.gray)};
	text-decoration: none;
	&:hover {
		color: ${({ isActive }) => (isActive ? colors.black : colors.gray)};
	}
`;

const IconWrapper = styled.div`
	width: 26px;
	height: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LinkText = styled.span<{ isActive: boolean }>`
	font-size: 12px;
	color: ${({ isActive }) => (isActive ? colors.black : colors.gray)};
`;
