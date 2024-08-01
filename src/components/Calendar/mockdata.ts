export interface IMockDate {
	userId: string;
	workDate: string;
	workType: string;
	isOfficial: boolean;
}

export const mockdata: IMockDate[] = [
	{ userId: '1', workDate: '2024-06-03', workType: '오픈', isOfficial: false },
	{ userId: '2', workDate: '2024-06-24', workType: '오픈', isOfficial: true },
	{ userId: '3', workDate: '2024-06-24', workType: '오픈', isOfficial: false },
	{ userId: '4', workDate: '2024-07-06', workType: '오픈', isOfficial: true },
	{ userId: '5', workDate: '2024-07-07', workType: '마감', isOfficial: true },
	{ userId: '6', workDate: '2024-07-18', workType: '미들', isOfficial: false },
	{ userId: '7', workDate: '2024-07-19', workType: '미들', isOfficial: false },
	{ userId: '8', workDate: '2024-07-24', workType: '마감', isOfficial: true },
	{ userId: '9', workDate: '2024-07-24', workType: '미들', isOfficial: true },
	{ userId: '10', workDate: '2024-08-12', workType: '마감', isOfficial: false },
	{ userId: '11', workDate: '2024-08-13', workType: '미들', isOfficial: true },
	{ userId: '12', workDate: '2024-08-14', workType: '마감', isOfficial: false },
];
