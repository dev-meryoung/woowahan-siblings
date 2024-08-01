/** @jsxImportSource @emotion/react */

import Divider from '@/components/Divider';
import WageTab from '@/components/Wage/WageTab';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

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
