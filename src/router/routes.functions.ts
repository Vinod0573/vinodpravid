export const routesToBeRendered = (moduleDetails: Array<any>) => {
  const resArr: Record<string, string> = {};
  moduleDetails;
  moduleDetails.forEach((module) => {
    if (module.shouldFrontEndShow) {
      resArr[module.name] = module.routeName;
      if (module.childModules?.length > 0) {
        module.childModules.forEach((childModule: any) => {
          resArr[childModule.name] = childModule.routeName;
        });
      }
    }
  });
  return resArr;
};
