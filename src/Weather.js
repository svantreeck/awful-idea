import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const WeatherQuery = gql`
  query getWeather($name: String!) {
    getCityByName(name: $name) {
      id
      name
      country
      weather {
        temperature {
          actual
          feelsLike
          min
          max
        }
      }
    }
  }
`;

const kelvinToFahrenheit = (kelvin) => {
  //(279.47K − 273.15) × 9/5 + 32 = 43.376°F
  return ((kelvin - 273.15) * 9) / 5 + 32;
};

function Weather() {
  const [city, setCity] = useState("Chicago");
  const { loading, error, data } = useQuery(WeatherQuery, {
    variables: { name: city },
    skip: !city,
  });

  return (
    <>
      <input
        value={city}
        onChange={(event) => setCity(event.target.value)}
      ></input>
      {loading && "Loading"}
      {error && JSON.stringify(error)}
      <h1>{data?.getCityByName?.name} Weather</h1>
      <table>
        <tbody>
          <tr>
            <th>Actual</th>
            <td>
              {kelvinToFahrenheit(
                data?.getCityByName?.weather?.temperature?.actual
              )}
            </td>
          </tr>
          <tr>
            <th>Feels Like</th>
            <td>
              {kelvinToFahrenheit(
                data?.getCityByName?.weather?.temperature?.feelsLike
              )}
            </td>
          </tr>
          <tr>
            <th>Min</th>
            <td>
              {kelvinToFahrenheit(
                data?.getCityByName?.weather?.temperature?.min
              )}
            </td>
          </tr>
          <tr>
            <th>Max</th>
            <td>
              {kelvinToFahrenheit(
                data?.getCityByName?.weather?.temperature?.max
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Weather;
