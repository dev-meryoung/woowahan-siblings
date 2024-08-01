import styled from '@emotion/styled';
import logo from '@/assets/logo.svg';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { messages } from '@/constants/messages';
import { colors } from '@/constants/colors';
import { useState } from 'react';

const Login = () => {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const inputHandler =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setter(e.target.value);
		};

	const loginBtnHandler = () => {
		// 로그인 로직 작성 예정
	};

	return (
		<Container>
			<Logo src={logo} alt="logo" />
			<Input value={id} onChange={inputHandler(setId)} placeholder="아이디" />
			<Input value={pw} onChange={inputHandler(setPw)} placeholder="비밀번호" />
			<Button label="로그인" onClick={loginBtnHandler} />
			<InfoMassage>
				{messages.loginInfoMessage}
				<br />
				{messages.loginInfoEmail}
			</InfoMassage>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 40px;
	gap: 10px;

	& > Button {
		margin: 20px 0;
	}
`;

const Logo = styled.img`
	height: 36px;
	margin: 150px 0 50px 0;
`;

const InfoMassage = styled.span`
	color: ${colors.gray};
`;

export default Login;
