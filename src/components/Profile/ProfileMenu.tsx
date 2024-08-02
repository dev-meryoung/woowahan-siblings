import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';
import styled from '@emotion/styled';
import IconButton from '../common/Button/IconButton';
import { ChevronRight } from 'lucide-react';

const ProfileMenu = () => {
	const menuItems = ['이용안내', '고객센터', '알림설정', '환경설정'];
	return (
		<MenuContainer>
			{menuItems.map((item, index) => (
				<MenuItem key={index}>
					{item}
					<IconButton IconComponent={ChevronRight} shape="transparent" />
				</MenuItem>
			))}
		</MenuContainer>
	);
};

const MenuContainer = styled.div`
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const MenuItem = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.semiBold};
	padding: 20px;
	border-bottom: 1px solid ${colors.lightestGray};
	cursor: pointer;
	&:hover {
		background-color: #f2f3f6;
	}
`;

export default ProfileMenu;
