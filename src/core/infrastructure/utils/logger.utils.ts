/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";

const MESSAGE = "[app:logger]";

const success = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.green(MESSAGE), chalk.green(message), ...optionalParams);
};

const error = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.red(MESSAGE), chalk.red(message), ...optionalParams);
};

const info = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.blue(MESSAGE), chalk.blue(message), ...optionalParams);
};

const warning = (message?: any, ...optionalParams: any[]) => {
  console.log(chalk.yellow(MESSAGE), chalk.yellow(message), ...optionalParams);
};

export default {
  e: error,
  i: info,
  w: warning,
  s: success,
  l: console.log,
};
