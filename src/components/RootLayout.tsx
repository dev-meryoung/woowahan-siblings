/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const RootLayout = () => (
	<>
		<div css={contentStyle}>
			<Outlet />
		</div>
		<Header css={headerStyle} />
	</>
);

export default RootLayout;

const contentStyle = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

const headerStyle = css`
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	height: 60px;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
`;
