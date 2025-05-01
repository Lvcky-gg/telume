use geoconvert::{LatLon, Mgrs, UtmUps};

#[tauri::command]
pub fn latlon_to_mgrs(lat: f64, lon: f64) -> String {
    let latlon = LatLon::create(lat, lon).unwrap();
    let mgrs = Mgrs::from_latlon(&latlon, 6);
    mgrs.to_string()

}
#[tauri::command]
pub fn mgrs_to_latlon(mgrs: &str) -> (f64, f64) {
    let mgrs = Mgrs::parse_str(mgrs).unwrap();
    let latlon = LatLon::from_mgrs(&mgrs);
    (latlon.latitude(), latlon.longitude())
}
