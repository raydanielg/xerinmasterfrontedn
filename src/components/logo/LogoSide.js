import CustomLogo from "./CustomLogo";
import { Stack } from "@mui/system";

const LogoSide = ({ configData, width, height, objectFit }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      width="150px"
      justifyContent="flex-start"
    >
      <CustomLogo
        atlText="logo"
        logoImg="/full_named_logo.svg"
        width={width}
        height={height}
        objectFit={objectFit}
      />
    </Stack>
  );
};

LogoSide.propTypes = {};

export default LogoSide;
