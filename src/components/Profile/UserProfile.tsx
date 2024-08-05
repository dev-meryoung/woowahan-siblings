import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import { fontSize, fontWeight } from '@/constants/font';

interface IUserProfileProps {
	name: string;
	workPlace: string;
	workTime: { times: string[]; weeks: string[] };
}

const dayMap: { [key: string]: string } = {
	mon: '월',
	tue: '화',
	wed: '수',
	thu: '목',
	fri: '금',
	sat: '토',
	sun: '일',
};

const timeMap: { [key: string]: string } = {
	open: '오픈',
	middle: '미들',
	close: '마감',
};

const UserProfile = ({ name, workPlace, workTime }: IUserProfileProps) => {
	const workSchedules = workTime.weeks.map(
		(day, index) => `${dayMap[day]}(${timeMap[workTime.times[index]]})`,
	);

	return (
		<ProfileContainer>
			<Header>
				<Avatar />
				<UserInfo>
					<UserName>{name}</UserName>
					<UserWorkPlace>{workPlace} 근무</UserWorkPlace>
				</UserInfo>
			</Header>
			<Schedule>
				<ScheduleTitle>근무스케줄</ScheduleTitle>
				<ScheduleDetails>{workSchedules.join(', ')}</ScheduleDetails>
			</Schedule>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
	padding: 20px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Avatar = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #f2f3f6;
	margin-right: 20px;
`;

const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const UserName = styled.div`
	font-size: ${fontSize.xxxxl};
	font-weight: ${fontWeight.bold};
`;

const UserWorkPlace = styled.div`
	padding: 5px 10px;
	border-radius: 5px;
	margin-top: 5px;
	background-color: ${colors.primaryYellow};
	color: white;
`;

const Schedule = styled.div`
	background-color: ${colors.lightestGray};
	padding: 20px;
	border-radius: 5px;
	margin-bottom: 20px;
`;

const ScheduleTitle = styled.div`
	font-size: ${fontSize.lg};
	font-weight: ${fontWeight.medium};
	color: ${colors.gray};
	margin-bottom: 5px;
`;

const ScheduleDetails = styled.div`
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.bold};
`;

export default UserProfile;
