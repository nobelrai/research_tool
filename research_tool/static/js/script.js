// Function to update chat history list with buttons
function updateChatHistoryList() {
    const chatHistoryBox = document.getElementById('chat-history-box');
    chatHistoryBox.innerHTML = ''; // Clear existing buttons

    const chatHistories = JSON.parse(localStorage.getItem('chatHistories')) || [];
    chatHistories.forEach((history, index) => {
        const div = document.createElement('div');
        div.className = 'd-flex align-items-center mb-2';

        const button = document.createElement('button');
        button.className = 'btn btn-secondary me-2';
        button.textContent = history.preview;
        button.addEventListener('click', () => loadChatSession(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => deleteChatHistory(index));

        div.appendChild(button);
        div.appendChild(deleteButton);
        chatHistoryBox.appendChild(div);
    });
}

// Function to delete a specific chat history
function deleteChatHistory(index) {
    const chatHistories = JSON.parse(localStorage.getItem('chatHistories')) || [];
    chatHistories.splice(index, 1); // Remove the selected chat history
    localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
    updateChatHistoryList(); // Update the chat history list
}

// Event listener for "New Chat" button
document.getElementById('new-chat-btn').addEventListener('click', function() {
    saveChatHistory(); // Save current chat history
    saveCurrentChatHistoryWithPreview(); // Save with preview
    // Clear the chat box and input fields
    document.getElementById('chat-box').innerHTML = '';
    document.getElementById('user-input').value = '';
    // Optionally clear chat history from local storage if you want to start fresh
    localStorage.removeItem('chatHistory');
    updateChatHistoryList(); // Update the chat history list
});

// Event listener for "Clear Chat History" button
document.getElementById('clear-chat-btn').addEventListener('click', function() {
    // Clear current chat history in localStorage
    localStorage.removeItem('chatHistory');
    // Clear chat box
    document.getElementById('chat-box').innerHTML = '';
    // Update the chat history list
    updateChatHistoryList();
});

// Function to save chat history to localStorage
function saveChatHistory() {
    const chatHistory = [];
    document.querySelectorAll('#chat-box .message').forEach(messageElement => {
        const text = messageElement.textContent;
        const className = messageElement.classList.contains('user-message') ? 'user-message' : 'bot-message';
        chatHistory.push({ text, className });
    });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    updateChatHistoryList();
}

// Function to save the current chat history with a preview to chatHistories in localStorage
function saveCurrentChatHistoryWithPreview() {
    const chatHistories = JSON.parse(localStorage.getItem('chatHistories')) || [];
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const preview = chatHistory.find(message => message.className === 'user-message')?.text.split(' ').slice(0, 3).join(' ') || 'New Chat';
    
    chatHistories.push({ preview, history: chatHistory });
    localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
}

// Function to load a specific chat session
function loadChatSession(index) {
    const chatHistories = JSON.parse(localStorage.getItem('chatHistories')) || [];
    const chatHistory = chatHistories[index]?.history || [];
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    document.getElementById('chat-box').innerHTML = '';
    chatHistory.forEach(message => appendMessage(message.text, message.className));
}

// Function to append messages to the chat box
function appendMessage(text, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to save messages to localStorage
function saveMessage(text, className) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ text, className });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Function to load chat history from localStorage
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(message => {
        appendMessage(message.text, message.className);
    });
}

// Event listener for send button
document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const fileInput = document.getElementById('file-input').files[0];
    
    if (userInput.trim() !== '' || fileInput) {
        // Send text message
        if (userInput.trim() !== '') {
            appendMessage(userInput, 'user-message');
            saveMessage(userInput, 'user-message');
        }
        
        // Handle file attachment
        if (fileInput) {
            const fileMessage = `File attached: ${fileInput.name}`;
            appendMessage(fileMessage, 'user-message');
            saveMessage(fileMessage, 'user-message');
            document.getElementById('file-input').value = ''; // Clear the file input
        }
        
        document.getElementById('user-input').value = '';
        
        // Simulate a response from the bot
        setTimeout(() => {
            const botResponse = 'This is a simulated response from the bot!mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm';
            appendMessage(botResponse, 'bot-message');
            saveMessage(botResponse, 'bot-message');
        }, 500);
    }
});

// Event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});

// Load chat history when the page loads
window.onload = function() {
    updateChatHistoryList(); // Update the chat history list
    loadChatHistory();
    // Clear user input field to ensure a fresh start
    document.getElementById('user-input').value = '';
};

document.getElementById('file-input-btn').addEventListener('click', function() {
    document.getElementById('file-input').click();
  });  
