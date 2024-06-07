import React, { useEffect } from "react";
import "index.scss";

type GoogleMapProps = {
  address: string;
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

export default function GoogleMap({ address }: GoogleMapProps) {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    mapScript.async = true;
    mapScript.defer = true;
    document.head.appendChild(mapScript);

    window.initMap = () => {
      const geocoder = new window.google.maps.Geocoder();
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 16,
          mapTypeControl: false,
        }
      );

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results) {
          map.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    return () => {
      document.head.removeChild(mapScript);
    };
  }, [address]);

  return <div id="map" style={{ width: "100%", height: "280px" }}></div>;
}
