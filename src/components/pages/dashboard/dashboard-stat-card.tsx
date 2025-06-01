import { styled, Card } from "@mui/material";

const DashboardStatCard = styled(Card)(({ theme }) => ({
  height: 200,
  display: "grid",
  placeItems: "center",
  borderBottom: "3.5px solid",

  ".MuiCardContent-root": {
    display: "grid",
    placeItems: "center",
  },
  h4: {
    fontSize: "1.75rem",
    fontWeight: 300,
  },
  h3: {
    fontSize: "2.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  p: {
    textAlign: "center",
  },
}));

export default DashboardStatCard;
