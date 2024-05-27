import CircularProgress from "@mui/material/CircularProgress";

export interface IProps {
  msg: string;
  size: number;
}

const Loading = ({ msg, size }: IProps) => {
  return (
    <div className="flex flex-col text-center p-4 text-brown text-2xl">
      <div className="p-4 text-brown text-4xl">{`${msg}`}</div>
      <div>
        <CircularProgress color="inherit" size={size} />
      </div>
    </div>
  );
};

export default Loading;
