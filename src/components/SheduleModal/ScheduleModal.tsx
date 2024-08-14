import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal, openModal } from '@/stores/modalSlice';
import ModalOverlay from '@/components/common/Modal/ModalOverlay';
import ModalFormComponent from '@/components/SheduleModal/ScheduleModalForm';
import ModalFooterComponent from '@/components/SheduleModal/ScheduleModalFooter';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalHeaderComponent from '@/components/common/Modal/ModalHeader';
import createPersonalSchedule from '@/api/schedule/createPersonalSchedule';
import updatePersonalSchedule from '@/api/schedule/updatePersonalSchedule';
import deletePersonalSchedule from '@/api/schedule/deletePersonalSchedule';
import { fetchSchedules } from '@/stores/scheduleSlice';
import { AppDispatch } from '@/stores/store';
import { convertDateToServerFormat } from '@/utils/dateUtils';

interface ISchedule {
	userId: string;
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memos: string[];
}

const DEFAULT_DATA = {
	wage: '10,030원',
	workTime: '선택',
	breakTime: '30분',
};

type TWorkingTimes = 'open' | 'middle' | 'close';

const validateFields = (fields: { [key: string]: string }) => {
	const errors: { [key: string]: boolean } = {};
	Object.keys(fields).forEach((key) => {
		if (!fields[key] || (key === 'workTime' && fields[key] === DEFAULT_DATA.workTime)) {
			errors[key] = true;
		}
	});
	return errors;
};

