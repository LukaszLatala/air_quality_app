import React, { Component } from "react";
import axios from "axios";
import { apiKey } from "./Api/apiKey";

// const cityData = [
//   {
//     name: "Kraków",
//     id: 204,
//     cords: {
//       lat: "50.062006",
//       lng: "19.940984",
//     },
//   },
// ];

const showData = [
  {
    id: 204,
    location: {
      latitude: 50.062006,
      longitude: 19.940984,
    },
  },
];

class App2 extends Component {
  state = {
    cities: [],
  };

  getData = (e) => {
    e.preventDefault();

    // const cityCords = JSON.parse(e.target.citySelect.value);
    // console.log(cityCords);

    axios
      .get(`https://airapi.airly.eu/v2/installations/${showData.id}`, {
        headers: {
          Accept: "application/json",
          apikey: apiKey,
        },
      })
      .then((res) => {
        console.log(res);
        // this.setState({
        //   cities: [...res.data.current.values],
        // });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.getData}>Get data</button>
        {/* {" "}
        <div>
          <form onSubmit={this.getData}>
            <select name="citySelect" id="">
              {cityData.map((city) => {
                const jsonCords = JSON.stringify(city.cords);
                // console.log(jsonCords);

                return <option value={jsonCords}>{city.name}</option>;
              })}
            </select>
            <button type="submit">search</button>
          </form>

          <div>
            {this.state.cities.map((el) => (
              <ul>
                <li>
                  {el.name} - {el.value}
                </li>
              </ul>
            ))}
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default App2;

// select
// https://material-ui.com/components/text-fields/
