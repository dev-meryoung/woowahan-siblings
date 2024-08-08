import { colors } from '@/constants/colors';
import Spinner from '../../public/XOsX.gif';
import styled from '@emotion/styled';

const Loading = () => {
	return (
		<Container>
			<StyledImg src={Spinner} alt="Loading..." />
			<Message>로딩중 ...</Message>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center;
`;

const StyledImg = styled.img`
	width: 240px;
	height: 240px;
`;

const Message = styled.h1`
	font-size: 18px;
	margin-top: 60px;
	/* color: ${colors.primaryYellow}; */
`;

export default Loading;
