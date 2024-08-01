/** @jsxImportSource @emotion/react */
import ControlMonth from '@/components/Wage/ControlMonth';
import SalaryCard from '@/components/Wage/SalaryCard';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';

const WageCheck = () => {
	const wages = [1, 2, 3];
	return (
		<>
			<ControlMonth />
			<SalaryCard
				title="개인근무 일정표에 따른 예상 급여액"
				wagecount={925440}
				workinghours={96}
				icon={<FaCalendarAlt />}
			/>
			<SalaryCard
				title="공식 근무 스케줄에 따른 예상 급여액"
				wagecount={1025440}
				workinghours={104}
				icon={<FaHome />}
			/>
			<ul>
				{wages.map((id) => (
					<li key={id}>
						<Link to={`${id}`}>Wage Detail {id}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default WageCheck;
