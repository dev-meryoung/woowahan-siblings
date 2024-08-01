/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from '@/stores/modalSlice';
import Modal from '@/components/Modal';

const Schedule = () => {
	const dispatch = useDispatch();
	const schedules = [1, 2];

	return (
		<>
			<h1>Schedule Page</h1>
			<ul>
				{schedules.map((id) => (
					<li key={id}>
						<Link to={`${id}`}>Schedule Detail {id}</Link>
					</li>
				))}
			</ul>
			<div>
				<button onClick={() => dispatch(openModal('add'))}>일정 추가</button>
				<button onClick={() => dispatch(openModal('view'))}>일정 조회</button>
				<button onClick={() => dispatch(openModal('edit'))}>일정 수정</button>
			</div>
			<Modal />
		</>
	);
};

export default Schedule;
