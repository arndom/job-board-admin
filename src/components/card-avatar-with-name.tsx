import { Box, Avatar, Typography, styled } from "@mui/material";

const Tint = styled(Box)(({ theme }) => ({
  "::before": {
    content: "''",
    width: "100%",
    background: theme.palette.primary.light,
    display: "inline-block"
  }
}));

interface Props {
  avatar: string;
  name: string;
}

const CardAvatarWithName = (props: Props) => {
  const { avatar, name } = props;

  return (
    <Tint
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "::before": {
          height: (theme) => theme.spacing(5),
        },
      }}
    >
      <Tint
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          width: "100%",

          "::before": {
            height: "50%",
            position: "absolute",
          },
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            width: 96,
            height: 96,
            flexShrink: 0,
            boxShadow: "0px 0px 5px 5px #091E4233",
            background: "white",
          }}
        />
      </Tint>
      <Typography variant="h6" mt={1}>
        {name}
      </Typography>
    </Tint>
  );
};

export default CardAvatarWithName;
