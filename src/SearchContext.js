import React from "react";

const SearchContext = React.createContext({
  location: "Seatle, WA",
  animal: "",
  breed: "",
  breeds: [],
  handleAnimalTextChange() {},
  handleBreedTextChange() {},
  handleLocationTextChange() {},
  getBreeds() {}
});

export const Provider = SearchContext.Provider;

export const Consumer = SearchContext.Consumer;
