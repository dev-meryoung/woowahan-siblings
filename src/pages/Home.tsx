/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<nav>
				<ul>
					<li>
						<Link to="/">홈</Link>
					</li>
					<li>
						<Link to="/schedule">개인근무일정표</Link>
					</li>
					<li>
						<Link to="/wage/check">급여확인</Link>
					</li>
					<li>
						<Link to="/profile">내프로필</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Home;
