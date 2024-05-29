const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verificar si el rol es valido
const esRoleValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol });

	if (!existeRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`);
	}
};

// Verificar si el correo existe
const emailExiste = async (correo = '') => {
	const existeEmail = await Usuario.findOne({ correo });

	if (existeEmail) {
		throw new Error(`El correo: ${correo}, ya está registrado`);
	}
};

// Verificar si el id existe
const existeUsuarioPorId = async (id) => {
	const existeUsuario = await Usuario.findById(id);

	if (!existeUsuario) {
		throw new Error(`El id no existe ${id}`);
	}
};

module.exports = { esRoleValido, emailExiste, existeUsuarioPorId };
