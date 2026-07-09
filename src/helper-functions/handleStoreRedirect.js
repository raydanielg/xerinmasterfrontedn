export const getStoreRedirectURL = (item, moduleId, query) => {
    const basePath = `/store/${item?.slug || item?.id}`;
    const hasModuleInQuery = Boolean(query?.module || query?.module_id);
    return hasModuleInQuery ? basePath : `${basePath}?module=${moduleId}`;
};

export const handleStoreRedirect = (item, router, moduleId) => {
    const hasModuleInQuery = Boolean(router?.query?.module);
    const nextQuery = hasModuleInQuery
        ? router.query
        : { ...(router?.query || {}), module: moduleId };

    router.push({
        pathname: getStoreRedirectURL(item, moduleId, router?.query),
        query: nextQuery,
    });
};
