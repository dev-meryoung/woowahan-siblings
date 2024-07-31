/** @jsxImportSource @emotion/react */
import WageTab from '@/components/WageTab';
import { Outlet } from 'react-router-dom';

const Wage = () => {
	return (
		<>
			<div>
				<WageTab />
				<Outlet />
			</div>
		</>
	);
};

export default Wage;
