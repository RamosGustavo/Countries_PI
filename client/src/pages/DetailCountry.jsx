import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { deleteActivity, getCountry, GET_COUNTRY } from "../Redux/actions";
import s from "./DetailCountry.module.css";
import img1 from "../img/landingimg.jpg"

export default function DetailCountry() {
    const countryDetail = useSelector((state) => state.country);
    const { activities } = countryDetail;

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getCountry(params.id));
        return () => {
            dispatch({ type: GET_COUNTRY, payload: [] });
        };
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();

        await dispatch(deleteActivity(id));
        dispatch(getCountry(params.id));
    };

    return (
        <>
            <img
                src={img1}
                alt="Draw of the planisferic world map"
                className={s.img2}
            />
            <NavBar />
            <div className={s.contenedor}>
                <h1 className={s.h1}>{countryDetail.name}</h1>
                <section className={s.card}>
                    <div className={s.flex}>
                        <div className={s.infos}>
                            <div className={s.divCountry}>
                                <ul className={s.ul}>
                                    <li>ID: {countryDetail.id}</li>
                                    <li>Capital: {countryDetail.capital}</li>
                                    <li>Continents: {countryDetail.continents}</li>
                                    <li>Subregion: {countryDetail.subregion}</li>
                                    <li>Area: {countryDetail.area}km2</li>
                                    <li>Population: {countryDetail.population}</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <img
                                className={s.img}
                                src={countryDetail.image}
                                alt={`img of ${countryDetail.name}`}
                            />
                        </div>
                    </div>
                    <div className={s.containerActivities}>
                        <h2 className={s.h2}>Activities</h2>
                        <div className={s.divActivities}>
                            {activities && activities.length ? (
                                activities.map((el, i) => {
                                    return (
                                        <div className={s.divActivity} key={i}>
                                            <h3 className={s.h3}>{el.name}</h3>
                                            <ul className={s.ul}>
                                                <li>Season: {el.season}</li>
                                                <li>Duration: {el.duration}</li>
                                                <li>Difficulty: {el.difficulty}</li>
                                            </ul>
                                        </div>
                                    );
                                })
                            ) : (
                                <span className={s.span}>
                                    Right now {countryDetail.name} has no activities!
                                </span>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}