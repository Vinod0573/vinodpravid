import * as fs from "fs";
import * as path from "path";
import inquirer from "inquirer";
import { program } from "commander";
import { argv } from "process";
export default async function handleScreen() {
  let newFilePath;
  let typeOfComponent;
  const typeOfComponentQuestion = [
    {
      type: "list",
      name: "option",
      message: "select the kind of component",
      choices: ["class", "functional"],
    },
  ];
  await inquirer.prompt(typeOfComponentQuestion).then((answer) => {
    if (answer.option === "class") {
      typeOfComponent = "class";
    } else if (answer.option === "function") {
      typeOfComponent = "function";
    }
  });
  program.parse(argv);
  const componentName = {
    type: "input",
    name: "name",
    message: "please enter the name of screen",
    validate: function (val) {
      const isvalid = /^([A-Z]{1}[a-z]+[A-Z]?[a-z]*)$/.test(val);
      return isvalid ? true : "please enter component name in PascalCase";
    },
  };
  inquirer.prompt(componentName).then(async (answer) => {
    const folderName = answer.name[0].toLowerCase() + answer.name.slice(1);
    const __dirname = path.resolve();
    const PascalCaseName = answer.name;
    let componentPath = path.resolve(__dirname, "src/screens/" + folderName);
    //   componentPath = "src/components/" + folderName;
    await fs.mkdir(componentPath, (err) => {
      if (err) {
        console.log("screen already exists");
        handleComponent();
        return;
      }
    });
    const template = {
      tsx: path.resolve(
        __dirname,
        "src/templates/" + typeOfComponent + "Component/Component.tsx"
      ),
      scss: path.resolve(
        __dirname,
        "src/templates/" + typeOfComponent + "Component/Component.module.scss"
      ),
    };
    newFilePath = {
      tsx: componentPath + "/" + PascalCaseName + ".screen" + ".tsx",
      scss: componentPath + "/" + PascalCaseName + ".screen.module.scss",
    };
    // copy tsx component
    await fs.copyFileSync(template.tsx, newFilePath.tsx);
    // copy scss Component
    await fs.copyFileSync(template.scss, newFilePath.scss);
    console.log("trying to write vars");
    const FgGreen = "\x1b[32m";
    setTimeout(async () => {
      for (let i in newFilePath) {
        fs.readFile(newFilePath[i], "utf-8", function (err, contents) {
          if (err) {
            console.log("some error");
            return;
          }
          console.log(FgGreen, ".................");

          const replaced = contents.replace(/ComponentName/g, PascalCaseName);

          fs.writeFile(newFilePath[i], replaced, "utf-8", function (err) {
            console.log(FgGreen, newFilePath[i], "updated");
          });
        });
      }
    }, 1000);
  });
}
