/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';

const WageCheckDetail = () => {
	const { id: wageId } = useParams<{ id: string }>();
	return <>Wage Detail Page for ID: {wageId}</>;
};

export default WageCheckDetail;
