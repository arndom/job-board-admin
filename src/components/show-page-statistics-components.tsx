import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  TypographyProps,
  Typography,
  styled,
  Accordion,
  AccordionSummaryProps,
  AccordionSummary,
  AccordionDetails,
  AccordionProps
} from "@mui/material";

export const StatisticRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  alignItems: "center"
}));

export const StatisticTitle = styled((props: TypographyProps) => (
  <Typography fontWeight={500} {...props} />
))(({}) => ({}));

export const StatisticWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& > div": {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: "0px !important"
  }
}));

export const StatisticStatusAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters {...props} />
))(({}) => ({
  boxShadow: "none"
}));

export const StatisticStatusAccordionSummary = styled(
  (props: AccordionSummaryProps) => (
    <AccordionSummary expandIcon={<ExpandMore />} {...props} />
  )
)(({}) => ({
  padding: 0,
  minHeight: "unset",
  "& .MuiAccordionSummary-content": {
    margin: 0
  }
}));

export const StatisticStatusAccordionDetails = styled(AccordionDetails)(
  ({ theme }) => ({
    padding: 0,
    paddingTop: theme.spacing(1.5)
  })
);

export const StatisticStatusRow = styled(StatisticRow)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(1),
  ":last-of-type": {
    marginBottom: theme.spacing(0)
  }
}));
