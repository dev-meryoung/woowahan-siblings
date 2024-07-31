/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const Content = () => (
	<div css={contentStyle}>
		<Outlet />
	</div>
);

export default Content;

const contentStyle = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: auto;
`;
