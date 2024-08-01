export interface IMockDate {
	userId: string;
	workDate: string;
	workType: string;
	isOfficial: boolean;
}

export const mockdata: IMockDate[] = [
	{ userId: '1', workDate: '2024-06-03', workType: 'open', isOfficial: false },
	{ userId: '2', workDate: '2024-06-24', workType: 'open', isOfficial: true },
	{ userId: '3', workDate: '2024-06-24', workType: 'open', isOfficial: false },
	{ userId: '4', workDate: '2024-07-06', workType: 'open', isOfficial: true },
	{ userId: '5', workDate: '2024-07-07', workType: 'close', isOfficial: true },
	{ userId: '6', workDate: '2024-07-18', workType: 'middle', isOfficial: false },
	{ userId: '7', workDate: '2024-07-19', workType: 'middle', isOfficial: false },
	{ userId: '8', workDate: '2024-07-24', workType: 'close', isOfficial: true },
	{ userId: '9', workDate: '2024-07-24', workType: 'middle', isOfficial: true },
	{ userId: '10', workDate: '2024-08-12', workType: 'close', isOfficial: false },
	{ userId: '11', workDate: '2024-08-13', workType: 'middle', isOfficial: true },
	{ userId: '12', workDate: '2024-08-14', workType: 'close', isOfficial: false },
];

export const scheduleData = [
	{
		workDate: '2024-08-01',
		wage: '10,030원',
		workTime: '미들 (12:00~17:00)',
		breakTime: '30분',
		memo: '',
	},
	{
		workDate: '2024-07-31',
		wage: '10,030원',
		workTime: '오픈 (07:00~12:00)',
		breakTime: '30분',
		memo: '아 퇴근하고 싶다',
	},
	{
		workDate: '2024-07-30',
		wage: '10,030원',
		workTime: '미들 (12:00~17:00)',
		breakTime: '30분',
		memo: '오늘 몰래 음료수를 한개 빼먹었따',
	},
	{
		workDate: '2024-07-29',
		wage: '10,030원',
		workTime: '미들 (12:00~17:00)',
		breakTime: '30분',
		memo: '푸하하',
	},
];
