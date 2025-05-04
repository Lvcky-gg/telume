import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';

import {when} from '@arcgis/core/core/reactiveUtils.js';
import { ref } from 'vue';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Search from '@arcgis/core/widgets/Search';
import type Layer  from '@arcgis/core/layers/Layer';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getWeather } from './environment';


export interface MapInstance extends Map {}
export interface SceneViewInstance extends SceneView {}
export type LosGraphLayerInstance = GraphicsLayer | null;

export let map: MapInstance;
export let view: SceneViewInstance;
export let losGraphLayer: LosGraphLayerInstance;
export const mapLayers = ref<Record<string, { title: string; id: string; layer: any }>>({});
export const mapReady = ref(false);

// interface InitMapOptions {
//     container: string | HTMLElement;
// }

// interface MapLayerInfo {
//     title: string;
//     id: string;
//     layer: any;
// }

export const initMap = (container: string | HTMLDivElement | nullish): void => {

    const defaultBasemap: string = 'satellite';
    const elevationLayer: ElevationLayer = new ElevationLayer({
        url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
    });

    map = new Map({
        basemap: defaultBasemap,
        ground: {
            layers: [elevationLayer]
        },

    });

    view = new SceneView({
        container,
        map
    });
    view.environment.lighting = {
        type: "sun",
        // date: new Date()
        };
    view.environment.lighting.directShadowsEnabled = true;
    const searchWidget = new Search({
        view: view,

    });
    view.ui.add(searchWidget, {
        position: 'top-leading',
        index: 0
    });

    searchWidget.on("search-complete", (event) => {

    if (event.results.length && event.results[0].results.length) {
        const result = event.results[0].results[0];
        const geometry = result.feature.geometry;

        if(geometry) {
        if (geometry.type === "point") {
            const { latitude, longitude } = geometry;
            if(latitude && longitude) {
            getWeather(latitude, longitude);
            }
        }
    }
    }
});


// view.when(async() => {

//     if (view.center && view.center.latitude && view.center.longitude) {
//         const timeZone =await getTimeZoneFromPoint(view.center.latitude, view.center.longitude);
//         view.environment.lighting ={
//             type: "sun",
//             date: new Date(timeZone as string)
//     }

//     view.watch('center', async(center) => {
//         if (center && center.latitude && center.longitude) {
//             const timeZone =await  getTimeZoneFromPoint(center.latitude, center.longitude);
//             view.environment.lighting ={
//             type: "sun",
//             date: new Date(timeZone as string)
//         };
//         }

//     });
// }
// });

    when(
        () => view.ready,
        () => {
            mapReady.value = true;
        }
    );
}
export interface RemoveLayer {
    (layer: Layer): Promise<void> | void;
}

export const removeLayer: RemoveLayer = async (layer: Layer): Promise<void> => {
    map.remove(layer);
}
interface MakeLayerOptions {
    title?: string;
    id?: string;
    [key: string]: any;
}

export const makeLayer = async (url: string, options: MakeLayerOptions): Promise<FeatureLayer> => {
    const layer = new FeatureLayer({url, ...options});
    return layer;
}
export interface AddLayer {
    (layer: Layer): Promise<void> | void;
}

export const addLayer: AddLayer = async (layer) => {
    map.add(layer);
}
