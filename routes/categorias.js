const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');

const router = Router();

// {{url}}/api/categorias

// obtener todas las categorias - publico
router.get('/', (req, res) => {
	res.json('get');
});

// obtener una categoria por id - publico
router.get('/:id', (req, res) => {
	res.json('get - id');
});

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
router.put('/:id', (req, res) => {
	res.json('put');
});

// borrar una categoria - admin
router.delete('/:id', (req, res) => {
	res.json('delete');
});

module.exports = router;
