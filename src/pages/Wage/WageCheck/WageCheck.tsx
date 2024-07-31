/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';

const WageCheck = () => {
	const wages = [1, 2, 3];
	return (
		<>
			<ul>
				{wages.map((id) => (
					<li key={id}>
						<Link to={`${id}`}>Wage Detail {id}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default WageCheck;
