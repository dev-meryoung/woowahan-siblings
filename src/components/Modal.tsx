/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { closeModal } from '@/stores/modalSlice.ts';
import { colors } from '@/constants/colors';
import { X } from 'lucide-react';

const Modal = () => {
	const dispatch = useDispatch();
	const { isOpen, content } = useSelector((state: RootState) => state.modal);

	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<ModalContent>
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
				<div>
					{content === 'add' && <div>일정 추가 내용</div>}
					{content === 'view' && <div>일정 조회 내용</div>}
					{content === 'edit' && <div>일정 수정 내용</div>}
				</div>
				<ButtonContainer>
					<CancelButton onClick={() => dispatch(closeModal())}>취소</CancelButton>
					<SaveButton>{content === 'view' ? '수정' : '저장'}</SaveButton>
				</ButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
};

export default Modal;

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
	height: 80%;
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
	width: 24px;
	height: 24px;
	stroke-width: 1;
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
	margin: 5px;
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
