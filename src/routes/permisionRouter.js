const express = require('express');
const permissionsController = require('../controllers/permisionController'); 
const router = express.Router();

router.route('/')
    .post(permissionsController.createPermission) 
    .get(permissionsController.getAllPermissions); 

router.route('/:id')
    .get(permissionsController.getPermissionById) 
    .patch(permissionsController.updatePermission) 
    .delete(permissionsController.deletePermission);

module.exports = router;
