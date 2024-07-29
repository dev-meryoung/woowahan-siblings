import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import ScheduleDetail from './pages/ScheduleDetail';
import Wage from './pages/Wage';
import WageDetail from './pages/WageDetail';
import Correction from './pages/Correction';
import CorrectionDetail from './pages/CorrectionDetail';
import Profile from './pages/Profile';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'schedule',
		element: <Schedule />,
	},
	{
		path: 'schedule/:id',
		element: <ScheduleDetail />,
	},
	{
		path: 'wage',
		element: <Wage />,
	},
	{
		path: 'wage/:id',
		element: <WageDetail />,
	},
	{
		path: 'correction',
		element: <Correction />,
	},
	{
		path: 'correction/:id',
		element: <CorrectionDetail />,
	},
	{
		path: 'profile',
		element: <Profile />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
