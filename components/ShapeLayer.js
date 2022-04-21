import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import isEqual from 'lodash.isequal';

const propsAreEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps)

function ShapeLayer({ shape }) {
    if (!shape) return null

    return (
        <MapboxGL.ShapeSource
            id='points'
            {...{ shape }}
            cluster
            clusterRadius={20}
        >
            <MapboxGL.SymbolLayer
                sourceID='points'
                id='pointCount'
                style={{
                    textField: '{point_count}',
                    textSize: 14,
                    textPitchAlignment: 'map',
                    textColor: 'white',
                    textFont: ['Work Sans Bold'], // < -- uncomment and this breaks the app
                    textAllowOverlap: true
                }}
            />
            <MapboxGL.CircleLayer
                sourceID='points'
                id='clusteredPoints'
                belowLayerID='pointCount'
                filter={['has', 'point_count']}
                style={{
                    circlePitchAlignment: 'map',
                    circleColor: 'blue',
                    circleRadius: 16,
                    circleOpacity: 1,
                    circleStrokeWidth: 3,
                    circleStrokeColor: 'white',
                }}
            />
            <MapboxGL.SymbolLayer
                id='icons'
                sourceID='points'
                filter={['!', ['has', 'point_count']]}
                style={{
                    iconAnchor: 'bottom',
                    iconAllowOverlap: true,
                    iconIgnorePlacement: true,
                    iconImage: 'marker',
                    iconSize: 0.5
                }}
            />
        </MapboxGL.ShapeSource>
    )
}

export default React.memo(ShapeLayer, propsAreEqual)