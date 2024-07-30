/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import 'normalize.css';
import { colors } from '@/constants/colors';

const GlobalStyles = () => (
	<Global
		styles={css`
			@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			html,
			body,
			#root {
				height: 100%;
				font-family:
					'Pretendard Variable',
					Pretendard,
					-apple-system,
					BlinkMacSystemFont,
					system-ui,
					Roboto,
					'Helvetica Neue',
					'Segoe UI',
					'Apple SD Gothic Neo',
					'Noto Sans KR',
					'Malgun Gothic',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					sans-serif;
				font-weight: 400;
				font-size: 14px;
				line-height: 1.4;
				letter-spacing: -0.14px;
				background-color: ${colors.white};
				color: ${colors.black};
			}
			ol,
			ul {
				list-style: none;
			}
			a {
				text-decoration: none;
				color: inherit;
			}
			table {
				border-collapse: collapse;
				border-spacing: 0;
			}
		`}
	/>
);

export default GlobalStyles;
