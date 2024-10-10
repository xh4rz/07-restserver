const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {
	existeProductoPorId,
	existeCategoriaPorId
} = require('../helpers/db-validators');
const {
	crearProducto,
	obtenerProductos,
	obtenerProducto,
	actualizarProducto,
	borrarProducto
} = require('../controllers/productos');

const router = Router();

// {{url}}/api/productos

// obtener todos los productos - publico
router.get('/', obtenerProductos);

// obtener un producto por id - publico
router.get(
	'/:id',
	[
		check('id', 'No es un id de Mongo válido').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos
	],
	obtenerProducto
);

// crear producto - privado - cualquier persona con un token valido
router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('categoria', 'No es un id de Mongo válido').isMongoId(),
		check('categoria').custom(existeCategoriaPorId),
		validarCampos
	],
	crearProducto
);

// actualizar - privado - cualquiera con token valido
router.put(
	'/:id',
	[
		validarJWT,
		// check('categoria', 'No es un id de Mongo válido').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos
	],
	actualizarProducto
);

// borrar un producto - admin
router.delete(
	'/:id',
	[
		validarJWT,
		esAdminRole,
		check('id', 'No es un id de Mongo válido').isMongoId(),
		check('id').custom(existeProductoPorId),
		validarCampos
	],
	borrarProducto
);

module.exports = router;
