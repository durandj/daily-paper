export interface Forecast {
    /**
     * Geographical coordinates of the location (latitude)
     */
    lat: number;

    /**
     * Geographical coordinates of the location (longitude)
     */
    lon: number;

    /**
     * Timezone name for the requested location
     */
    timezone: string;

    /**
     * Shift in seconds from UTC
     */
    timezoneOffset: number;

    /**
     * Current weather data API response
     */
    current?: {
        /**
         * Current time, Unix, UTC
         */
        dt: number;

        /**
         * Sunrise time, Unix, UTC
         */
        sunrise: number;

        /**
         * Sunset time, Unix, UTC
         */
        sunset: number;

        /**
         * Temperature. Units - default: kelvin, metric: Celsius,
         * imperial: Fahrenheit.
         * How to change units used:
         * https://openweathermap.org/api/one-call-api#data
         */
        temp: number;

        /**
         * Temperature. This temperature parameter accounts for the
         * human perception of weather.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        feelsLike: number;

        /**
         * Atmospheric pressure on the sea level, hPa
         */
        pressure: number;

        /**
         * Humidity, %
         */
        humidity: number;

        /**
         * Atmospheric temperature (varying according to pressure and
         * humidity) below which water droplets begin to condense and
         * dew can form.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        dewPoint: number;

        /**
         * Cloudiness, %
         */
        clouds: number;

        /**
         * Midday UV index
         */
        uvi: number;

        /**
         * Average visibility, metres
         */
        visibility: number;

        /**
         * Wind speed. Wind speed.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windSpeed: number;

        /**
         * Wind gust.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windGust?: number;

        /**
         * Wind direction, degrees (meteorological)
         */
        windDeg: number;

        rain?: {
            /**
             * Rain volume for last hour, mm
             */
            "1h": number;
        };

        snow?: {
            /**
             * Snow volume for last hour, mm
             */
            "1h": number;
        };

        weather: {
            /**
             * Weather condition ID: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
             */
            id: number;

            /**
             * Group of weather parameters (Rain, Snow, Extreme etc.)
             */
            main: string;

            /**
             * Weather condition within the group
             * (full list of weather conditions: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2).
             * Get the output in your language: https://openweathermap.org/api/one-call-api#multi
             */
            description: string;

            /**
             * Weather icon id.
             * How to get icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
             */
            icon: string;
        }[];
    };

    /**
     * Minute forecast weather data API response
     * This contains 1 hours worth of data.
     */
    minutely?: {
        /**
         * Time of the forecasted data, unix, UTC
         */
        dt: number;

        /**
         * Precipitation volume, mm
         */
        precipitation: number;
    }[];

    /**
     * Hourly forecast weather data API response.
     * This contains 48 hours worth of data.
     */
    hourly?: {
        /**
         * Time of the forecasted data, Unix, UTC
         */
        dt: number;

        /**
         * Temperature. Units - default: kelvin, metric: Celsius,
         * imperial: Fahrenheit.
         * How to change units used:
         * https://openweathermap.org/api/one-call-api#data
         */
        temp: number;

        /**
         * Temperature. This temperature parameter accounts for the
         * human perception of weather.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        feelsLike: number;

        /**
         * Atmospheric pressure on the sea level, hPa
         */
        pressure: number;

        /**
         * Humidity, %
         */
        humidity: number;

        /**
         * Atmospheric temperature (varying according to pressure and
         * humidity) below which water droplets begin to condense and
         * dew can form.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        dewPoint: number;

        /**
         * Cloudiness, %
         */
        clouds: number;

        /**
         * Average visibility, metres
         */
        visibility: number;

        /**
         * Wind speed. Wind speed.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windSpeed: number;

        /**
         * Wind gust.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windGust?: number;

        /**
         * Wind direction, degrees (meteorological)
         */
        windDeg: number;

        /**
         * Probability of precipitation
         */
        pop: number;

        rain?: {
            /**
             * Rain volume for last hour, mm
             */
            "1h": number;
        };

        snow?: {
            /**
             * Snow volume for last hour, mm
             */
            "1h": number;
        };

        weather: {
            /**
             * Weather condition ID: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
             */
            id: number;

            /**
             * Group of weather parameters (Rain, Snow, Extreme etc.)
             */
            main: string;

            /**
             * Weather condition within the group
             * (full list of weather conditions: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2).
             * Get the output in your language: https://openweathermap.org/api/one-call-api#multi
             */
            description: string;

            /**
             * Weather icon id.
             * How to get icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
             */
            icon: string;
        }[];
    }[];

    /**
     * Daily forecast weather data API response.
     * This contains 7 days worth of data.
     */
    daily?: {
        /**
         * Time of the forecasted data, Unix, UTC
         */
        dt: number;

        /**
         * Sunrise time, Unix, UTC
         */
        sunrise: number;

        /**
         * Sunset time, Unix, UTC
         */
        sunset: number;

        /**
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        temp: {
            /**
             * Morning temperature.
             */
            morn: number;

            /**
             * Day temperature.
             */
            day: number;

            /**
             * Evening temperature.
             */
            eve: number;

            /**
             * Night temperature.
             */
            night: number;

            /**
             * Min daily temperature.
             */
            min: number;

            /**
             * Max daily temperature.
             */
            max: number;
        };

        /**
         * Temperature. This temperature parameter accounts for the
         * human perception of weather.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        feelsLike: {
            /**
             * Morning temperature.
             */
            morn: number;

            /**
             * Day temperature.
             */
            day: number;

            /**
             * Evening temperature.
             */
            eve: number;

            /**
             * Night temperature.
             */
            night: number;
        };

        /**
         * Atmospheric pressure on the sea level, hPa
         */
        pressure: number;

        /**
         * Humidity, %
         */
        humidity: number;

        /**
         * Atmospheric temperature (varying according to pressure and
         * humidity) below which water droplets begin to condense and
         * dew can form.
         * Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
         */
        dewPoint: number;

        /**
         * Wind speed. Wind speed.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windSpeed: number;

        /**
         * Wind gust.
         * Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.
         * How to change units used: https://openweathermap.org/api/one-call-api#data
         */
        windGust?: number;

        /**
         * Wind direction, degrees (meteorological)
         */
        windDeg: number;

        /**
         * Cloudiness, %
         */
        clouds: number;

        /**
         * Midday UV index
         */
        uvi: number;

        /**
         * Probability of precipitation
         */
        pop: number;

        /**
         * Precipitation volume, mm
         */
        rain?: number;

        /**
         * Snow volume, mm
         */
        snow?: number;

        weather: {
            /**
             * Weather condition ID: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
             */
            id: number;

            /**
             * Group of weather parameters (Rain, Snow, Extreme etc.)
             */
            main: string;

            /**
             * Weather condition within the group
             * (full list of weather conditions: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2).
             * Get the output in your language: https://openweathermap.org/api/one-call-api#multi
             */
            description: string;

            /**
             * Weather icon id.
             * How to get icons: https://openweathermap.org/weather-conditions#How-to-get-icon-URL
             */
            icon: string;
        }[];
    }[];

    /**
     * Government weather alerts data from major national weather warning systems
     */
    alerts?: {
        /**
         * Name of the alert source. Please read here the full list of
         * alert sources: https://openweathermap.org/api/one-call-api#listsource
         */
        senderName: string;

        /**
         * Alert event name
         */
        event: string;

        /**
         * Date and time of the start of the alert, Unix, UTC
         */
        start: number;

        /**
         * Date and time of the end of the alert, Unix, UTC
         */
        end: number;

        /**
         * Description of the alert
         */
        description: string;
    }[];
}
