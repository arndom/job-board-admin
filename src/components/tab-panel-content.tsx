import { styled, Box } from "@mui/material";

const TabPanelContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  borderRadius: "4px",
  maxHeight: 640,
  overflowY: "auto"
}));

export default TabPanelContent;
