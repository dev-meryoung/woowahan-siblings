import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal, openModal } from '@/stores/modalSlice.ts';
import { colors } from '@/constants/colors';
import { X } from 'lucide-react';
import Input from '@/components/Input';
import { css } from '@emotion/react';
import { scheduleData } from '@/components/Calendar/mockdata';

type ModalContent = 'add' | 'edit' | 'view' | null;

const ScheduleModal = () => {
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector(
		(state: RootState) => state.modal as { isOpen: boolean; content: ModalContent },
	);

	const today = new Date().toISOString().split('T')[0];
	const defaultWage = scheduleData[0].wage;
	const defaultWorkTime = '';
	const defaultMemo = '';

	const [workDate, setWorkDate] = useState(today);
	const [wage, setWage] = useState(defaultWage);
	const [workTime, setWorkTime] = useState(defaultWorkTime);
	const [memo, setMemo] = useState(defaultMemo);

	useEffect(() => {
		if (content === 'add') {
			setWorkDate(today);
			setWage(defaultWage);
			setWorkTime(defaultWorkTime);
			setMemo(defaultMemo);
		} else {
			setWorkDate(scheduleData[0].workDate);
			setWage(scheduleData[0].wage);
			setWorkTime(scheduleData[0].workTime);
			setMemo(scheduleData[0].memo);
		}
	}, [content, today, defaultWage, defaultWorkTime, defaultMemo]);

	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			dispatch(closeModal());
		}
	};

	const isFieldDisabled = (field: 'workDate' | 'wage' | 'breakTime' | 'workTime' | 'memo') => {
		if (content === 'view') return true;
		if (content === 'add' || content === 'edit') {
			if (field === 'workDate' || field === 'wage' || field === 'breakTime') return true;
			if (field === 'workTime' || field === 'memo') return false;
		}
		return true;
	};

	const handleSave = () => {
		if (content === 'edit') {
			scheduleData[0].workTime = workTime;
			scheduleData[0].memo = memo;
		}
		dispatch(closeModal());
	};

	const handleDelete = () => {
		if (content === 'view') {
			const index = scheduleData.findIndex(
				(item) =>
					item.workDate === workDate &&
					item.wage === wage &&
					item.workTime === workTime &&
					item.memo === memo,
			);
			if (index !== -1) {
				scheduleData.splice(index, 1);
			}
			dispatch(closeModal());
		}
	};

	const handleEdit = () => {
		dispatch(openModal('edit'));
	};

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalHeader>
					<HeaderContent>
						{content === 'add'
							? '일정 추가'
							: content === 'view'
								? '일정 조회'
								: '일정 수정'}
					</HeaderContent>
					<CloseButton onClick={() => dispatch(closeModal())}>
						<X css={iconStyle} />
					</CloseButton>
				</ModalHeader>
				<AddScheduleForm>
					<FormGroup>
						<label>근무일</label>
						<StyledInput
							value={workDate}
							disabled={isFieldDisabled('workDate')}
							onChange={() => {
								// No-op
							}}
						/>
					</FormGroup>
					<FormGroup>
						<label>시급</label>
						<StyledInput
							type="text"
							value={wage}
							disabled={isFieldDisabled('wage')}
							onChange={() => {
								// No-op
							}}
						/>
					</FormGroup>
					<FormGroup>
						<label>근무시간</label>
						<StyledSelect
							value={workTime}
							onChange={(e) => setWorkTime(e.target.value)}
							disabled={isFieldDisabled('workTime')}
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
							value={scheduleData[0].breakTime}
							disabled={isFieldDisabled('breakTime')}
							onChange={() => {
								// No-op
							}}
						/>
					</FormGroup>
					<FormGroup>
						<label>메모</label>
						<StyledTextarea
							value={memo}
							onChange={(e) => setMemo(e.target.value)}
							disabled={isFieldDisabled('memo')}
						/>
					</FormGroup>
				</AddScheduleForm>
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
			</ModalContent>
		</ModalOverlay>
	);
};

export default ScheduleModal;

const ModalOverlay = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: flex-end;
	z-index: 9999;
`;

const ModalContent = styled.div`
	background-color: ${colors.white};
	padding: 20px;
	border-radius: 8px 8px 0 0;
	width: 100%;
	height: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 20px;
	padding: 0 10px;
`;

const HeaderContent = styled.div`
	color: ${colors.black};
	font-size: 20px;
	font-weight: 600;
	line-height: 160%;
	letter-spacing: -0.18px;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const iconStyle = css`
	width: 28px;
	height: 28px;
	stroke-width: 0.5;
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
`;
