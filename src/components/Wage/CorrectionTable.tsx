import { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/constants/colors';
import ApprovedStatusBadge from './ApprovedStatusBadge';
import { useNavigate } from 'react-router-dom';
import { getApprovedStatusLabel, getWorkTypeLabel } from '@/utils/labelUtils';
import Button from '../common/Button/Button';
import { fontSize } from '@/constants/font';
import { useCorrections } from '@/hooks/useCorrections';
import { convertDateToISOFormat } from '@/utils/dateUtils';
import { ICorrectionItem } from '@/types/correctionInterfaces';

interface ICorrectionTableProps {
	approvedFilter?: string;
	typeFilter?: string;
}

const CorrectionTable = ({ approvedFilter, typeFilter }: ICorrectionTableProps) => {
	const columns = ['요청날짜', '근무정정 유형', '승인상태'];
	const { data, error, isLoading } = useCorrections();
	const [corrections, setCorrections] = useState<ICorrectionItem[]>([]);
	const [visibleItems, setVisibleItems] = useState(10);
	const navigate = useNavigate();

	const handleCorrection = useCallback(
		(index: string) => () => {
			navigate(`/wage/correction/${index}`);
		},
		[navigate],
	);

	const filterAndSortCorrections = useCallback(() => {
		if (data?.workCorrections) {
			const filteredCorrections = data.workCorrections
				.filter((correction: ICorrectionItem) => {
					return (
						(!approvedFilter ||
							getApprovedStatusLabel(correction.approveStatus) === approvedFilter) &&
						(!typeFilter || getWorkTypeLabel(correction.type) === typeFilter)
					);
				})
				.map((correction: ICorrectionItem) => ({
					...correction,
					reqDate: convertDateToISOFormat(correction.reqDate),
					workDate: convertDateToISOFormat(correction.workDate),
				}))
				.sort((a, b) => new Date(b.reqDate).getTime() - new Date(a.reqDate).getTime());

			setCorrections(filteredCorrections);
		}
	}, [data, approvedFilter, typeFilter]);

	const handleLoadMore = () => {
		setVisibleItems((prev) => prev + 5);
	};

	useEffect(() => {
		if (data && !isLoading && !error) {
			filterAndSortCorrections();
		}
	}, [data, isLoading, error, approvedFilter, typeFilter, filterAndSortCorrections]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error:</div>;
	}

	return (
		<TableContainer>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{corrections.length === 0 ? (
					<tr>
						<td className="no-data" colSpan={3} style={{ textAlign: 'center' }}>
							데이터가 없습니다.
						</td>
					</tr>
				) : (
					corrections.slice(0, visibleItems).map((correction) => {
						const workLabel = getWorkTypeLabel(correction.type);
						return (
							<tr key={correction.id} onClick={handleCorrection(correction.id)}>
								<td>{correction.reqDate}</td>
								<td>{workLabel}</td>
								<td>
									<ApprovedStatusBadge
										approvedStatus={correction.approveStatus}
									/>
								</td>
							</tr>
						);
					})
				)}
			</tbody>

			{visibleItems < corrections.length && (
				<tfoot>
					<tr>
						<td colSpan={3}>
							<Button
								label="더보기"
								onClick={handleLoadMore}
								size="normal"
								theme="secondary"
								buttonWidth="calc(100% - 40px)"
							/>
						</td>
					</tr>
				</tfoot>
			)}
		</TableContainer>
	);
};

export default CorrectionTable;

const TableContainer = styled.table`
	width: 100%;
	margin-bottom: 80px;

	thead {
		height: 60px;
		background-color: ${colors.lightestGray};
		border-top: 1px solid ${colors.lightGray};
		border-bottom: 1px solid ${colors.lightGray};
		th {
			width: calc(100% / 3);
		}
	}
	tbody {
		td {
			width: calc(100% / 3);
			height: 60px;
			text-align: center;
			cursor: pointer;
		}
		.no-data {
			padding-top: 100px;
			font-size: ${fontSize.lg};
		}
	}

	tfoot {
		text-align: center;
		button {
			margin-top: 10px;
		}
	}
`;
