import chalk from "chalk";

export class AccessCommon {

    constructor() { }

    messageSuccess(message: string) {
        console.log(chalk.green(message));
    }

    messageError(message: string) {
        console.log(`${chalk.red('[ERROR]:')} ${chalk.red(message)}`);
    }

}