import getCorrection from '@/api/work/getCorrection';
import { useQuery } from 'react-query';

export const useCorrections = () => {
	return useQuery(
		'corrections',
		async () => {
			const userInfo = await getCorrection();
			return userInfo;
		},
		{
			suspense: false,
		},
	);
};
