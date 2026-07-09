const normalizeModuleValue = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const blockedModuleTypes = new Set(["ridershare", "rideshare"]);

const ALLOWED_MODULE_TYPES = new Set(["ecommerce", "parcel"]);

export const isRiderShareModule = (moduleItem) => {
  if (!moduleItem) return false;

  if (typeof moduleItem === "string") {
    return blockedModuleTypes.has(normalizeModuleValue(moduleItem));
  }

  return ["module_type", "module_name", "slug", "name", "value"].some(
    (key) => blockedModuleTypes.has(normalizeModuleValue(moduleItem?.[key]))
  );
};

export const isAllowedModuleType = (moduleItem) => {
  if (!moduleItem) return false;
  return ALLOWED_MODULE_TYPES.has(moduleItem?.module_type);
};

export const filterOutRiderShareModules = (modules = []) =>
  modules?.filter((moduleItem) => !isRiderShareModule(moduleItem)) || [];

export const filterAllowedModules = (modules = []) =>
  modules?.filter((moduleItem) => isAllowedModuleType(moduleItem)) || [];
