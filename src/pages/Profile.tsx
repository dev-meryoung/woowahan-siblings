import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { useEffect, Suspense } from 'react';
import { clearUserInfo } from '@/stores/userInfoSlice';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import Loading from '@/components/Loading';
import UserProfileWrapper from '@/components/Profile/UserProfileWrapper';

const Profile = () => {
	const dispatch: AppDispatch = useDispatch();
	const { error } = useSelector((state: RootState) => state.userInfo);

	useEffect(() => {
		return () => {
			dispatch(clearUserInfo());
		};
	}, [dispatch]);

	return (
		<>
			{error ? (
				<div>{error}</div>
			) : (
				<Suspense fallback={<Loading />}>
					<UserProfileWrapper />
					<ProfileMenu />
				</Suspense>
			)}
		</>
	);
};

export default Profile;
