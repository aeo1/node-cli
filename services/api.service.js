// import https from 'https'
import axios from 'axios'
import {getKeyValue, TOKEN_DICTIONARY} from './storage.service.js'

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return 'âī¸';
        case '02':
            return 'đ¤ī¸';
        case '03':
            return 'âī¸';
        case '04':
            return 'âī¸';
        case '09':
            return 'đ§ī¸';
        case '10':
            return 'đĻī¸';
        case '11':
            return 'đŠī¸';
        case '13':
            return 'âī¸';
        case '50':
            return 'đĢī¸';
    }
}

const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)

    if (!token){
        throw new Error('The token is undefined!')
    }
    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ua',
            units: 'metric'
        }
    })

    return data

    // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    // url.searchParams.append('q', city)
    // url.searchParams.append('appid', token)
    // url.searchParams.append('lang', 'ua')
    // url.searchParams.append('units', 'metric' )
    //
    // https.get(url, (response) => {
    //     let result = ''
    //     response.on('data', chunk => {
    //         result += chunk
    //     })
    //     response.on('end', () => {
    //         console.log(result)
    //     })
    //     response.on('error', err => {
    //
    //     })
    // })
}

export {getWeather, getIcon}