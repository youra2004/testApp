import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addCityWheaters,
  refreshCityHandler,
  deleteCityHandler,
} from "../../store/slices/citiesSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { citiesType } from "../../types/cities";
import classes from "./main.module.css";

const Main = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { cities } = useAppSelector(
    (state: { cities: { cities: [citiesType] } }) => state.cities
  );
  const [newCity, setNewCity] = useState("");

  const dispatch = useAppDispatch();
  const history = useHistory();

  const getMoreDetail = (id: number) => {
    history.push(`/${id}`);
  };

  return (
    <div className={classes.wheather}>
      <div className={classes.addBlock}>
        <input
          className={classes.addInput}
          placeholder="add new city"
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button
          className={classes.addButton}
          onClick={() => {
            setNewCity("");
            dispatch(addCityWheaters(newCity));
          }}
        >
          add city
        </button>
      </div>
      <div className={classes.citiesList}>
        {Array.isArray(cities) &&
          cities.map((city) => {
            return (
              <div
                className={classes.cityCard}
                key={city.id}
                onClick={() => getMoreDetail(city.id)}
              >
                <p className={classes.cityName}>
                  {city.name} ({city.sys.country})
                </p>
                <p className={classes.date}>{new Date().toDateString()}</p>
                <div className={classes.aboutWeather}>
                  <p className={classes.cityTemp}>+ 20 ℃</p>
                  <div className={classes.infoWheater}>
                    <div>
                      <p className={classes.wheatherType}>General</p>
                      <p className={classes.cityWeather}>
                        {city.weather[0].main}
                      </p>
                    </div>
                    <div>
                      <p className={classes.wheatherType}>Wind speed</p>
                      <p className={classes.cityWeather}>{city.wind.speed}</p>
                    </div>
                    <div>
                      <p className={classes.wheatherType}>humidity</p>
                      <p className={classes.cityWeather}>
                        {city.main.humidity}
                      </p>
                    </div>
                  </div>
                  <div className={classes.buttonsBlock}>
                    <button
                      className={classes.refreshButton}
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(refreshCityHandler(city.name));
                      }}
                    >
                      Refresh weather
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(
                          deleteCityHandler(
                            cities.filter(
                              (cityDelate: { name: string }) =>
                                cityDelate.name != city.name
                            )
                          )
                        );
                      }}
                      className={classes.deletehButton}
                    >
                      delete city
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
