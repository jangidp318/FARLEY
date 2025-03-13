const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });


    io.on('connection', (socket) => {
        console.log('New socket connection:', socket.id);


        socket.on('join', async (data) => {
            const { userId, userType } = JSON.parse(data);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }
        })


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = JSON.parse(data);
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', 'Invalid location data');
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };