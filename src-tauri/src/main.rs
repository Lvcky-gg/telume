
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use futures_util::StreamExt;
use ollama_rs::{generation::chat::{request::{self, ChatMessageRequest}, ChatMessage}, Ollama};
use tauri::State;
use tokio::sync::Mutex;
use serde::{Serialize, Deserialize};


struct AppState {
    ollama:Mutex<Ollama>,
}
#[derive(Serialize)]
// struct ChatResponse {
//     message: String
// }
#[derive(Deserialize)]
struct ChatRequest {
    model: String,
    messages: Vec<ChatMessage>,
}

#[tauri::command]
async  fn get_models(state: State<'_, AppState>) -> Result<Vec<String>, String> {
    let models = {
        let client = state.ollama.lock().await;
        client.list_local_models()
        .await
        .map_err(|e| format!("Failed to list models: {:?}", e))?
    };
    Ok(models.iter().map(|m| m.name.clone()).collect())
}

// #[tauri::command]
// async fn chat(
//     request: ChatRequest,
//     window: tauri::Window,
//     state: State<'_, AppState>,
// )->Result<(), String>{
//     let mut client: tokio::sync::MutexGuard<'_, Ollama> = state.ollama.lock().await;
//     let chat_request: ChatMessageRequest = ChatMessageRequest::new(
//         request.model,
//         request.messages,
//     );
//     let mut stream = client
//     .send_chat_messages_stream(chat_request)
//     .await
//     .map_err(|e| format!("Failed to send chat messages: {:?}", e))?;

//     while let Some(response) = stream.next().await {
//         let response = response.map_err(|e| format!("Failed to get response: {:?}", e))?;
//         let chat_response = ChatResponse {
//             message: response.message.content,
//         };
//         window.emit("chat_message", &chat_response).map_err(|e| e.to_string())?;
//     }
//     Ok(())
// }
fn main() {
    tauri::Builder::default()
        .manage(AppState{
            ollama: Mutex::new(Ollama::default())
        })
        .invoke_handler(tauri::generate_handler![get_models])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
