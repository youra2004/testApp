import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { citiesType } from "../../types/cities";

export const addCityWheaters = createAsyncThunk(
  "addCityWheaters",
  async (city: string, state: RootState) => {
    if (city.trim() != "") {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80f3ef974087e54ffc0c17903c43a080`
      );

      const dataCity = await res.json();

      if (dataCity.message == "city not found") {
        return state.getState().cities;
      }

      if (
        !state.getState().cities.cities ||
        state.getState().cities.cities.length === 0
      ) {
        localStorage.setItem("cities", JSON.stringify([dataCity]));
        return [dataCity];
      } else {
        for (const index of state.getState().cities.cities) {
          if (index.name == city) {
            return state.getState().cities.cities;
          }
        }

        localStorage.setItem(
          "cities",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("cities")!),
            dataCity,
          ])
        );
        return [...JSON.parse(localStorage.getItem("cities")!)];
      }
    }
  }
);

export const refreshCityHandler = createAsyncThunk(
  "refreshCityHandler",
  async (cityName: string, state: RootState) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=80f3ef974087e54ffc0c17903c43a080`
    );
    const dataCity = await res.json();

    const cityIndex = state
      .getState()
      .cities.cities.findIndex(
        (city: { name: string }) => city.name == cityName
      );
    const refreshedCities = state
      .getState()
      .cities.cities.map((city: citiesType, index: number) => {
        if (index == cityIndex) {
          return dataCity;
        }
        return city;
      });

    localStorage.setItem("cities", JSON.stringify(refreshedCities));
    return refreshedCities;
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: localStorage.getItem("cities") && [
      ...JSON.parse(localStorage.getItem("cities")!),
    ],
  },

  reducers: {
    deleteCityHandler: (state: RootState, { payload }) => {
      localStorage.setItem("cities", JSON.stringify(payload));
      console.log(payload);
      state.cities = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCityWheaters.fulfilled, (state, { payload }) => {
      state.cities = payload;
    });
    builder.addCase(refreshCityHandler.fulfilled, (state, { payload }) => {
      state.cities = payload;
    });
  },
});

export const { deleteCityHandler } = citySlice.actions;

export default citySlice.reducer;
