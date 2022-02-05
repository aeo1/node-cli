import chalk from 'chalk'
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed(' Error ') + '' + error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + '' + message)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without parameters  - show forecast
        -s [CITY] add city
        -h for cli help
        -t [API_KEY] save token
        `
    )
}

const printForecast = (response, icon) => {
    console.log(
        dedent`${chalk.bgMagenta('FORECAST')} Погода в місті ${response.name}
        ${icon}  ${response.weather[0].description}
        Температура: ${ Math.round(response.main.temp)}, відчувається як: ${Math.round(response.main.feels_like)}
        Вологість: ${response.main.humidity}%, швидкість вітру: ${response.wind.speed} м/с
        `
    )
}

export {printSuccess, printError, printHelp, printForecast}