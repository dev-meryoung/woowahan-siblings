import { TApproveStatus, TType, TWorkingTimes } from './commonTypes';

export interface IBaseCorrection {
	id: string;
	type: TType | string;
	workDate: string;
	workingTimes: TWorkingTimes | string;
	description: string;
}

export interface ICorrectionItem extends IBaseCorrection {
	approveStatus: TApproveStatus | string;
	reqDate: string;
}
