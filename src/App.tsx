import checkAuth from '@/api/auth/checkAuth';
import Layout from '@/layout/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Schedule from '@/pages/Schedule/Schedule';
import ScheduleDetail from '@/pages/Schedule/ScheduleDetail';
import Correction from '@/pages/Wage/Correction/Correction';
import CorrectionDetail from '@/pages/Wage/Correction/CorrectionDetail';
import CorrectionRequest from '@/pages/Wage/Correction/CorrectionRequest';
import Wage from '@/pages/Wage/Wage';
import WageCheck from '@/pages/Wage/WageCheck/WageCheck';
import WageCheckDetail from '@/pages/Wage/WageCheck/WageCheckDetail';
import GlobalStyles from '@/styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './components/NotFound';
import UnderConstruction from './pages/UnderConstruction';

export interface IPrivateRouteProps {
	element: JSX.Element;
}

const queryClient = new QueryClient();

// 로그인한 사용자만 접근할 수 있는 라우팅 페이지를 관리하기 위한 PrivateRoute
const PrivateRoute = ({ element }: IPrivateRouteProps) => {
	return checkAuth() ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <PrivateRoute element={<Home />} /> },
			{ path: 'schedule', element: <PrivateRoute element={<Schedule />} /> },
			{ path: 'schedule/:date', element: <PrivateRoute element={<ScheduleDetail />} /> },
			{
				path: 'wage',
				element: <PrivateRoute element={<Wage />} />,
				children: [
					{ path: 'check', element: <PrivateRoute element={<WageCheck />} /> },
					{ path: 'correction', element: <PrivateRoute element={<Correction />} /> },
				],
			},
			{ path: 'wage/check/:id', element: <PrivateRoute element={<WageCheckDetail />} /> },
			{
				path: 'wage/correction/create',
				element: <PrivateRoute element={<CorrectionRequest />} />,
			},
			{
				path: 'wage/correction/:id',
				element: <PrivateRoute element={<CorrectionDetail />} />,
			},
			{ path: 'profile', element: <PrivateRoute element={<Profile />} /> },
			{ path: 'login', element: <Login /> },
			{ path: 'guide', element: <UnderConstruction /> },
			{ path: 'customer-service', element: <UnderConstruction /> },
			{ path: 'notification-settings', element: <UnderConstruction /> },
			{ path: 'settings', element: <UnderConstruction /> },
		],
	},
	{ path: '*', element: <NotFoundPage /> },
]);

const App = () => (
	<>
		<GlobalStyles />
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</>
);

export default App;
