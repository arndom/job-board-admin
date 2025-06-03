import SingleElementForm from "@components/single-element-form";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useOne } from "@refinedev/core";
import { Tables } from "@utils/supabase/database.types";
import React, { useState } from "react";

interface Props {
  id: string;
}

type FormKeys = keyof Tables<"applications">;

const ApplicationShowDetails = (props: Props) => {
  const { id } = props;
  const { data, isFetching, isError } = useOne<Tables<"applications">>({
    resource: "applications",
    id,
  });
  const record = data?.data;

  const { data: applicantData, isLoading: applicantDataIsLoading } = useOne<
    Tables<"applicants">
  >({
    resource: "applicants",
    id: record?.applicant_id ?? undefined,
  });

  const [activeForm, setActiveForm] = useState<FormKeys>();
  const getActiveForm = (key: FormKeys) => {
    if (activeForm === key) {
      return "form";
    }

    if (record) {
      let value = record[key];
      if (typeof value === "number") value = String(value);

      if (!value) {
        return "empty";
      }
    }

    return "view";
  };

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
        <Typography fontWeight={500}> Job Match</Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={record.match ?? 0} />
          </Box>

          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2">
              {Math.round(record.match ?? 0)}%
            </Typography>
          </Box>
        </Box>
      </Box>

      <SingleElementForm
        state="view"
        itemProps={{
          name: "",
          label: "Applicant email",
        }}
        inputType="textarea"
        view={
          <Typography>
            {applicantDataIsLoading
              ? "..."
              : applicantData
              ? applicantData.data.email
              : "N/A"}
          </Typography>
        }
        hideEdit
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "applications",
          },
          defaultValues: {
            cv_sentiment: record.cv_sentiment,
          },
        }}
        state={getActiveForm("cv_sentiment")}
        itemProps={{
          name: "cv_sentiment",
          label: "CV assessment",
        }}
        inputType="textarea"
        view={<Typography>{record.cv_sentiment}</Typography>}
        onClick={() => setActiveForm("cv_sentiment")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "applications",
          },
          defaultValues: {
            cover_letter_sentiment: record.cover_letter_sentiment,
          },
        }}
        state={getActiveForm("cover_letter_sentiment")}
        itemProps={{
          name: "cover_letter_sentiment",
          label: "Cover letter assessment",
        }}
        inputType="textarea"
        view={<Typography>{record.cover_letter_sentiment}</Typography>}
        onClick={() => setActiveForm("cover_letter_sentiment")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />
    </>
  );
};

export default ApplicationShowDetails;
