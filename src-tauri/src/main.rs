
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use ollama_rs::Ollama;
use tokio::sync::Mutex;


mod ai;
mod conversion;
use crate::ai::ai::{get_models, chat, AppState};
use crate::conversion::conversions::{latlon_to_mgrs, mgrs_to_latlon, latlon_to_utm};



fn main() {
    tauri::Builder::default()
        .manage(AppState{
            ollama: Mutex::new(Ollama::default())
        })
        .invoke_handler(tauri::generate_handler![get_models, chat, latlon_to_mgrs, mgrs_to_latlon, latlon_to_utm])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
