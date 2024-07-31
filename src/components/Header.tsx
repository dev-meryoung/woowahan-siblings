/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import logo from '@/assets/logo.svg';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isDeepPage = useMemo(() => {
		const mainPages = ['/schedule', '/wage/check', '/home', '/profile'];
		return !mainPages.includes(location.pathname) && location.pathname !== '/';
	}, [location.pathname]);

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<header css={headerStyle}>
			{isDeepPage ? (
				<ChevronLeft css={iconStyle} onClick={handleBackClick} />
			) : (
				<h1><img src={logo} alt="logo" css={logoStyle} /></h1>
			)}
		</header>
	);
};

export default Header;

const headerStyle = css`
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 20px;
`;

const logoStyle = css`
	height: 23px;
`;

const iconStyle = css`
	width: 26px;
	height: 26px;
	cursor: pointer;
	stroke-width: 1.4;
`;
