import { useList } from "@refinedev/core";
import { Tables } from "@utils/supabase/database.types";

export const useDashboardStats = () => {
  const { data: jobData } = useList<Tables<"jobs">>({
    resource: "jobs",
  });
  const { data: applicationsData } = useList<Tables<"applications">>({
    resource: "applications",
  });
  const { data: applicantsData } = useList<Tables<"applicants">>({
    resource: "applicants",
  });

  const jobsCount = jobData?.total;
  const applicationsCount = applicationsData?.total;
  const applicantsCount = applicantsData?.total;

  return {
    jobsCount,
    applicantsCount,
    applicationsCount,
  };
};
