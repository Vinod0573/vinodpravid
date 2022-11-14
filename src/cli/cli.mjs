import inquirer from "inquirer";
import handleComponent from "./handleComponent.mjs";
import handleScreen from "./handleScreen.mjs";

// const { Command } = require("commander");
// const { argv } = require("process");
// const program = new Command();

// program
//   .command("component <name>")
//   .alias("a")
//   .description("add name")
//   .action((name) => {
//     console.log({ name });
//   });

// program
//   .command("page <name>")
//   .alias("p")
//   .action((name) => {});
// program
//   .command("redux <name>")
//   .alias("p")
//   .action((name) => {});
// program.parse(argv);

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to create",
    choices: ["component", "screen", "redux"],
  },
];

function handleRedux() {
  const componentName = {
    type: "input",
    name: "name",
    message: "please enter the name",
    validate: function (val) {
      const isvalid = /^([[a-z]+[A-Z]?[a-z]+)$/.test(val);
      return isvalid
        ? true
        : "please enter component name in camelCase or small";
    },
  };
  inquirer.prompt(componentName).then((answer) => {
    console.log(answer.name);
  });
}

inquirer.prompt(questions).then((answer) => {
  if (answer.option === "component") {
    handleComponent();
  } else if (answer.option === "redux") {
    handleRedux();
  } else if (answer.option === "screen") {
    handleScreen();
  }
});
