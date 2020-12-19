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
          cities: [...res.data.current.values],
        });
        console.log(...res.data.current.values);
      })
      .catch((err) => console.log(err));
  };

  render() {
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
            {this.state.cities.map((el) =>
              this.state.cities[0].value > 10 ? (
                <ul>
                  <li style={{ color: "red" }}>
                    {el.name} - {el.value}
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    {" "}
                    {el.name} - {el.value}
                  </li>
                </ul>
              )
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;

// okreslij warunki brzegowe dla poszczegolnych wartosci smogu
// dodac
// https://material-ui.com/components/snackbars/

// select
// https://material-ui.com/components/text-fields/
