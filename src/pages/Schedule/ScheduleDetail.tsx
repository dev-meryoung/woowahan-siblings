/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';

const ScheduleDetail = () => {
	const { id: scheduleId } = useParams<{ id: string }>();
	return <div>Schedule Detail Page for ID: {scheduleId}</div>;
};

export default ScheduleDetail;
