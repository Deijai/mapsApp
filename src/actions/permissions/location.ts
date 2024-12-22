import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from 'react-native-permissions';
import { PermissionStatus } from '../../infrastructure/interfaces/permissions.interface';
import { Platform } from 'react-native';


export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    switch (Platform.OS) {
        case 'ios':
            status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            break;
        case 'android':
            status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            break;
        default:
            throw new Error("Platform not suported");

    }


    if (status === 'blocked') {
        await openSettings();
        // TODO: return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        limited: 'limited',
        unavailable: 'unavailable'
    }

    return permissionMapper[status] ?? 'undetermined';


}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    switch (Platform.OS) {
        case 'ios':
            status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            break;
        case 'android':
            status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            break;
        default:
            throw new Error("Platform not suported");

    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        limited: 'limited',
        unavailable: 'unavailable'
    }

    return permissionMapper[status] ?? 'undetermined';
}