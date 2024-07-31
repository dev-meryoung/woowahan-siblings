/** @jsxImportSource @emotion/react */
import { Link, Outlet } from 'react-router-dom';

const Wage = () => {
	return (
		<>
			<h1>Wage Page</h1>
			<div>
				<ul>
					<li>
						<Link to="check">급여 확인</Link>
					</li>
					<li>
						<Link to="correction">정정 신청</Link>
					</li>
				</ul>
				<Outlet />
			</div>
		</>
	);
};

export default Wage;
