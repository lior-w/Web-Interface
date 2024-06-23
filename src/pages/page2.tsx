import { useParams } from "react-router";

export const Page2 = () => {
  let { name } = useParams<string>();

  return <div>{`bye ${name}`}</div>;
};
