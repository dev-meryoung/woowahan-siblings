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

// prop 으로 콘텐츠 받기
// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
// import { ReactNode } from 'react';
//
// interface ContentProps {
//   children: ReactNode;
// }
//
// const Content = ({ children }: ContentProps) => (
//   <div css={contentStyle}>
//     {children}
//   </div>
// );
//
// export default Content;
//
// const contentStyle = css`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   overflow: auto;
// `;
