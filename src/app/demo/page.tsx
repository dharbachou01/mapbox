"use client";

import {useState} from "react";
import MapboxMap from "@/app/_libs/mapbox/MapboxMap";
import MapLoadingHolder from "@/app/_libs/mapbox/MapLoadingHolder";
import Sidebar from "@/components/Sidebar/Sidebar";
import {MAP_CONFIG} from "@/app/demo/constants";
import {prepareGEODATA} from "@/app/_libs/mapbox/MapboxHelper";

const Page = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [loading, setLoading] = useState(true);
  const handleMapLoading = () => setLoading(false);

  return (
    <>
      <div className="app-container">
        <div className="map-wrapper">
          <MapboxMap
            initialOptions={MAP_CONFIG}
            onLoaded={(context) => {
              setMap(context);
              handleMapLoading();

              context.addSource('eraser', prepareGEODATA([]));

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

export default Page;
