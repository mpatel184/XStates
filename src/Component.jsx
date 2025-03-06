import { useEffect, useState } from "react";
import axios from 'axios'

export default function Component(){
    const[countryData,setCountryData] = useState([])
    const[stateData,setStateData] = useState([])
    const[cityData,setCityData] = useState([])
    const[country,setCountry] = useState("")
    const[state,setState] = useState("")
    const[city,setCity] = useState("")

    const fetchdata = async() => {
        try {
            const response = await axios.get("https://crio-location-selector.onrender.com/countries")
            setCountryData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchstate = async(countryName) => {
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
            setStateData(response.data)
            setState("")
            setCity("")
            setCityData([])
        } catch (error) {
            console.log(error)
        }
    }

    const fetchcity = async(countryName,stateName) => {
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
            setCityData(response.data)
            setCity("")
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchdata()
    },[])
    useEffect(() => {
        fetchstate(country)
    },[country])
    useEffect(() => {
        fetchcity(country,state)
    },[state])

    return (
        <>
        <div style={{display:"flex",gap:"10px",position:"absolute",top:"50px",left:"50px",right:"50%"}}>
            <select onChange={(e) => setCountry(e.target.value)} value={country} style={{height:"30px",padding:"5px"}}>
                <option value="">Select Country</option>
                {countryData.map((country,index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setState(e.target.value)} value={state} disabled={!country} style={{height:"30px",padding:"5px"}}>
                <option value="">Select State</option>
                {stateData.map((state,index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setCity(e.target.value)} value={city} disabled={!state} style={{ height: "30px",padding:"5px"}}>
                <option value="">Select City</option>
                {cityData.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
        {city && state && country && (
            <div data-testid="selected-location">
                <h2>You selected {city}, {state}, {country}</h2>
            </div>
        )}
        </>
        
    )
}