"use client";

import {useState} from "react";
import MapboxMap from "@/app/_libs/mapbox/MapboxMap";
import MapLoadingHolder from "@/app/_libs/mapbox/MapLoadingHolder";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [loading, setLoading] = useState(true);
  const handleMapLoading = () => setLoading(false);

  return (
    <>
      <div className="app-container">
        <div className="map-wrapper">
          <MapboxMap
            initialOptions={{
              center: [-74.006292, 40.712666],
              zoom: 16.2,
              pitch: 40,
              bearing: 53,
              style: 'mapbox://styles/mapbox/standard',
              minZoom: 15,
              maxZoom: 17
            }}
            onLoaded={(context) => {
              setMap(context);
              handleMapLoading();

              context.addSource('eraser', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        coordinates: [
                          [
                            [-74.00618, 40.71406],
                            [-74.00703, 40.71307],
                            [-74.00787, 40.71206],
                            [-74.00766, 40.71176],
                            [-74.00624, 40.71204],
                            [-74.00487, 40.71252],
                            [-74.00421, 40.71315],
                            [-74.00618, 40.71406]
                          ]
                        ],
                        type: 'Polygon'
                      }
                    }
                  ]
                }
              });

              // add the clip layer and configure it to also remove symbols and trees.
              // clipping becomes active from zoom level 16 and below.
              context.addLayer({
                id: 'eraser',
                type: 'clip',
                source: 'eraser',
                layout: {
                  // specify the layer types to be removed by this clip layer
                  'clip-layer-types': ['symbol', 'model']
                },
                maxzoom: 16
              });

              // add a line layer to visualize the clipping region.
              context.addLayer({
                id: 'eraser-debug',
                type: 'line',
                source: 'eraser',
                paint: {
                  'line-color': 'rgba(255, 0, 0, 0.9)',
                  'line-dasharray': [0, 4, 3],
                  'line-width': 5
                }
              });
            }}
          />
          <Sidebar map={map} />
        </div>
        {loading && <MapLoadingHolder className={"loading-holders"} />}
      </div>
    </>
  );
}
