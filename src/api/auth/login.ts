import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// 로그인
const login = async (id: string, pw: string) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, id + '@woochee.com', pw);
	} catch (error) {
		// 작성 예정
	}
};

export default login;
