/** @jsxImportSource @emotion/react */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import Schedule from '@/pages/Schedule/Schedule';
import ScheduleDetail from '@/pages/Schedule/ScheduleDetail';
import Wage from '@/pages/Wage/Wage';
import WageCheck from '@/pages/Wage/WageCheck/WageCheck';
import WageCheckDetail from '@/pages/Wage/WageCheck/WageCheckDetail';
import Correction from '@/pages/Wage/Correction/Correction';
import CorrectionDetail from '@/pages/Wage/Correction/CorrectionDetail';
import Profile from '@/pages/Profile';
import CorrectionRequest from '@/pages/Wage/Correction/CorrectionRequest.tsx';
import GlobalStyles from '@/styles/GlobalStyles.tsx';
import Layout from '@/components/Layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'schedule', element: <Schedule /> },
			{ path: 'schedule/:id', element: <ScheduleDetail /> },
			{
				path: 'wage',
				element: <Wage />,
				children: [
					{ path: 'check', element: <WageCheck /> },
					{ path: 'correction', element: <Correction /> },
				],
			},
			{ path: 'wage/check/:id', element: <WageCheckDetail /> },
			{ path: 'wage/correction/create', element: <CorrectionRequest /> },
			{ path: 'wage/correction/:id', element: <CorrectionDetail /> },
			{ path: 'profile', element: <Profile /> },
		],
	},
]);

const App = () => (
	<>
		<GlobalStyles />
		<RouterProvider router={router} />
	</>
);

export default App;
