/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Menu from '@/components/Menu';

const Layout = () => (
	<div css={layoutContainerStyle}>
		<Header />
		<Content />
		<Menu css={menuStyle} />
	</div>
);

export default Layout;

const layoutContainerStyle = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 430px;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const menuStyle = css`
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
