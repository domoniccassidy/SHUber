import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FiSettings } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { MiniPayment } from "./Payment";
const Main = () => {
  const [onScreen, setOnScreen] = useState(false);
  const [location, setLocation] = useState([0, 0]);
  const [bookingStatus, setBookingStatus] = useState("before");
  const [error, setError] = useState("");
  const [destination, setDestination] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [drivers, setDrivers] = useState(
    JSON.parse(localStorage.getItem("drivers"))
  );

  const cardError = useSelector((state) => state.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  const icon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [24, 41] });

  const icon2 = L.icon({
    iconUrl: "/destination-icon.png",
    iconSize: [24, 41],
  });

  const taxiIcon = L.icon({
    iconUrl: "/taxiIcon.png",
    iconSize: [24, 24],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(AskPosition);
    } else {
    }
  }, []);

  useEffect(() => {
    if (bookingStatus == "wait") {
      setTimeout(taxiIsHere, 4000);
    } else if (bookingStatus == "here") {
      setTimeout(tripIsOver, 4000);
    }
  }, [bookingStatus]);
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  const chooseDestination = (e) => {
    setDestination(e.latlng);
  };
  const bookTaxi = () => {
    if (!destination) setError("You need to choose a destination to travel to");
    else if (user?.cardVerified == false)
      setError("Please provide your payment details before booking");
    else {
      setBookingStatus("wait");
      setError("");
    }
  };
  const taxiIsHere = () => {
    setBookingStatus("here");
    const newDrivers = drivers;
    newDrivers[0].location = [location[0] + 0.0007, location[1] + 0.0007];
    setLocation([...location, location[0] + 0.00000000000001]);
  };
  const tripIsOver = () => {
    setBookingStatus("there");
    drivers[0].location = [destination.lat + 0.0005, destination.lng + 0.0005];
    setLocation([destination.lat, destination.lng]);
    setDestination([0, 0]);
  };

  const payment = () => {
    history.push("/payment");
  };
  const logout = () => {
    setUser(null);
    dispatch({ type: "LOGOUT" });
  };
  const AskPosition = (position) => {
    setLocation([position.coords.latitude, position.coords.longitude]);
  };
  const SetViewOnClick = () => {
    const map = useMap();
    map.setView(location, 13);
    return null;
  };

  function Routing() {
    const map = useMap();

    useEffect(() => {
      if (!map || !destination || !location || !destination.lat) return;
      const routingControl = L.Routing.control({
        waypoints: [location, [destination?.lat, destination?.lng]],
        routeWhileDragging: true,
        createMarker: function () {
          return null;
        },
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }, [map]);

    return null;
  }
  return (
    <>
      <div className={`${onScreen ? "onScreen" : "menu"}`}>
        <ImCross size={35} onClick={() => setOnScreen(false)} />
        <h2 className="miniLogo orange">{user?.username}</h2>
        <ul className="settings">
          <li>Home</li>
          <li onClick={payment}>Payment</li>
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
            {bookingStatus == "before" && (
              <button className="taxiButton" onClick={bookTaxi}>
                Book a taxi
              </button>
            )}
            {bookingStatus == "wait" && (
              <h2 className="taxiInfo">Taxi is on its way</h2>
            )}
            {bookingStatus == "here" && (
              <h2 className="taxiInfo">
                You are now heading to your destination
              </h2>
            )}
            {bookingStatus == "there" && (
              <>
                {" "}
                <h2 className="taxiInfo">
                  You have arrived at your destination, thanks for using Shuber
                </h2>
                <p style={{ fontFamily: "arial", color: "white" }}>
                  If you're feeling nice, why not give the driver a{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#6495ED",
                    }}
                    onClick={() => history.push("/driver")}
                  >
                    review?
                  </span>
                </p>
              </>
            )}
            {error != "" && (
              <p className="errorMessage" style={{ marginBottom: "1vh" }}>
                {error}
              </p>
            )}
          </div>

          <MapContainer
            whenReady={(map) => {
              map.target.on("click", function (e) {
                chooseDestination(e);
              });
            }}
            style={{
              height: "30vh",
              width: "90%",
              margin: "auto",
              zIndex: "0",
            }}
            center={location}
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
            {destination && (
              <Marker position={destination} icon={icon2}></Marker>
            )}
            {drivers &&
              drivers.map((driver) => {
                return (
                  <Marker
                    key={driver.id}
                    position={driver.location}
                    icon={taxiIcon}
                  >
                    <Popup offset={[0, -15]}>
                      <a>{driver.name}</a>
                    </Popup>
                  </Marker>
                );
              })}
            <Routing />
          </MapContainer>
        </div>
        {cardError === "Please provide your payment details before booking" && (
          <MiniPayment />
        )}
      </div>
    </>
  );
};

export default Main;
