import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PersonalWorkSchedule from './pages/PersonalWorkSchedule';
import PersonalWorkScheduleDetail from './pages/PersonalWorkScheduleDetail';
import WageVerification from './pages/WageVerification';
import WageVerificationDetail from './pages/WageVerificationDetail';
import WorkScheduleCorrectionRequest from './pages/WorkScheduleCorrectionRequest';
import WorkScheduleCorrectionRequestDetail from './pages/WorkScheduleCorrectionRequestDetail';
import MyProfile from './pages/MyProfile';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/personal-work-schedule" element={<PersonalWorkSchedule />} />
				<Route
					path="/personal-work-schedule-detail"
					element={<PersonalWorkScheduleDetail />}
				/>
				<Route path="/wage-verification" element={<WageVerification />} />
				<Route path="/wage-verification-detail" element={<WageVerificationDetail />} />
				<Route
					path="/work-schedule-correction-request"
					element={<WorkScheduleCorrectionRequest />}
				/>
				<Route
					path="/work-schedule-correction-request-detail"
					element={<WorkScheduleCorrectionRequestDetail />}
				/>
				<Route path="/my-profile" element={<MyProfile />} />
			</Routes>
		</Router>
	);
}

export default App;
