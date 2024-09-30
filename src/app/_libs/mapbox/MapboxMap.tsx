import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import {FC, useRef, useEffect} from "react";
import {ENV} from "@/config";

interface IMapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onCreated?: (map: mapboxgl.Map) => void;
  onLoaded?: (map: mapboxgl.Map) => void;
  onRemoved?: () => void;
}

const MapboxMap: FC<IMapboxMapProps> = ({
initialOptions = {},
onCreated,
onLoaded,
onRemoved,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    mapboxgl.accessToken = ENV.MAP_BOX as string;

    // иначе создаем инстанс карты передавая ему ссылку на DOM ноду
    // а также accessToken для mapbox
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      accessToken: ENV.MAP_BOX,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006292, 40.712666],
      zoom: 10,
      ...initialOptions,
    });


    if (onCreated) {
      onCreated(mapRef.current)
    }

    // если onLoaded указан, он будет вызван единожды
    // по событию загрузка карты
    if (onLoaded) {
      mapRef.current.once("load", () => {
        onLoaded(mapRef.current as mapboxgl.Map);
      });
    }

    // чтобы избежать утечки памяти удаляем инстанс карты
    // когда компонент будет демонтирован
    return () => {
      mapRef.current!.remove();
      mapRef.current = undefined;
      if (onRemoved) {
        onRemoved();
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{width: "100%", height: "100%"}} />;
};

export default MapboxMap;
