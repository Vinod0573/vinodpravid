export const getLeftSideModuleDetails = (modules: any) => {
  const moduleDetails: Array<any> = JSON.parse(JSON.stringify(modules));
  let defaultSelected = { name: "", url: "" };
  moduleDetails.sort((a, b) => a?.position - b?.position);

  // fiter modules which will be shown at initial stage.
  const modulesVisibleAtEarly = moduleDetails.filter(
    (item) => item.isModuleShown
  );

  // defining wheatear frontEnd should show module based on above result.
  if (modulesVisibleAtEarly.length > 0) {
    moduleDetails.forEach((item) => {
      item.shouldFrontEndShow = item.isModuleShown;
      if (item.isDefaultSelected)
        defaultSelected = { name: item.name, url: item.routeName };
    });
  } else {
    moduleDetails.forEach((item) => {
      item.shouldFrontEndShow = true;
      if (item.isDefaultSelected)
        defaultSelected = { name: item.name, url: item.routeName };
    });
  }
  return { moduleDetails, defaultSelected };
};

export const mapSubModulesToModulesFunc = (modules: any) => {
  const subModulesMapping: Record<string, string> = {};
  modules.forEach((item: any) => {
    if (item.childModules) {
      const value = item.name;
      item.childModules.forEach((childItem: any) => {
        subModulesMapping[childItem.name] = value;
      });
    } else {
      subModulesMapping[item.name] = item.name;
    }
  });

  return subModulesMapping;
};

export const mapUrlToModulesFunc = (modules: any) => {
  const urlToModulesMapping: Record<string, string> = {};
  modules.forEach((item: any) => {
    if (item.childModules) {
      item.childModules.forEach((childItem: any) => {
        urlToModulesMapping[childItem.routeName] = childItem.name;
      });
    } else {
      urlToModulesMapping[item.routeName] = item.name;
    }
  });
  return urlToModulesMapping;
};
