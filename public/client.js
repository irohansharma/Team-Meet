const socket = io()
var textarea = document.querySelector('#textarea')
var messageArea = document.querySelector('.userMessageArea')


getName();
var name;

// Alert to get userName
function getName(){
       name = prompt('Enter your name: ')
        if(!name)
            getName();
}

// Extracting value from TextArea
textarea.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        var userMessage = textarea.value;
        textarea.value = ""
        sendMessage(userMessage);
    }
})


/* SendMessage - 
    1. Append locally
    2. Emit to other client
*/

function sendMessage(message) {
    var msg = {
        user: name,
        message: message
    }
    // Append mssg on senders window
    appendMessage(msg, 'outgoing')
    // Send to server so that other clients get updated 
    socket.emit('message', msg)

}


// Recieves call from both client and server
function appendMessage(msg, type) {
    let messageBox = document.createElement('div')
    let className = type
    messageBox.classList.add(className, 'message')

    let messageData = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    messageBox.innerHTML = messageData;
    messageArea.appendChild(messageBox)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})





