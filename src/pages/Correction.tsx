/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const textStyle = css`
	color: #62bcff;
`;

const Correction = () => {
	const corrections = [1, 2, 3, 4, 7];
	return (
		<div>
			<h1 css={textStyle}>Correction Page</h1>
			<ul>
				{corrections.map((id) => (
					<li key={id}>
						<Link to={`/correction/${id}`} css={textStyle}>
							Correction Detail {id}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Correction;
