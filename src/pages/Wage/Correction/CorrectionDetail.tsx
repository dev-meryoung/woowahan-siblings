import Title from '@/components/common/Title';
import { colors } from '@/constants/colors';
import { fontWeight } from '@/constants/font';
import styled from '@emotion/styled';
import { useCorrections } from '@/hooks/useCorrections';
import { useParams } from 'react-router-dom';
import { convertDateToISOFormat } from '@/utils/dateUtils';
import { getShiftTypeLabelKr, getWorkTypeLabel } from '@/utils/labelUtils';

const CorrectionDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useCorrections();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading correction details</div>;
	}

	if (!id) {
		return <div>Error: No ID provided in URL</div>;
	}

	const correction = data?.workCorrections.find((correction) => correction.id === id);

	if (!correction) {
		return <div>No correction data found</div>;
	}

	return (
		<Container>
			<Title title="근무 정정신청 상세 내역" className="title" />
			<div className="detail-container">
				<div className="detail-row">
					<p className="detail-key">근무일</p>
					<p className="detail-value">{convertDateToISOFormat(correction.workDate)}</p>
				</div>
				<div className="detail-row">
					<p className="detail-key">근무 시간</p>
					<p className="detail-value">{getShiftTypeLabelKr(correction.workingTimes)}</p>
				</div>
				<div className="detail-row">
					<p className="detail-key">사유내용</p>
					<p className="detail-value">{getWorkTypeLabel(correction.type)}</p>
				</div>
			</div>
			<div className="description-container">
				<p className="description-key">설명</p>
				<p className="description-value">{correction.description}</p>
			</div>
		</Container>
	);
};

const Container = styled.div`
	.title {
		padding-top: 20px;
	}
	.detail-container {
		padding: 50px 20px 40px;
		border-bottom: 1px solid ${colors.lightGray};

		.detail-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 25px;

			.detail-key {
				color: ${colors.darkestGray};
			}
			.detail-value {
				font-weight: ${fontWeight.medium};
			}
		}
	}
	.description-container {
		padding: 50px 20px 0;

		.description-key {
			margin-bottom: 10px;
			color: ${colors.darkestGray};
		}

		.description-value {
			font-weight: ${fontWeight.medium};
		}
	}
`;

export default CorrectionDetail;
