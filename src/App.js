import React, { Component } from "react";
import axios from "axios";
import { apiKey } from "./Api/apiKey";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import "./App.css";
import Button from "@material-ui/core/Button";

const cityData = [
  {
    name: "Kraków",
    id: 204,
    cords: {
      lat: "50.062006",
      lng: "19.940984",
    },
  },
  {
    name: "Warszawa",
    cords: {
      lat: "52.229676",
      lng: "21.012229",
    },
  },
];

class App extends Component {
  state = {
    cities: [],
  };

  getData = (e) => {
    e.preventDefault();

    const cityCords = JSON.parse(e.target.citySelect.value);
    console.log(cityCords);

    axios
      .get(
        `https://airapi.airly.eu/v2/measurements/point?lat=${cityCords.lat}&lng=${cityCords.lng}`,
        // `https://airapi.airly.eu/v2/installations/204`,
        {
          headers: {
            Accept: "application/json",
            apikey: apiKey,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          cities: [res.data.current.values],
        });
        console.log(res.data.current.values);
        console.log(res.data.current.values);
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.cities);
    return (
      <>
        <Header />

        <div className="container">
          <form onSubmit={this.getData}>
            <select name="citySelect" id="" className="select-css">
              {cityData.map((city) => {
                const jsonCords = JSON.stringify(city.cords);
                console.log(jsonCords);

                return <option value={jsonCords}>{city.name}</option>;
              })}
            </select>

            <Button
              className="contact_btn"
              type="submit"
              variant="contained"
              color="default"
            >
              Search
            </Button>
          </form>

          <div>
            {this.state.cities.map((city) =>
              city[1].value > 25 || city[2].value > 50 ? (
                <div>
                  <h2>Wartości smogu wynoszą:</h2>
                  <p
                    style={{ color: "red" }}
                    title="Norma średniego 24-godz. stężenia pyłu PM2,5: 25 µg/m | pyłu PM10: 50 µg/m  "
                  >
                    Wartość pyłu PM 2.5 wynosi - {city[1].value} μm
                    <br />
                    Wartość pyłu PM 2.5 wynosi - {city[2].value} μm
                  </p>
                </div>
              ) : (
                <div>
                  <h2>Wartości smogu wynoszą:</h2>
                  <p title="Norma średniego 24-godz. stężenia pyłu PM2,5: 25 µg/m">
                    {" "}
                    Wartość pyłu PM 2.5 wynosi - {city[1].value} μm
                    <br />
                    Wartość pyłu PM 2.5 wynosi - {city[2].value} μm
                  </p>
                </div>
              )
            )}

            {/* {this.state.cities.map(() =>
              this.state.cities[0].value > 10 ? (
                <p style={{ color: "red" }}>
                  {this.state.cities[0].name} - {this.state.cities[0].value}
                </p>
              ) : (
                <p>
                  {" "}
                  {this.state.cities[0].name} - {this.state.cities[0].value}
                </p>
              )
            )} */}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
