/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/constants/colors';

const Header = () => (
	<header css={headerStyle}>
		<h2>우아한 치즈케잌</h2>
	</header>
);

export default Header;

const headerStyle = css`
	height: 52px;
	background-color: ${colors.primaryYellow};
	display: flex;
	align-items: center;
	justify-content: center;
`;
