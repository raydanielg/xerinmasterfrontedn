import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSelectedModule } from "redux/slices/utils";
import useGetModule from "api-manage/hooks/react-query/useGetModule";
import { getCurrentModuleId } from "helper-functions/getCurrentModuleType";
import { getSavedModuleIdentifier, saveModuleParam } from "../../utils/moduleParamManager";
import { filterAllowedModules } from "helper-functions/moduleFilter";

const ModuleChecker = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, refetch } = useGetModule();
  // Sync Storage -> URL (keep module param on every route)
  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") return;

    const moduleFromUrl = router.query.module;
    const legacyModuleId = router.query.module_id;

    const storedIdentifier =
      getSavedModuleIdentifier() ||
      JSON.parse(localStorage.getItem("module") || "null")?.slug ||
      JSON.parse(localStorage.getItem("module") || "null")?.id;

    const identifierToUse = moduleFromUrl || legacyModuleId || storedIdentifier;

    if (!identifierToUse) return;

    // Add module if missing, and/or remove legacy module_id
    if (!moduleFromUrl || legacyModuleId) {
      const { module_id: _legacy, ...restQuery } = router.query;
      router.replace(
        {
          pathname: router.pathname,
          query: { ...restQuery, module: String(identifierToUse) },
        },
        undefined,
        { shallow: true, scroll: false }
      );
    }
  }, [router.isReady, router.asPath]);

  // Sync URL -> Storage
  useEffect(() => {
    const moduleIdFromUrl = router.query.module || router.query.module_id;
    const moduleIdFromStorage = getCurrentModuleId();

    if (moduleIdFromUrl && !moduleIdFromStorage) {
      refetch();
    }
  }, [router.query.module, router.query.module_id, refetch]);

  useEffect(() => {
    const moduleIdFromUrl = router.query.module || router.query.module_id;
    const moduleIdFromStorage = getCurrentModuleId();

    if (data) {
      if (moduleIdFromUrl && !moduleIdFromStorage) {
        const moduleIdStr = String(moduleIdFromUrl);
        const selectedModule = data.find(
          (item) =>
            String(item?.slug) === moduleIdStr || String(item?.id) === moduleIdStr
        );
        if (selectedModule) {
          localStorage.setItem("module", JSON.stringify(selectedModule));
          saveModuleParam(selectedModule?.id, selectedModule?.slug);
          dispatch(setSelectedModule(selectedModule));
        } else {
          const allowedModules = filterAllowedModules(data);
          const fallbackModule = allowedModules.find(
            (m) => m.module_type === "ecommerce"
          ) || allowedModules[0];
          if (fallbackModule) {
            localStorage.setItem("module", JSON.stringify(fallbackModule));
            saveModuleParam(fallbackModule?.id, fallbackModule?.slug);
            dispatch(setSelectedModule(fallbackModule));
            const moduleSlug = fallbackModule.slug || fallbackModule.id;
            router.replace(
              { pathname: "/home", query: { module: moduleSlug } },
              undefined,
              { shallow: true }
            );
          }
        }
      } else if (!moduleIdFromUrl && !moduleIdFromStorage) {
        const allowedModules = filterAllowedModules(data);
        const ecommerceModule = allowedModules.find(
          (m) => m.module_type === "ecommerce"
        ) || allowedModules[0];
        if (ecommerceModule) {
          localStorage.setItem("module", JSON.stringify(ecommerceModule));
          saveModuleParam(ecommerceModule?.id, ecommerceModule?.slug);
          dispatch(setSelectedModule(ecommerceModule));
          const moduleSlug = ecommerceModule.slug || ecommerceModule.id;
          router.replace(
            { pathname: "/home", query: { module: moduleSlug } },
            undefined,
            { shallow: true }
          );
        }
      }
    }
  }, [data, router.query.module, router.query.module_id, dispatch]);

  return null;
};

export default ModuleChecker;
