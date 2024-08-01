export interface IIconButtonProps {
	IconComponent: React.ComponentType;
	shape: 'transparent' | 'line';
	color?: 'gray' | 'black';
	size?: number;
	onClick?: () => void;
}
