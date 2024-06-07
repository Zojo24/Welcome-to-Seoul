import { useEffect } from "react";

type NaverMapProps = {
  address: string;
};

export default function Map({ address }: NaverMapProps) {
  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=REACT_APP_NAVER_CLIENT_ID`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      const { naver } = window;

      if (!naver) return;

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 10,
      });

      naver.maps.Service.geocode(
        { query: address },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }
          const result = response.result.items[0];
          const location = new naver.maps.LatLng(
            result.point.y,
            result.point.x
          );
          map.setCenter(location);

          new naver.maps.Marker({
            position: location,
            map: map,
          });
        }
      );
    };

    return () => {
      document.head.removeChild(mapScript);
    };
  }, [address]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
