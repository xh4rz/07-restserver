const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {
	crearCategoria,
	obtenerCategorias,
	obtenerCategoria,
	actualizarCategoria,
	borrarCategoria
} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categorias

// obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// obtener una categoria por id - publico
router.get(
	'/:id',
	[
		check('id', 'No es un id de Mongo válido').isMongoId(),
		check('id').custom(existeCategoriaPorId),
		validarCampos
	],
	obtenerCategoria
);

// crear categoria - privado - cualquier persona con un token valido
router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		validarCampos
	],
	crearCategoria
);

// actualizar - privado - cualquiera con token valido
router.put(
	'/:id',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('id').custom(existeCategoriaPorId),
		validarCampos
	],
	actualizarCategoria
);

// borrar una categoria - admin
router.delete(
	'/:id',
	[
		validarJWT,
		esAdminRole,
		check('id', 'No es un id de Mongo válido').isMongoId(),
		check('id').custom(existeCategoriaPorId),
		validarCampos
	],
	borrarCategoria
);

module.exports = router;
