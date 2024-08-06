import styled from '@emotion/styled';
import logo from '@/assets/logo.svg';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button/Button';
import { messages } from '@/constants/messages';
import { colors } from '@/constants/colors';
import useLogin from '@/hooks/useLogin';

const Login = () => {
	const { id, pw, isLoginError, setId, setPw, inputHandler, loginBtnHandler } = useLogin();

	return (
		<Container>
			<Logo src={logo} alt="logo" />
			<Input value={id} onChange={inputHandler(setId)} placeholder="아이디" />
			<Input
				type="password"
				value={pw}
				onChange={inputHandler(setPw)}
				placeholder="비밀번호"
			/>
			{isLoginError && <ErrorMassage>{messages.loginErrorMessage}</ErrorMassage>}
			{!!id && !!pw ? (
				<Button label="로그인" onClick={loginBtnHandler} />
			) : (
				<Button label="로그인" onClick={loginBtnHandler} disabled />
			)}
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

const ErrorMassage = styled.span`
	margin-left: 5px;
	color: ${colors.red};
	font-weight: bold;
`;

const InfoMassage = styled.span`
	color: ${colors.gray};
`;

export default Login;
