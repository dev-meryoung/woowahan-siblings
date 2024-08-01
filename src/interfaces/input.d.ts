export interface IInputProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputWidth?: string;
	placeholder?: string;
	type?: 'text' | 'password' | 'date';
	disabled?: boolean;
}
