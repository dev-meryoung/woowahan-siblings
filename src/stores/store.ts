import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { IModalState } from './modalSlice';
import userInfoReducer, { IUserInfoState } from './userInfoSlice';
import scheduleReducer from './scheduleSlice';
import correctionReducer, { ICorrectionState } from './correctionSlice';

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
