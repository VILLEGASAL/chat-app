let socket = io("http://localhost:3000")

let messageContainer = document.getElementById("message-container")
let messageForm = document.getElementById('send-container')
let messageIput = document.getElementById('message-input')


let appendMessage = (message) => {

    let messageElement = document.createElement("div");

    messageElement.innerText = message;

    messageContainer.append(messageElement);
}

let name = prompt("Enter Your Name : ")
appendMessage("YOU JOINED!");
socket.emit('new-user', name)

socket.on("chat-message", data => {

    appendMessage(`${data.name}: ${data.message}`);
})

socket.on("user-connected", name => {

    appendMessage(`${name} CONNECTED!`);
})

socket.on("user-disconnected", name => {

    appendMessage(`${name} DISCONNECTED!`);
})

messageForm.addEventListener('submit', (e) => {

    e.preventDefault()

    let message = messageIput.value;
    appendMessage(`YOU : ${message}`);
    socket.emit('send-chat-message', message)
    messageIput.value = ""
})

