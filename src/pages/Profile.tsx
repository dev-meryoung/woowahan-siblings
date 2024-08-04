import ProfileMenu from '@/components/Profile/ProfileMenu';
import UserProfile from '@/components/Profile/UserProfile';
import getUserInfo from '@/api/user/getUserInfo';
import { useEffect, useState } from 'react';

interface IUserInfo {
	name: string;
	workPlace: string;
	workingSets: { times: string[]; weeks: string[] };
}

const Profile = () => {
	const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const data = await getUserInfo();
				setUserInfo(data.userInfo);
			} catch (error) {
				setError('Failed to fetch user info');
			}
		};

		fetchUserInfo();
	}, []);

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<UserProfile
				workPlace={userInfo?.workPlace || '근무지 없음'}
				name={userInfo?.name || '미정'}
				workTime={userInfo?.workingSets || { times: [], weeks: [] }}
			/>
			<ProfileMenu />
		</>
	);
};

export default Profile;
