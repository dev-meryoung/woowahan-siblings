import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getUserId } from '@/utils/userDataUtils';

// 근무 정정신청 내역 조회 API
const getCorrection = async () => {
	const q = query(collection(db, 'WorkCorrections'), where('userId', '==', getUserId()));
	const querySnapshot = await getDocs(q);
	const docData = querySnapshot.docs.map((doc) => {
		const obj = doc.data();
		const workDate = new Date(obj.workDate.seconds * 1000);
		const reqDate = new Date(obj.requestDate.seconds * 1000);
		const newObj = {
			id: doc.id,
			workDate: `${workDate.getFullYear()}-${workDate.getMonth() + 1}-${workDate.getDate()}`,
			reqDate: `${reqDate.getFullYear()}-${reqDate.getMonth() + 1}-${reqDate.getDate()}`,
			workingTimes: obj.workingTimes,
			type: obj.type,
			approveStatus: obj.approveStatus,
			description: obj.description,
		};
		return newObj;
	});

	return { workCorrections: docData };
};

export default getCorrection;
