import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import rcommerceSearchBg from "../assets/ecommerce_top_bg.png";
import parcelImage from "../assets/parcel.svg";
import Image from 'next/image'


const TopBanner = () => {
  const theme = useTheme();

  const getBGImage = () => {
    switch (getCurrentModuleType()) {
      case "ecommerce":
        return rcommerceSearchBg?.src;
      case "parcel":
        return parcelImage?.src;
      default:
        return null;
    }
  };

  return (
    <CustomBoxFullWidth
      sx={{
        minHeight: {
          xs: "160px",
          sm: "270px",
          md: "270px"
        },
        backgroundColor: theme.palette.neutral[100],
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", height: "100%", width: "100%", "img": { objectFit: "cover", width: "100%", height: "100%" } }}>
        {getBGImage() && <Image width={1917} height={270} src={getBGImage()} alt="banner" priority={true} />}
      </Box>
    </CustomBoxFullWidth>
  );
};

export default TopBanner;