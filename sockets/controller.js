const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket(), io) => {
	const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

	if (!usuario) {
		return socket.disconnect();
	}

	// agregar el usuario conectado
	chatMensajes.conectarUsuario(usuario);

	io.emit('usuarios-activos', chatMensajes.usuariosArr);

	socket.emit('recibir-mensajes', chatMensajes.ultimos10);

	// conectar a una sala especial
	socket.join(usuario.id);

	// limpiar cuando alguien se desconecte
	socket.on('disconnect', () => {
		chatMensajes.desconectarUsuario(usuario.id);

		io.emit('usuarios-activos', chatMensajes.usuariosArr);
	});

	socket.on('enviar-mensaje', ({ uid, mensaje }) => {
		if (uid) {
			// mensaje privado
			socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje });
		} else {
			chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);

			io.emit('recibir-mensajes', chatMensajes.ultimos10);
		}
	});
};

module.exports = {
	socketController
};
