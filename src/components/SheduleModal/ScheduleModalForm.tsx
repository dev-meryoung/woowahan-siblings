import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/stores/modalSlice';
import { addSchedule, updateSchedule, deleteSchedule } from '@/data/mockdata';

const ModalFormComponent = ({
	workDate,
	wage,
	workTime,
	breakTime,
	memo,
	isFieldDisabled,
	setWorkDate,
	setWage,
	setWorkTime,
	setBreakTime,
	setMemo,
	content,
}: {
	workDate: string;
	wage: string;
	workTime: string;
	breakTime: string;
	memo: string;
	isFieldDisabled: (field: string) => boolean;
	setWorkDate: (value: string) => void;
	setWage: (value: string) => void;
	setWorkTime: (value: string) => void;
	setBreakTime: (value: string) => void;
	setMemo: (value: string) => void;
	content: 'add' | 'edit' | 'view' | null;
}) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

	const validateFields = () => {
		const newErrors: { [key: string]: boolean } = {};
		if (!workDate) newErrors.workDate = true;
		if (!wage) newErrors.wage = true;
		if (!workTime) newErrors.workTime = true;
		if (!breakTime) newErrors.breakTime = true;
		if (!memo) newErrors.memo = true;
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = () => {
		if (validateFields()) {
			if (content === 'edit') {
				updateSchedule('1', { workTime, memo }); // userId를 실제 값으로 변경 필요
			} else if (content === 'add') {
				addSchedule({ workDate, wage, workTime, breakTime, memo });
			}
			dispatch(closeModal());
		}
	};

	const handleDelete = () => {
		deleteSchedule('1'); // userId를 실제 값으로 변경 필요
		dispatch(closeModal());
	};

	const handleEdit = () => {
		dispatch(openModal('edit'));
	};

	return (
		<AddScheduleForm>
			<FormGroup>
				<label>근무일</label>
				<StyledInput
					value={workDate}
					disabled={isFieldDisabled('workDate') || content === 'view'}
					onChange={(e) => setWorkDate(e.target.value)}
					className={errors.workDate ? 'error' : ''}
				/>
			</FormGroup>
			<FormGroup>
				<label>시급</label>
				<StyledInput
					type="text"
					value={wage}
					disabled={isFieldDisabled('wage') || content === 'view'}
					onChange={(e) => setWage(e.target.value)}
					className={errors.wage ? 'error' : ''}
				/>
			</FormGroup>
			<FormGroup>
				<label>근무시간</label>
				<StyledSelect
					value={workTime}
					onChange={(e) => setWorkTime(e.target.value)}
					disabled={isFieldDisabled('workTime') || content === 'view'}
					className={errors.workTime ? 'error' : ''}
				>
					<option value="" disabled>
						선택
					</option>
					<option value="오픈 (07:00~12:00)">오픈 (07:00~12:00)</option>
					<option value="미들 (12:00~17:00)">미들 (12:00~17:00)</option>
					<option value="마감 (17:00~22:00)">마감 (17:00~22:00)</option>
				</StyledSelect>
			</FormGroup>
			<FormGroup>
				<label>휴게시간</label>
				<StyledInput
					type="text"
					value={breakTime}
					disabled={isFieldDisabled('breakTime') || content === 'view'}
					onChange={(e) => setBreakTime(e.target.value)}
					className={errors.breakTime ? 'error' : ''}
				/>
			</FormGroup>
			<FormGroup>
				<label>메모</label>
				<StyledTextarea
					value={memo}
					onChange={(e) => setMemo(e.target.value)}
					disabled={isFieldDisabled('memo') || content === 'view'}
					className={errors.memo ? 'error' : ''}
				/>
			</FormGroup>
			<ButtonContainer>
				{content === 'view' ? (
					<>
						<DeleteButton onClick={handleDelete}>삭제</DeleteButton>
						<SaveButton onClick={handleEdit}>수정</SaveButton>
					</>
				) : (
					<>
						<CancelButton onClick={() => dispatch(closeModal())}>취소</CancelButton>
						<SaveButton onClick={handleSave}>
							{content === 'edit' ? '수정' : '저장'}
						</SaveButton>
					</>
				)}
			</ButtonContainer>
		</AddScheduleForm>
	);
};

export default ModalFormComponent;

const AddScheduleForm = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 100%;
	height: 100%;
`;

const FormGroup = styled.div`
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		margin-bottom: 5px;
		font-size: 12px;
		font-weight: 300;
		color: ${colors.gray};
	}

	input,
	select {
		padding: 8px;
		border: 1px solid ${colors.lightGray};
		border-radius: 8px;
		height: 44px;
	}

	textarea {
		padding: 8px;
		border: 1px solid ${colors.lightGray};
		border-radius: 8px;
	}
`;

const StyledSelect = styled.select`
	color: ${colors.black};
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
	&.error {
		border: 1px solid ${colors.red};
	}
`;

const StyledTextarea = styled.textarea`
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	resize: none;
	height: 86px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
	&.error {
		border: 1px solid ${colors.red};
	}
`;

const StyledInput = styled(Input)`
	padding: 8px;
	border: ${(props) => (props.disabled ? 'none' : `1px solid ${colors.lightGray}`)};
	border-radius: 8px;
	background-color: ${(props) => (props.disabled ? colors.lightestGray : 'inherit')};
	&:disabled {
		border: none;
		background-color: ${colors.lightestGray};
	}
	&.error {
		border: 1px solid ${colors.red};
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	width: 100%;
`;

const CancelButton = styled.button`
	height: 44px;
	margin: 5px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.lightestGray};
	color: ${colors.black};
	flex: 1;
	font-size: 16px;
	font-weight: 600;
	max-width: 33%;
`;

const SaveButton = styled.button`
	height: 44px;
	margin: 5px 5px 5px 2px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.primaryYellow};
	color: ${colors.white};
	flex: 2;
	font-size: 16px;
	font-weight: 600;
	max-width: 66%;
`;

const DeleteButton = styled.button`
	height: 44px;
	margin: 5px;
	padding: 10px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background-color: ${colors.lightestGray};
	color: ${colors.black};
	flex: 1;
	font-size: 16px;
	font-weight: 600;
	max-width: 33%;
`;
