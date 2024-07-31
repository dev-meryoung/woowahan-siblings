/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useMemo } from 'react';
import logo from '@/assets/logo.svg';

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
		<HeaderContainer>
			{isDeepPage ? (
				<ChevronLeft css={iconStyle} onClick={handleBackClick} />
			) : (
				<h1>
					<Logo src={logo} alt="logo" />
				</h1>
			)}
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.header`
	height: 52px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 20px;
`;

const Logo = styled.img`
	height: 23px;
`;

const iconStyle = css`
	width: 26px;
	height: 26px;
	cursor: pointer;
	stroke-width: 1.4;
`;
