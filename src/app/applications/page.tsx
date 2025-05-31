"use client";

import PageList from "@components/page-list";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function CategoryList() {
  return (
    <PageList headerButtons={() => null}>
      <p>List</p>
    </PageList>
  );
}
