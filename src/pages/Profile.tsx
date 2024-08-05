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

	const fetchUserInfo = async () => {
		try {
			const data = await getUserInfo();
			setUserInfo(data.userInfo);
		} catch (error) {
			setError('Failed to fetch user info');
		}
	};

	useEffect(() => {
		fetchUserInfo();
	}, []);

	return (
		<>
			{error ? (
				<div>{error}</div>
			) : (
				<>
					<UserProfile
						workPlace={userInfo?.workPlace || '근무지 없음'}
						name={userInfo?.name || '미정'}
						workTime={userInfo?.workingSets || { times: [], weeks: [] }}
					/>
					<ProfileMenu />
				</>
			)}
		</>
	);
};

export default Profile;
