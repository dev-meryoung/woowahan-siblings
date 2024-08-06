import Spinner from '../../public/XOsX.gif';
import styled from '@emotion/styled';

const Loading = () => {
	return (
		<Container>
			<img src={Spinner} alt="Loading..." />
			<Message>기다려봐!!</Message>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
`;

const Message = styled.h1`
	font-size: 24px;
	margin-top: 16px;
`;

export default Loading;
