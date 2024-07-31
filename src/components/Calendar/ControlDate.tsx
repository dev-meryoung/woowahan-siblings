import { IControlDateProps } from '../../interfaces/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ControlDate = ({ nowDate, setNowDate }: IControlDateProps) => {
	const changeMonth = (month: number) => {
		setNowDate(new Date(nowDate.getFullYear(), nowDate.getMonth() + month, 1));
	};

	return (
		<div>
			<span>{nowDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
			<ChevronLeft onClick={() => changeMonth(-1)} />
			<ChevronRight onClick={() => changeMonth(1)} />
		</div>
	);
};

export default ControlDate;
