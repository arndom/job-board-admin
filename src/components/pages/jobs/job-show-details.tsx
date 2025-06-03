import SingleElementForm from '@components/single-element-form';
import { Typography } from '@mui/material';
import { useOne } from '@refinedev/core';
import { countries } from '@utils/data';
import { Constants, Tables } from '@utils/supabase/database.types';
import React, { useState } from 'react'

interface Props {
  id: string
}

type FormKeys = keyof Tables<"jobs">;

const JobShowDetails = (props: Props) => {
  const { id } = props;
  const { data, isFetching, isError } = useOne<Tables<"jobs">>({
    resource: "jobs",
    id,
  });
  const record = data?.data;

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
      <SingleElementForm
        state="view"
        hideEdit
        itemProps={{
          name: "",
          label: "Job Email",
        }}
        inputType="text"
        view={<Typography>{record.email}</Typography>}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            description: record.description,
          },
        }}
        state={getActiveForm("description")}
        itemProps={{
          name: "description",
          label: "Job Description",
        }}
        inputType="textarea"
        view={<Typography>{record.description}</Typography>}
        onClick={() => setActiveForm("description")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            seniority_level: record.seniority_level,
          },
        }}
        state={getActiveForm("seniority_level")}
        itemProps={{
          name: "seniority_level",
          label: "Seniority",
        }}
        view={
          <Typography sx={{ textTransform: "capitalize" }}>
            {record.seniority_level}
          </Typography>
        }
        inputType="select"
        options={Constants["public"]["Enums"]["seniority_level_enum"].map(
          (v) => ({
            value: v,
            label: v,
          })
        )}
        onClick={() => setActiveForm("seniority_level")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            job_type: record.job_type,
          },
        }}
        state={getActiveForm("job_type")}
        itemProps={{
          name: "job_type",
          label: "Job Type",
        }}
        view={
          <Typography sx={{ textTransform: "capitalize" }}>
            {record.job_type}
          </Typography>
        }
        inputType="select"
        options={Constants["public"]["Enums"]["job_type_enum"].map((v) => ({
          value: v,
          label: v,
        }))}
        onClick={() => setActiveForm("job_type")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            remote_type: record.remote_type,
          },
        }}
        state={getActiveForm("remote_type")}
        itemProps={{
          name: "remote_type",
          label: "Job style",
        }}
        view={
          <Typography sx={{ textTransform: "capitalize" }}>
            {record.remote_type}
          </Typography>
        }
        inputType="select"
        options={Constants["public"]["Enums"]["remote_type_enum"].map((v) => ({
          value: v,
          label: v,
        }))}
        onClick={() => setActiveForm("remote_type")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            requirements: record.requirements,
          },
        }}
        state={getActiveForm("requirements")}
        itemProps={{
          name: "requirements",
          label: "Requirements",
        }}
        inputType="textarea"
        view={<Typography>{record.requirements}</Typography>}
        onClick={() => setActiveForm("requirements")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            skills: record.skills,
          },
        }}
        state={getActiveForm("skills")}
        itemProps={{
          name: "skills",
          label: "Skills",
        }}
        inputType="textarea"
        view={<Typography>{record.skills}</Typography>}
        onClick={() => setActiveForm("skills")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            salary: record.salary,
          },
        }}
        state={getActiveForm("salary")}
        itemProps={{
          name: "salary",
          label: "Salary",
        }}
        inputType="text"
        view={<Typography>{record.salary}</Typography>}
        onClick={() => setActiveForm("salary")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            benefits: record.benefits,
          },
        }}
        state={getActiveForm("benefits")}
        itemProps={{
          name: "benefits",
          label: "Benefits",
        }}
        inputType="textarea"
        view={<Typography>{record.benefits}</Typography>}
        onClick={() => setActiveForm("benefits")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        state="view"
        hideEdit
        itemProps={{
          name: "company_name",
          label: "Company Name",
        }}
        inputType="text"
      />

      <SingleElementForm
        state="view"
        hideEdit
        itemProps={{
          name: "company_logo",
          label: "Company Logo",
        }}
        inputType="text"
        view={<Typography>{record.company_logo}</Typography>}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            country: record.country,
          },
        }}
        state={getActiveForm("country")}
        itemProps={{
          name: "country",
          label: "Country",
        }}
        view={
          <Typography sx={{ textTransform: "capitalize" }}>
            {
              countries.find((c) => c.code.toLowerCase() === record.country)
                ?.label
            }
          </Typography>
        }
        inputType="select"
        options={countries.map((v) => ({
          value: v.code.toLowerCase(),
          label: v.label,
        }))}
        onClick={() => setActiveForm("country")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            location: record.location,
          },
        }}
        state={getActiveForm("location")}
        itemProps={{
          name: "location",
          label: "Company Address",
        }}
        inputType="text"
        view={<Typography>{record.location}</Typography>}
        onClick={() => setActiveForm("location")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />

      <SingleElementForm
        useFormProps={{
          refineCoreProps: {
            id: record.id,
            resource: "jobs",
          },
          defaultValues: {
            company_size: record.company_size,
          },
        }}
        state={getActiveForm("company_size")}
        itemProps={{
          name: "company_size",
          label: "Company Size",
        }}
        inputType="textarea"
        view={<Typography>{record.company_size}</Typography>}
        onClick={() => setActiveForm("company_size")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      />
    </>
  );
}

export default JobShowDetails