/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const textStyle = css`
	color: #b8ff79;
`;

const Wage = () => {
	const wages = [1, 2, 3];

	return (
		<div>
			<h1 css={textStyle}>Wage Page</h1>
			<ul>
				{wages.map((id) => (
					<li key={id}>
						<Link to={`/wage/${id}`} css={textStyle}>
							Wage Detail {id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Wage;
