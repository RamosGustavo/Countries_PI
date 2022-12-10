import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { createActivity, getCountries } from "../Redux/actions";
import img1 from "../img/landingimg.jpg";
import s from "./CreateActivity.module.css";

export default function CreateActivity() {
    const allCountries = useSelector((state) => state.countries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, setState] = useState({
        name: "",
        season: "summer",
        duration: "",
        difficulty: 3,
        countries: [],
    });

    const [dur, setDur] = useState(["minutes"]);

    const handleDuration = (e) => {
        if (e.target.name === "durationA") dur.splice(0, 1, e.target.value);
        if (e.target.name === "durationB") dur.splice(1, 1, e.target.value);
        setState({ ...state, duration: dur.join(" ") });
    };

    const handleChange = (e) => {
        if (e.target.name === "countries") {
            let updatedList = [...state.countries];
            if (e.target.checked) {
                updatedList = [...state.countries, e.target.value];
            } else {
                updatedList.splice(state.countries.indexOf(e.target.value), 1);
            }
            setState({ ...state, countries: updatedList });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(errors);
        if (!Object.keys(errors).length) {
            console.table(state);

            dispatch(createActivity(state));
            e.target.reset();
            setState({
                name: "",
                season: "summer",
                duration: "",
                difficulty: 3,
                countries: [],
            });
            setDur(["minutes"]);
        } else {
            console.log(errors);
        }
    };

    // useEffect(() => {
    //     setErrors(validationJS(state, dur));
    //      // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const [errors, setErrors] = useState({});
    const patternOWords = RegExp(/^[a-z ,.'-]+$/i);
    const patternONumbers = RegExp(/^\d+$/);

    function validationJS(state, dur) {
        const errors = {};
        //console.log(state);

        if (!state.name) errors.name = "Name is required!";
        if (state.name.trim().length === 0) errors.name = "Name is required!";

        if (
            state.name.length > 30 ||
            !patternOWords.test(state.name)
        )
            errors.name = "Invalid name!";

        if (!state.season) errors.season = "Select a season!";

        if (!dur[0]) errors.duration = "Duration is required!";
        if (dur[0] <= 0 || !patternONumbers.test(dur[0]))
            errors.duration = "Invalid duration!";
        if (
            (dur[0] > 60 && dur[1] === "minutes") ||
            (dur[0] > 23 && dur[1] === "hours") ||
            (dur[0] > 60 && dur[1] === "days") ||
            (dur[0] > 8 && dur[1] === "weeks")
        )
            errors.duration = "Invalid duration!";

        if (state.countries.length === 0)
            errors.countries = "Check at least one country!";

        if (Object.entries(errors).length > 0) {
            errors.submit = "Mandatory fields are missing"
        }

        console.log(errors);
        return errors;
    };

    return (
        <>
            <NavBar />
            <img
                src={img1}
                alt="Draw of the planisferic world map"
                className={s.img1}
            />
            <section className={s.formulario}>
                <h1 className={s.h1}>Create activity</h1>
                <form className={s.global} onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.inputs}>
                        <div className={s.inputs_div}>
                            <div>
                                <h3 className={s.h3}>Activity Name</h3>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Rock climbing"
                                    autoFocus
                                    className={errors.name ? s.inputNameF : s.inputNameT}
                                    onChange={(e) => handleChange(e)}
                                />
                                <span className={errors.name ? s.validF : s.validT}>
                                    {errors.name ? errors.name : ""}
                                </span>
                            </div>

                            <div>
                                <h3 className={s.h3}>Season</h3>
                                <select
                                    className={errors.season ? s.selectF : s.selectT}
                                    name="season"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option title="summer">Summer</option>
                                    <option title="fall">Fall</option>
                                    <option title="winter">Winter</option>
                                    <option title="spring">Spring</option>
                                </select>
                                <span className={errors.season ? s.validF : s.validT}>
                                    {errors.season ? errors.season : ""}
                                </span>
                            </div>

                            <div>
                                <h3 className={s.h3}>Duration</h3>
                                <input
                                    className={errors.duration ? s.inputDurationF : s.inputDurationT}
                                    type="number"
                                    id="duration"
                                    name="durationA"
                                    min="1"
                                    max="60"
                                    onChange={(e) => handleDuration(e)}
                                />
                                <select
                                    className={errors.duration ? s.selectF : s.selectT}
                                    id="duration"
                                    name="durationB"
                                    onChange={(e) => handleDuration(e)}
                                >
                                    <option>minutes</option>
                                    <option>hours</option>
                                    <option>days</option>
                                    <option>weeks</option>
                                </select>
                                <span className={errors.duration ? s.validF : s.validT}>
                                    {errors.duration ? errors.duration : ""}
                                </span>
                            </div>

                            <div>
                                <h3 className={s.h3}>Difficulty</h3>
                                <div className={s.flexbox}>
                                <input
                                    className={s.slider}
                                    type="range"
                                    name="difficulty"
                                    min="1"
                                    max="5"
                                    defaultValue={3}
                                    onChange={(e) => handleChange(e)}
                                />
                                <span className={s.difficulty}>{state.difficulty}</span>
                                </div>
                            </div>
                        </div>

                        <div className={s.tittle_countries}>
                            <h3 className={s.h3Countries}>Countries</h3>
                            <span className={errors.countries ? s.valid2F : s.valid2T}>
                                {errors.countries ? errors.countries : ""}
                            </span>
                        </div>
                        <div className={s.divCountries}>
                            <div
                                className={
                                    errors.countries ? s.optionsContainerF : s.optionsContainerT
                                }
                            >
                                {allCountries && allCountries.length
                                    ? allCountries.map((el, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={s.paises_centrados}>
                                                    <span>{el.name}</span>
                                                    <input
                                                        className={s.paises}
                                                        value={el.id}
                                                        type="checkbox"
                                                        name="countries"
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                    : "There is no countries"}
                            </div>
                        </div>
                    </div>
                    <div className={s.create}>
                        <button
                            onClick={(e) => setErrors(validationJS(state, dur))}
                            className={Object.keys(errors).length ? s.btnF : s.btnT}
                            type="submit"
                        >
                            Create activity
                        </button>
                        <span className={errors.name ? s.validF : s.validT}>
                            { errors.submit ? errors.submit : "" }
                        </span>
                    </div>
                </form>
            </section>
        </>
    );
}
