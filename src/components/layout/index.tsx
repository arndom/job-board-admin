import { ReactNode } from "react";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ThemedLayoutV2 } from "@refinedev/mui";
import colors from "@config/theme/colors";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Sider={Sidebar}
      containerBoxProps={{
        sx: {
          "nav .MuiPaper-root": {
            borderBottom: "none",

            ".MuiList-root": {
              height: "100%",
            },
          },
        },
      }}
    >
      {props.children}
    </ThemedLayoutV2>
  );
};

export default Layout;
