interface IProps {
	children: React.ReactNode;
}

export const Container = ({ children }: IProps) => {
	return <div className="max-w-screen-lg mx-auto">{children}</div>;
};
