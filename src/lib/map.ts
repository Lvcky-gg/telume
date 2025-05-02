import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';

import {when, watch} from '@arcgis/core/core/reactiveUtils.js';
import { ref, markRaw } from 'vue';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Search from '@arcgis/core/widgets/Search';
import type Layer  from '@arcgis/core/layers/Layer';
import type GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getWeather } from './weather';
export interface MapInstance extends Map {}
export interface SceneViewInstance extends SceneView {}
export type LosGraphLayerInstance = GraphicsLayer | null;

export let map: MapInstance;
export let view: SceneViewInstance;
export let losGraphLayer: LosGraphLayerInstance;
export const mapLayers = ref<Record<string, { title: string; id: string; layer: any }>>({});
export const mapReady = ref(false);

interface InitMapOptions {
    container: string | HTMLElement;
}

interface MapLayerInfo {
    title: string;
    id: string;
    layer: any;
}

export const initMap = (container: string | HTMLDivElement | nullish): void => {

    const defaultBasemap: string = 'satellite';
    const elevationLayer: ElevationLayer = new ElevationLayer({
        url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
    });

    // const weatherLayer: FeatureLayer = new FeatureLayer({
    //     url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NOAA_METAR_current_wind_speed_direction_v1/FeatureServer',
    // });
    // console.log(weatherLayer)
    map = new Map({
        basemap: defaultBasemap,
        ground: {
            layers: [elevationLayer]
        },
        // layers: [weatherLayer]
    });

    view = new SceneView({
        container,
        map
    });
    const searchWidget = new Search({
        view: view,
    });
    view.ui.add(searchWidget, {
        position: 'top-leading',
        index: 0
    });


//     view.on("click", (e) => {
//      let lat = e.mapPoint.latitude
//      let lon = e.mapPoint.longitude
//      getWeather(lat as number,lon as number)
//  })

    when(
        () => view.ready,
        () => {
            mapReady.value = true;
        }
    );
    const validTypes: string[] = ['csv', 'graphic', 'geojson', 'kml', 'layer', 'mapImageLayer', 'ogcFeatureLayer', 'sceneLayer', 'tile', 'vectorTile'];
    watch(
        (): Layer[] => view.map.allLayers.toArray().filter((layer: Layer) => validTypes.includes(layer.type)),
        (layers: Layer[]) => {
            if(layers.length){
                for(const layer of layers){
                    if(layer.title === 'SVM Internal') continue;
                    mapLayers.value[layer.id] = {
                        title: layer.title,
                        id: layer.id,
                        layer: markRaw(layer),
                    } as MapLayerInfo;
                }
            }
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
