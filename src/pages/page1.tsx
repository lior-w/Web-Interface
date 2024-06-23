import { useParams } from "react-router";

export const Page1 = () => {
  let { name } = useParams<string>();

  return <div>{`hello ${name}`}</div>;
};
