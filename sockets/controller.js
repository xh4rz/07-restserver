const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {
	const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

	if (!usuario) {
		return socket.disconnect();
	}

	console.log(usuario);

	// agregar el usuario conectado
	chatMensajes.conectarUsuario(usuario);

	io.emit('usuarios-activos', chatMensajes.usuariosArr);

	// limpiar cuando alguien se desconecte
	socket.on('disconnect', () => {
		chatMensajes.desconectarUsuario(usuario.id);

		io.emit('usuarios-activos', chatMensajes.usuariosArr);
	});
};

module.exports = {
	socketController
};
