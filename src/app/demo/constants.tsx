import {MapOptions} from "mapbox-gl";

export const MAP_CONFIG: Partial<MapOptions> = {
  center: [-74.006292, 40.712666],
  zoom: 16.2,
  pitch: 40,
  bearing: 53,
  style: 'mapbox://styles/mapbox/standard',
  minZoom: 15,
  maxZoom: 17
}
