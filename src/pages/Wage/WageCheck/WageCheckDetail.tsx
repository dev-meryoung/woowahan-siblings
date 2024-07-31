/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';

const WageCheckDetail = () => {
	const { id: wageId } = useParams<{ id: string }>();
	return <div>Wage Detail Page for ID: {wageId}</div>;
};

export default WageCheckDetail;
