"use client";
import type { AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/mui";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      formProps={{
        defaultValues: {
          email: "admin@jobboard.com",
          password: "demo-jobboard-admin",
        },
      }}
      // @ts-ignore
      rememberMe={<></>}
      forgotPasswordLink={<></>}
      registerLink={<></>}
    />
  );
};
