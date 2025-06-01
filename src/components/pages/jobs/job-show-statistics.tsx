import {
  StatisticRow,
  StatisticTitle,
  StatisticWrapper,
} from "@components/show-page-statistics-components";
import { Typography } from "@mui/material";
import { useList } from "@refinedev/core";
import { Tables } from "@utils/supabase/database.types";

interface Props {
  id: string;
}

const JobStatistics = (props: Props) => {
  const { id } = props;

  const {
    data: applicationsData,
    isLoading: applicationsDataIsLoading,
    isError: applicationsDataIsError,
  } = useList<Tables<"applications">>({
    resource: "applications",
    filters: [
      {
        field: "job_id",
        operator: "eq",
        value: id,
      },
    ],
  });

  if (applicationsDataIsLoading) {
    return <div>Loading...</div>;
  }

  if (applicationsDataIsError) {
    return <div>Something went wrong!</div>;
  }

  if (!applicationsData) {
    return <div>resource item not found</div>;
  }

  return (
    <StatisticWrapper>
      <StatisticRow>
        <StatisticTitle>Total Applications:</StatisticTitle>
        <Typography>{applicationsData.total}</Typography>
      </StatisticRow>
    </StatisticWrapper>
  );
};

export default JobStatistics;