const ScheduleModal: React.FC<{
	schedules: ISchedule[];
	selectedSchedule: ISchedule | null;
	formattedDate: string;
}> = ({ schedules = [], selectedSchedule, formattedDate }) => {
	const dispatch = useDispatch<AppDispatch>();

	const { isOpen, content } = useSelector((state: RootState) => state.modal);
	const today = useMemo(() => new Date().toISOString().split('T')[0], []);

	const [defaultMemo, setDefaultMemo] = useState('');

	useEffect(() => {
		if (schedules.length > 0 && schedules[0].memos.length > 0) {
			setDefaultMemo(schedules[0].memos[0]);
		}
	}, [schedules]);

	const [formData, setFormData] = useState({
		workDate: convertDateToServerFormat(formattedDate) || today,
		wage: DEFAULT_DATA.wage,
		workTime: DEFAULT_DATA.workTime,
		breakTime: DEFAULT_DATA.breakTime,
		memo: defaultMemo,
		errors: {},
	});

	const updateFormData = (field: string, value: string) => {
		setFormData((prevData) => ({ ...prevData, [field]: value }));
	};

	const resetForm = useCallback(
		(schedule: ISchedule | null = null) => {
			if (schedule) {
				const formattedDate = new Date(schedule.workDate).toISOString().split('T')[0];
				setFormData({
					workDate: formattedDate,
					wage: DEFAULT_DATA.wage,
					workTime: DEFAULT_DATA.workTime,
					breakTime: DEFAULT_DATA.breakTime,
					memo: '',
					errors: {},
				});
			} else {
				const formattedDate = new Date(today).toISOString().split('T')[0];
				setFormData({
					workDate: formattedDate,
					wage: DEFAULT_DATA.wage,
					workTime: DEFAULT_DATA.workTime,
					breakTime: DEFAULT_DATA.breakTime,
					memo: '',
					errors: {},
				});
			}
		},
		[today],
	);

	const setFormValues = useCallback((schedule: ISchedule) => {
		const formattedDate = new Date(schedule.workDate).toISOString().split('T')[0];
		setFormData({
			workDate: formattedDate,
			wage: DEFAULT_DATA.wage,
			workTime: schedule.workTime,
			breakTime: DEFAULT_DATA.breakTime,
			memo: schedule.memos[0],
			errors: {},
		});
	}, []);

	useEffect(() => {
		if (!isOpen || content === 'add' || content === 'edit') {
			dispatch(
				fetchSchedules({
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					isOfficial: false,
				}),
			);
		}
	}, [isOpen, content, dispatch]);

	useEffect(() => {
		if (isOpen) {
			if (content === 'add' && schedules.length > 0) {
				resetForm(schedules[0]);
				setTimeout(() => updateFormData('workTime', DEFAULT_DATA.workTime), 0);
			} else if (selectedSchedule) {
				setFormValues(selectedSchedule);
			}
		}
	}, [isOpen, content, selectedSchedule, resetForm, setFormValues, schedules]);

	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				dispatch(closeModal());
				resetForm();
			}
		},
		[dispatch, resetForm],
	);

	const isFieldDisabled = useCallback((): boolean => content === 'view', [content]);

	const convertWorkTimeForFirestore = (workTime: string): TWorkingTimes => {
		switch (workTime) {
			case '오픈 (07:00~12:00)':
				return 'open';
			case '미들 (12:00~17:00)':
				return 'middle';
			case '마감 (17:00~22:00)':
				return 'close';
			default:
				throw new Error('Invalid work time');
		}
	};

	const handleAction = useCallback(
		async (actionType: 'save' | 'update' | 'delete') => {
			const fields = {
				workDate: formData.workDate,
				wage: formData.wage,
				workTime: formData.workTime,
				breakTime: formData.breakTime,
				memo: formData.memo,
			};
			const newErrors = validateFields(fields);
			setFormData((prevData) => ({ ...prevData, errors: newErrors }));

			if (Object.keys(newErrors).length === 0) {
				const workingTime: TWorkingTimes = convertWorkTimeForFirestore(formData.workTime);
				const serverFormattedDate = convertDateToServerFormat(formData.workDate);
				let success = false;

				if (actionType === 'save') {
					success = await createPersonalSchedule(
						serverFormattedDate,
						workingTime,
						formData.memo,
					);
				} else if (actionType === 'update') {
					const oldWorkingTime: TWorkingTimes = schedules[0].workTime as TWorkingTimes;
					success = await updatePersonalSchedule(
						serverFormattedDate,
						oldWorkingTime,
						workingTime,
						formData.memo,
					);
				} else if (actionType === 'delete') {
					success = await deletePersonalSchedule(serverFormattedDate, workingTime);
				}

				if (success) {
					dispatch(
						fetchSchedules({
							year: new Date(serverFormattedDate).getFullYear(),
							month: new Date(serverFormattedDate).getMonth() + 1,
							isOfficial: false,
						}),
					);
					dispatch(closeModal());
					resetForm();
				} else {
					console.error(`Failed to ${actionType} personal schedule`);
				}
			}
		},
		[formData, schedules, dispatch, resetForm],
	);

	const handleSave = () => handleAction('save');
	const handleUpdate = () => handleAction('update');
	const handleDelete = () => handleAction('delete');

	const handleEdit = useCallback(() => {
		dispatch(openModal('edit'));
	}, [dispatch]);

	const getTitle = useCallback(() => {
		switch (content) {
			case 'add':
				return '일정 추가';
			case 'edit':
				return '일정 수정';
			case 'view':
				return '일정 조회';
			default:
				return '';
		}
	}, [content]);

	return (
		<>
			{isOpen && (
				<ModalOverlay onClick={handleOverlayClick}>
					<ModalContent>
						<ModalHeaderComponent title={getTitle()} />
						<ModalFormComponent
							workDate={formData.workDate}
							wage={formData.wage}
							workTime={formData.workTime}
							breakTime={formData.breakTime}
							memo={formData.memo}
							isFieldDisabled={isFieldDisabled}
							setWorkDate={(value) => updateFormData('workDate', value)}
							setWage={(value) => updateFormData('wage', value)}
							setWorkTime={(value) => updateFormData('workTime', value)}
							setBreakTime={(value) => updateFormData('breakTime', value)}
							setMemo={(value) => updateFormData('memo', value)}
							content={content}
							errors={formData.errors}
						/>
						<ModalFooterComponent
							content={content}
							handleDelete={handleDelete}
							handleEdit={handleEdit}
							handleSave={content === 'edit' ? handleUpdate : handleSave}
							closeModal={() => {
								dispatch(closeModal());
							}}
						/>
					</ModalContent>
				</ModalOverlay>
			)}
		</>
	);
};

export default ScheduleModal;
