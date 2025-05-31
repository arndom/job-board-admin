"use client";

import { Suspense } from "react";

import { Authenticated } from "@refinedev/core";
import Layout from "@components/layout";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="home-page">
        <Layout>Home</Layout>
      </Authenticated>
    </Suspense>
  );
}
