import styled from '@emotion/styled';
import Header from '@/layout/Header';
import Content from '@/layout/Content';
import Menu from './Menu/Menu';

const Layout = () => (
	<LayoutContainer>
		<Header />
		<Content />
		<MenuWrapper>
			<Menu />
		</MenuWrapper>
	</LayoutContainer>
);

export default Layout;

const LayoutContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 430px;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const MenuWrapper = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 430px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
