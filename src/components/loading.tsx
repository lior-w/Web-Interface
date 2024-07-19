import CircularProgress from "@mui/material/CircularProgress";

export interface IProps {
  msg: string;
  size: number;
}

const Loading = ({ msg, size }: IProps) => {
  return (
    <div className="flex flex-col text-center p-4 text-black text-2xl">
      <div className="p-4 text-4xl">{`${msg}`}</div>
      <div>
        <CircularProgress color="inherit" size={size} />
      </div>
    </div>
  );
};

export default Loading;
