/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const textStyle = css`
	color: #a15fff;
`;

const Home = () => {
	return (
		<div>
			<h1 css={textStyle}>Home</h1>
			<nav>
				<ul>
					<li>
						<Link to="/schedule" css={textStyle}>
							개인근무일정표
						</Link>
					</li>
					<li>
						<Link to="/wage" css={textStyle}>
							급여확인
						</Link>
					</li>
					<li>
						<Link to="/profile" css={textStyle}>
							내프로필
						</Link>
					</li>
					<li>
						<Link to="/correction" css={textStyle}>
							근무정정신청
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Home;
