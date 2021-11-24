import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FiSettings } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import L from "leaflet";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const Main = () => {
  const [onScreen, setOnScreen] = useState(false);
  const [location, setLocation] = useState([0, 0]);
  const[bookingStatus,setBookingStatus] = useState("before");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))?.user
  );

  const [drivers, setDrivers] = useState(
    JSON.parse(localStorage.getItem("drivers"))
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const icon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [24, 41] });

  const taxiIcon = L.icon({
    iconUrl: "/taxiIcon.png",
    iconSize: [24, 24],
  });

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(AskPosition);
    } else {
    }
  }, []);

  const logout = () => {
    setUser(null);
    dispatch({ type: "LOGOUT" });
  };
  const AskPosition = (position) => {
    setLocation([position.coords.latitude, position.coords.longitude]);
    setDrivers([
      ...drivers,
      {
        location: [
          position.coords.latitude + 0.0010,
          position.coords.longitude + 0.0010,
        ],
        name: "Barry",
      },
    ]);
  };
  const SetViewOnClick = () => {
    const map = useMap();
    map.setView(location, 13);
    return null;
  };

  return (
    <>
      <div className={`${onScreen ? "onScreen" : "menu"}`}>
        <ImCross size={35} onClick={() => setOnScreen(false)} />
        <h2 className="miniLogo orange">{user?.username}</h2>
        <ul className="settings">
          <li>Home</li>
          <li>Theme</li>
          <li>Payment</li>
          <li>Account</li>

          <li onClick={logout}>Log Out</li>
        </ul>
      </div>
      <div className="main">
        <div className="navbar">
          <FiSettings
            size={50}
            color={"#F"}
            onClick={() => setOnScreen(true)}
          />
          <h2 className="logo">Dashboard</h2>
        </div>
        <div className="container">
          <div className="askTaxi">
            {bookingStatus == "before" && <button className="taxiButton" onClick= {() => setBookingStatus("wait")}>Book a taxi</button>}
            {bookingStatus == "wait" && <h2>Taxi is on its way</h2>  }
          </div>
          <MapContainer
            style={{
              height: "30vh",
              width: "90%",
              margin: "auto",
              zIndex: "0",
            }}
            center={location}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetViewOnClick />
            <Marker position={location} icon={icon}>
              <Popup offset={[0, -15]}>Your current location</Popup>
            </Marker>

            {drivers &&
              drivers.map((driver) => {
                return (
                  <Marker position={driver.location} icon={taxiIcon}>
                    <Popup offset={[0, -15]}>{driver.name}</Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Main;
