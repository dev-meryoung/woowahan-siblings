/** @jsxImportSource @emotion/react */

import Divider from '@/components/Divider';
import WageTab from '@/components/Wage/WageTab';
import { Outlet } from 'react-router-dom';

const Wage = () => {
	return (
		<>
			<div>
				<WageTab />
				<Divider />
				<Outlet />
			</div>
		</>
	);
};

export default Wage;
