interface LoadingIndicatorProps {
  background?: string;
}
const LoadingIndicator = ({ background = "#fff" }: LoadingIndicatorProps) => {
  return <div className="loader" style={{ background: background }} />;
};

export default LoadingIndicator;
