import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";
export default async function handleComponent() {
  let newFilePath;
  let typeOfComponent;
  const typeOfComponentQuestion = [
    {
      type: "list",
      name: "option",
      message: "select the kind of component",
      choices: ["class", "functional"],
    },
    {
      type: "list",
      name: "type",
      message: "select the kind of component",
      choices: ["generic", "moduleComponents"],
    },
  ];
  await inquirer.prompt(typeOfComponentQuestion).then((answer) => {
    typeOfComponent = { option: answer.option, type: answer.type };
  });

  const componentName = {
    type: "input",
    name: "name",
    message: "please enter the name",
    validate: function (val) {
      const isvalid = /^([A-Z]{1}[a-z]+[A-Z]?[a-z]*)$/.test(val);
      return isvalid ? true : "please enter component name in PascalCase";
    },
  };
  await inquirer.prompt(componentName).then(async (answer) => {
    const folderName = answer.name[0].toLowerCase() + answer.name.slice(1);
    const __dirname = path.resolve();
    const PascalCaseName = answer.name;
    let componentPath = path.resolve(
      __dirname,
      "src/components/" + typeOfComponent.type + "/" + folderName
    );
    //   componentPath = "src/components/" + folderName;
    await fs.mkdir(componentPath, (err) => {
      if (err) {
        console.log("component already exists");
        handleComponent();
        return;
      }
    });
    const template = {
      tsx: path.resolve(
        __dirname,
        "src/templates/" + typeOfComponent.option + "component/Component.tsx"
      ),
      scss: path.resolve(
        __dirname,
        "src/templates/" +
          typeOfComponent.option +
          "component/Component.module.scss"
      ),
    };
    newFilePath = {
      tsx: componentPath + "/" + PascalCaseName + ".tsx",
      scss: componentPath + "/" + PascalCaseName + ".module.scss",
    };
    // copy tsx component
    await fs.copyFileSync(template.tsx, newFilePath.tsx);
    // copy scss Component
    await fs.copyFileSync(template.scss, newFilePath.scss);
    console.log("trying to write vars");
    const FgGreen = "\x1b[32m";
    setTimeout(() => {
      for (let i in newFilePath) {
        fs.readFile(newFilePath[i], "utf-8", function (err, contents) {
          if (err) {
            console.log("some error");
            return;
          }
          console.log("..................");

          const replaced = contents.replace(/ComponentName/g, PascalCaseName);

          fs.writeFile(newFilePath[i], replaced, "utf-8", function (err) {
            console.log(FgGreen, newFilePath[i], "updated");
          });
        });
      }
    }, 1000);
  });
}
