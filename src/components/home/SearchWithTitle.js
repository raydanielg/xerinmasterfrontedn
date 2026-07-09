import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import ManageSearch from "../header/second-navbar/ManageSearch";
import TrackParcelFromHomePage from "../parcel/TrackParcelFromHomePage";


const SearchWithTitle = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const moduleType = getCurrentModuleType();
  const { zoneid, token, searchQuery, name, query, currentTab } = props;

  const getBannerTexts = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.ECOMMERCE:
        return {
          title: "Exclusive collection for everyone",
          subTitle: "Get Your Desired High Quality Products Here",
        };
      case ModuleTypes.PARCEL:
        return {
          title: "Track your Products",
          subTitle: "Now you can track your products easily whenever you want.",
        };
      default:
        return {
          title: "",
          subTitle: "",
        };
    }
  };

  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      spacing={isSmall ? 1 : 3}
      p={isSmall ? "25px" : "20px"}
      mt={ModuleTypes.RENTAL === "rental" ? { xs: 0, sm: 2 } : 0}
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
      >
        <Typography
          variant={isSmall ? "h6" : "h5"}
          textAlign="center"
          fontWeight="600"
          lineHeight="33.18px"
          component="h1"

          sx={{
            color: moduleType === "parcel" ? "black" : "inherit"
          }}
        >
          {t(getBannerTexts().title)}
        </Typography>
        <Typography
          variant={isSmall ? "subtitle2" : "subtitle1"}
          textAlign="center"
          sx={{ color: moduleType === "parcel" ? "black" : (theme) => theme.palette.mode === "dark" ? theme.palette.neutral[1000] : theme.palette.neutral[400] }}
          fontWeight="400"
          lineHeight="18.75px"
          component="p"
        >
          {t(getBannerTexts().subTitle)}
        </Typography>
      </CustomStackFullWidth>

      {moduleType === "parcel" ? (
        <TrackParcelFromHomePage />
      ) : (
        <ManageSearch
          zoneid={zoneid}
          token={token}
          maxwidth="false"
          fullWidth
          searchQuery={searchQuery}
          name={name}
          query={query}
          currentTab={currentTab}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default SearchWithTitle;
