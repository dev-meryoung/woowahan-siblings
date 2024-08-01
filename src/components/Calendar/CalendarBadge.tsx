import { Clock4 } from 'lucide-react';
import { ICalendarBadgeProps } from '@/interfaces/calendar';
import { colors } from '@/constants/colors';
import { badgeColors } from '@/constants/badgeColors';
import { fontSize } from '@/constants/font';
import styled from '@emotion/styled';

const CalendarBadge = ({ workType }: ICalendarBadgeProps) => {
	const validWorkType = workType in BadgeContainer ? workType : 'default';
	const Badge = BadgeContainer[validWorkType as keyof typeof BadgeContainer];

	return (
		<Badge>
			<Clock4 size={10} />
			{workType}
		</Badge>
	);
};

export default CalendarBadge;

const BaseBadge = styled.li`
	display: flex;
	align-items: center;
	border-radius: 4px;
	gap: 2px;
	padding: 2px 3px;
	font-size: ${fontSize.xxs};
`;

const BadgeContainer = {
	오픈: styled(BaseBadge)`
		background-color: ${badgeColors.primaryYellow};
		color: ${colors.black};
		svg {
			color: ${colors.primaryYellow};
		}
	`,
	미들: styled(BaseBadge)`
		background-color: ${badgeColors.afternoonPink};
		color: ${colors.black};
		svg {
			color: ${colors.afternoonPink};
		}
	`,
	마감: styled(BaseBadge)`
		background-color: ${badgeColors.nightGreen};
		color: ${colors.black};
		svg {
			color: ${colors.nightGreen};
		}
	`,
	default: styled(BaseBadge)`
		background-color: ${colors.veryLightGray};
		color: ${colors.black};
		svg {
			color: ${colors.black};
		}
	`,
};
