use futures_util::StreamExt;
use ollama_rs::{generation::chat::{request::{ ChatMessageRequest}, ChatMessage}, Ollama};
use tauri::State;
use tokio::sync::Mutex;
use serde::{Serialize, Deserialize};

pub struct AppState {
    pub ollama:Mutex<Ollama>,
}

#[derive(Serialize)]
pub struct ChatResponse {
    message: String
}
#[derive(Deserialize)]
pub struct ChatRequest {
    model: String,
    messages: Vec<ChatMessage>,
}

#[tauri::command]
pub async  fn get_models(state: State<'_, AppState>) -> Result<Vec<String>, String> {
    let models = {
        let client = state.ollama.lock().await;
        client.list_local_models()
        .await
        .map_err(|e| format!("Failed to list models: {:?}", e))?
    };
    Ok(models.iter().map(|m| m.name.clone()).collect())
}

#[tauri::command]
pub async fn chat(
    request: ChatRequest,
    _window: tauri::Window,
    state: State<'_, AppState>,
) -> Result<ChatResponse, String> {
    let client = state.ollama.lock().await;
    let chat_request = ChatMessageRequest::new(
        request.model,
        request.messages,
    );
    let mut stream = client
        .send_chat_messages_stream(chat_request)
        .await
        .map_err(|e| format!("Failed to send chat messages: {:?}", e))?;

    let mut full_message = String::new();
    while let Some(response) = stream.next().await {
        let response = response.map_err(|e| format!("Failed to get response: {:?}", e))?;
        full_message.push_str(&response.message.content);
    }

    Ok(ChatResponse {
        message: full_message,
    })
}
