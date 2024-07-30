/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import 'normalize.css';

export const colors = {
	primaryYellow: '#FFC700',
	black: '#141414',
	darkestGray: '#333D4B',
	gray: '#8B95A1',
	lightGray: '#E3E5EB',
	lightestGray: '#F2F3F6',
	veryLightGray: '#FCFCFC',
	white: '#FFFFFF',
	afternoonPink: '#F39ACD',
	nightGreen: '#1DC18D',
};

const GlobalStyles = () => (
	<Global
		styles={css({
			'*': {
				margin: 0,
				padding: 0,
				boxSizing: 'border-box',
			},
			'html, body, #root': {
				height: '100%',
				fontFamily: 'Arial, sans-serif',
			},
			body: {
				lineHeight: 1.5,
				backgroundColor: colors.veryLightGray,
				color: colors.black,
			},
			'ol, ul': {
				listStyle: 'none',
			},
			a: {
				textDecoration: 'none',
				color: 'inherit',
			},
			table: {
				borderCollapse: 'collapse',
				borderSpacing: 0,
			},
		})}
	/>
);

export default GlobalStyles;
