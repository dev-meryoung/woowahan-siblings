export interface IButtonProps {
	label: string;
	onClick: () => void;
	size?: 'small' | 'normal';
	theme?: 'primary' | 'secondary';
	buttonWidth?: string;
	disabled?: boolean;
}
