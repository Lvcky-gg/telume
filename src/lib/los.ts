import { markRaw, ref, watch } from 'vue';
import LineOfSightViewModel from '@arcgis/core/widgets/LineOfSight/LineOfSightViewModel';
import Point from '@arcgis/core/geometry/Point';
import LineOfSightTarget from '@arcgis/core/widgets/LineOfSight/LineOfSightTarget';

import { view } from './map';

export interface LosViewModelType extends LineOfSightViewModel {}
export interface LosObserverType {
    latitude?: number | nullish;
    longitude?: number | nullish;
}
export interface LosTargetType {
    lat?: number | nullish;
    lon?: number | nullish;
    z?: number | nullish;
}





import type { Ref } from 'vue';
export const losObserver: Ref<LosObserverType> = ref({latitude: undefined, longitude: undefined});
export const losTargets: Ref<LosTargetType[]> = ref([]);
export let losViewModel: LosViewModelType;

export const createLOS = () => {
    losViewModel = new LineOfSightViewModel({
        view
    });

    watch(
        () => losViewModel?.observer,
        (value) => {
            if(value){
                losObserver.value = {latitude: value.latitude, longitude: value.longitude};
            }
        }
    );
    watch(
        () => losViewModel?.targets.map((target) => target.location)
        , (value) => {
            if (value) {
                losTargets.value = value.toArray().map((target: any): LosTargetType => ({
                    lat: target.latitude,
                    lon: target.longitude,
                    z: target.z
                }));
            }
        }
    );
}

export const startLOS = () => losViewModel?.start();
export const stopLOS = () => losViewModel?.stop();
export const continueLOS = () => losViewModel?.continue();
export const clearLOS = () => losViewModel?.clear();
export const createObserver = (lat: number, lon: number, z: number) => makeObserverPoint(lat, lon, z);
export const createPoint = (lat: number, lon: number, z: number) => makePoint(lat, lon, z);
//experiment with me
export const removeTarget = (index: number) => {
    if (losViewModel.targets) {
        const targetsArray = losViewModel.targets.toArray();
        targetsArray.splice(index, 1);
        losViewModel.targets.removeAll();
        losViewModel.targets.addMany(targetsArray);
    }
};

const makeObserverPoint = (lat: number, lon: number, z: number) => {
    losViewModel.observer = markRaw(
        new Point({
            latitude: lat,
            longitude: lon,
            z: z,
            hasZ: true
        })
    );
};
//also not certain about this one
const makePoint = (lat: number, lon: number, z: number) => {
    if (losViewModel) {
        const point = new Point({
            latitude: lat,
            longitude: lon,
            z: z,
            hasZ: true
        });
        const target = new LineOfSightTarget({
            location: point
        });
        losViewModel.targets.add(target);
    }
};
