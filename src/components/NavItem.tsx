/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { INavItemProps } from '@/interfaces/INavItemProps';
import { colors } from '@/constants/colors';

const NavItem = ({ to, icon, label, isActive }: INavItemProps) => (
	<li css={navItemStyle}>
		<Link to={to} css={linkStyle(isActive)}>
			<div css={iconWrapperStyle}>{icon}</div>
			<span css={linkTextStyle(isActive)}>{label}</span>
		</Link>
	</li>
);

export default NavItem;

const navItemStyle = css`
	display: flex;
	align-items: center;
`;

const linkStyle = (isActive: boolean) => css`
	display: flex;
	align-items: center;
	flex-direction: column;
	color: ${isActive ? colors.black : colors.gray};
	text-decoration: none;
	&:hover {
		color: ${isActive ? colors.black : colors.gray};
	}
`;

const iconWrapperStyle = css`
	width: 26px;
	height: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const linkTextStyle = (isActive: boolean) => css`
	font-size: 12px;
	color: ${isActive ? colors.black : colors.gray};
`;
