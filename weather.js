#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printHelp, printError, printSuccess, printForecast} from "./services/log.service.js"
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js"
import {getIcon, getWeather} from './services/api.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('The token is empty!')
        return false
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token has been saved!')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length > 0){
        printError('Enter city')
        return false
    }

    try{
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('The city is saved')
    }catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue( TOKEN_DICTIONARY.city)
        const data = await getWeather(city)
        printForecast(data, getIcon(data.weather[0].icon))
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Incorrect city specified.')
        } else if (e?.response?.status === 401) {
            printError('Incorrect token specified.')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForecast()
}

initCLI()