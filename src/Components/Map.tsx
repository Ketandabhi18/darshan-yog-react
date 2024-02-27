import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Map = ({ latitude, longitude }: { latitude: any; longitude: any }) => {
  const mapStyle = {
    height: "500px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  };
  return (
    <div style={mapStyle}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{
          height: "100%",
          width: "70%",
          border: "1px solid #a09191",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            आर्यवन, रोजड़, पत्रा.: सागपुर, तालुका : तलोद,
            <br />
            जिला : साबरकांठा, गुजरात- 383307
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
