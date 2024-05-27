const { Router } = require('express');
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch
} = require('../controllers/usuarios');
const { check } = require('express-validator');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post(
	'/',
	[check('correo', 'El correo no es váalido').isEmail()],
	usuariosPost
);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
