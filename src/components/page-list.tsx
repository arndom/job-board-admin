import { List, ListProps } from "@refinedev/mui";
import React from "react";

/**
 * Styled refine `<List>` component
 */
const PageList = (props: ListProps) => {
  const { children, wrapperProps, contentProps, ...rest } = props;

  return (
    <List
      breadcrumb={false}
      wrapperProps={{
        ...wrapperProps,
        style: {
          ...wrapperProps?.style
        }
      }}
      contentProps={{
        ...contentProps,
        style: {
          marginTop: 2,
          ...contentProps?.style
        }
      }}
      {...rest}
    >
      {children}
    </List>
  );
};

export default PageList;
