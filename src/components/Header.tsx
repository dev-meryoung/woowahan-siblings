/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, WalletMinimal, User } from 'lucide-react';
import { colors } from '@/constants/colors';
import { INavItemProps } from '@/interfaces/INavItemProps';

const Header = ({ css }: { css?: SerializedStyles }) => {
	const location = useLocation();

	return (
		<header css={[headerStyle, css]}>
			<nav css={navStyle}>
				<ul css={navListStyle}>
					<NavItem
						to="/"
						icon={<Home style={iconStyle(location.pathname === '/')} />}
						label="홈"
						isActive={location.pathname === '/'}
					/>
					<NavItem
						to="/schedule"
						icon={<Calendar style={iconStyle(location.pathname === '/schedule')} />}
						label="일정표"
						isActive={location.pathname === '/schedule'}
					/>
					<NavItem
						to="/wage"
						icon={<WalletMinimal style={iconStyle(location.pathname === '/wage')} />}
						label="급여"
						isActive={location.pathname === '/wage'}
					/>
					<NavItem
						to="/profile"
						icon={<User style={iconStyle(location.pathname === '/profile')} />}
						label="프로필"
						isActive={location.pathname === '/profile'}
					/>
				</ul>
			</nav>
		</header>
	);
};

const NavItem = ({ to, icon, label, isActive }: INavItemProps) => (
	<li css={navItemStyle}>
		<Link to={to} css={linkStyle(isActive)}>
			<div>{icon}</div>
			<span css={linkTextStyle(isActive)}>{label}</span>
		</Link>
	</li>
);

export default Header;

const headerStyle = css`
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	height: 60px;
	background-color: ${colors.white};
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const navStyle = css`
	display: flex;
`;

const navListStyle = css`
	display: flex;
	gap: 54px;
	list-style: none;
	padding: 0;
	margin: 0;
`;

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

const iconStyle = (isActive: boolean) => ({
	width: '26px',
	height: '26px',
	strokeWidth: 1.4,
	color: isActive ? colors.black : colors.gray,
});

const linkTextStyle = (isActive: boolean) => css`
	font-size: 14px;
	color: ${isActive ? colors.black : colors.gray};
`;
