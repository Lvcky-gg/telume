
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use ollama_rs::Ollama;
use tokio::sync::Mutex;


mod ai;
use crate::ai::ai::{get_models, chat, AppState};



fn main() {
    tauri::Builder::default()
        .manage(AppState{
            ollama: Mutex::new(Ollama::default())
        })
        .invoke_handler(tauri::generate_handler![get_models, chat])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
