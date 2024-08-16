import { IBaseCorrection } from '@/types/correctionInterfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICorrectionState extends IBaseCorrection {
	loading: boolean;
	error: string | null;
}

const initialState: ICorrectionState = {
	id: '',
	description: '',
	type: '',
	workDate: '',
	workingTimes: '',
	loading: false,
	error: null,
};

const correctionSlice = createSlice({
	name: 'correction',
	initialState,
	reducers: {
		setCorrectionInfo: (state, action: PayloadAction<IBaseCorrection>) => {
			state.id = action.payload.id;
			state.description = action.payload.description;
			state.type = action.payload.type;
			state.workDate = action.payload.workDate;
			state.workingTimes = action.payload.workingTimes;
			state.loading = false;
			state.error = null;
		},
		clearCorrectionInfo: (state) => {
			state.id = '';
			state.description = '';
			state.type = '';
			state.workDate = '';
			state.workingTimes = '';
			state.loading = false;
			state.error = null;
		},
	},
});

export const { setCorrectionInfo, clearCorrectionInfo } = correctionSlice.actions;
export default correctionSlice.reducer;
