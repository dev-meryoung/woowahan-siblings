import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { IModalState } from '@/stores/modalSlice';
import userInfoReducer, { IUserInfoState } from '@/stores/userInfoSlice';
import scheduleReducer from '@/stores/scheduleSlice';
import correctionReducer, { ICorrectionState } from '@/stores/correctionSlice';

const store = configureStore({
	reducer: {
		modal: modalReducer,
		userInfo: userInfoReducer,
		schedules: scheduleReducer,
		correction: correctionReducer,
	},
});

export type RootState = {
	modal: IModalState;
	userInfo: IUserInfoState;
	schedules: ReturnType<typeof scheduleReducer>;
	correction: ICorrectionState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
