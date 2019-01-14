import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinderClient = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class SearchParams extends React.Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: []
  };

  handleLocationTextChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalTextChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  };

  handleBreedTextChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinderClient.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          data.petfinder.breeds.breed &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={this.state.location}
            placeholder="Location"
            onChange={this.handleLocationTextChange}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalTextChange}
            onBlur={this.handleAnimalTextChange}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedTextChange}
            onBlur={this.handleBreedTextChange}
            disabled={this.state.breeds.length === 0}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Search</button>
      </div>
    );
  }
}

export default SearchParams;
