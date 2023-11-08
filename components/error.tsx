type ErrorProps = {
  content?: string;
};
export const Error = ({ content }: ErrorProps) =>
  content ? <p className="text-red-500">{content}</p> : null;
