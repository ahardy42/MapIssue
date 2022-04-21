import { randomPoint } from "@turf/random";
import { FeatureCollection, Point } from "@turf/helpers";

const random = randomPoint(50, { bbox: [-73.27109, 42.75560, -71.06355, 45.02537] })

/**
 * 
 * @returns {Promise<{data:FeatureCollection<Point, any>}}
 */
export const generateRandom = async () => {
    return new Promise(res => {
        setTimeout(() => {
            res({ data: random })
        }, 2000);
    })
}

export const returnBounds = () => {
    return {
        ne: [-71.06355, 45.02537],
        sw: [-73.27109, 42.75560]
    }
}