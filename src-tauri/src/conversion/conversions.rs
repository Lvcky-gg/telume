use geoconvert::{LatLon, Mgrs, UtmUps};

#[tauri::command]
pub fn latlon_to_mgrs(lat: f64, lon: f64) -> String {
    let latlon = LatLon::new(lat, lon);
    let mgrs = Mgrs::from_latlon(&latlon).unwrap();
    mgrs.to_string()
}
#[tauri::command]
pub fn mgrs_to_latlon(mgrs: &str) -> (f64, f64) {
    let mgrs = Mgrs::from_str(mgrs).unwrap();
    let latlon = LatLon::from_mgrs(&mgrs).unwrap();
    (latlon.latitude(), latlon.longitude())
}
