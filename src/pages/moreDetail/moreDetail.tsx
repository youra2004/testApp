import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { useHistory, useParams } from "react-router-dom";
import { citiesType } from "../../types/cities";
import classes from "./moreDetail.module.css";

const MoreDetail = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const history = useHistory();

  const { cities } = useAppSelector(
    (state: { cities: { cities: [citiesType] } }) => state.cities
  );

  const { id }: any = useParams();

  const cityDetail = cities.filter((city) => city.id == id);

  return (
    <div className={classes.cityBlock}>
      {cityDetail.map((city) => (
        <div className={classes.cityContainer} key={city.id}>
          <h1>{city.name}</h1>
          <div className={classes.allDetail}>
            <div
              className={`${classes.secondaryDeatils} ${classes.basicBlock}`}
            >
              <p>humidity: {city.main.humidity}</p>
              <p>pressure: {city.main.pressure}</p>
            </div>
            <div className={`${classes.sunDetail} ${classes.basicBlock}`}>
              <p>
                sunrise: {new Date(city.sys.sunrise).getHours()}:
                {new Date(city.sys.sunrise).getMinutes()}
              </p>
              <p>
                sunset: {new Date(city.sys.sunset).getHours()}:
                {new Date(city.sys.sunset).getMinutes()}
              </p>
            </div>
            <div className={`${classes.weather} ${classes.basicBlock}`}>
              <p>weather: {city.weather[0].main}</p>
              <p>description: {city.weather[0].description}</p>
            </div>
            <div className={`${classes.wind} ${classes.basicBlock}`}>
              <p>speed: {city.wind.speed}</p>
            </div>
            <div
              className={`${classes.temperatureDetail} ${classes.basicBlock}`}
            >
              <p>temperature: 20</p>
            </div>
            <div
              className={`${classes.visibilityDetail} ${classes.basicBlock}`}
            >
              <p>visibility: {city.visibility}</p>
            </div>
          </div>
          <button className={classes.backBtn} onClick={() => history.push("/")}>
            go back
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoreDetail;
