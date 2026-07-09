import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import ModuleSelectionRaw from "./module-selection/ModuleSelectionRaw";

const HeroTitleSection = ({ landingPageData }) => {
  const getSearchOrModulesBySelectedModules = () => {
    return <ModuleSelectionRaw />;
  };

  return (
    <CustomStackFullWidth>
      {getSearchOrModulesBySelectedModules()}
    </CustomStackFullWidth>
  );
};

export default HeroTitleSection;
