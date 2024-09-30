
export const prepareGEODATA = (cord: any[]) => {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            coordinates: [
              cord
            ],
            type: 'Polygon'
          }
        }
      ]
    }
  }
}
