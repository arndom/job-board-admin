import SingleElementForm from "@components/single-element-form";
import { RemoveRedEye } from "@mui/icons-material";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Tables } from "@utils/supabase/database.types";
import React, { useState } from "react";

interface Props {
  id: string;
}

type FormKeys = keyof Tables<"applicants">;

const ApplicantShowDetails = (props: Props) => {
  const { id } = props;
  const { data, isFetching, isError } = useOne<Tables<"applicants">>({
    resource: "applicants",
    id,
  });
  const record = data?.data;

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!record) {
    return <div>resource item not found</div>;
  }

  return (
    <>
      <Box
        sx={{
          p: "0.5rem 0.8rem",
          borderBottom: (theme) => `1px solid ${theme.palette.grey["400"]}`,
        }}
      >
        <Typography fontWeight={500}> Trust Level</Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={record.trust_level ?? 0}
            />
          </Box>

          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2">
              {Math.round(record.trust_level ?? 0)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      <SingleElementForm
        state="view"
        itemProps={{
          name: "",
          label: "Current CV",
        }}
        inputType="textarea"
        view={(() => {
          if (!record.cv_url) return <p>None</p>;

          return (
            <Box
              component="a"
              href={record.cv_url ?? ""}
              target="_blank"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                gap: 1,
                p: {
                  textDecoration: "none",
                },
              }}
            >
              <Typography fontWeight={500} color="primary">
                View CV
              </Typography>
              <RemoveRedEye fontSize="small" color="primary" />
            </Box>
          );
        })()}
        hideEdit
      />

      <SingleElementForm
        state="view"
        itemProps={{
          name: "",
          label: "Cover letter",
        }}
        inputType="textarea"
        view={(() => {
          if (!record.cover_letter_url) return <p>None</p>;

          return (
            <Box
              component="a"
              href={record.cover_letter_url ?? ""}
              target="_blank"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                gap: 1,
                p: {
                  textDecoration: "none",
                },
              }}
            >
              <Typography fontWeight={500} color="primary">
                View Cover Letter
              </Typography>
              <RemoveRedEye fontSize="small" color="primary" />
            </Box>
          );
        })()}
        hideEdit
      />
    </>
  );
};

export default ApplicantShowDetails;
