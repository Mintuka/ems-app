import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
function layout({ children }: Props) {
  return <>{children}</>;
}
export default layout;
