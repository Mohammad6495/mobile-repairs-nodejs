import express from 'express';
import accountRouter from './account'
import categoryRouter from './category'

const appRouter = express();
// login-panel
/**
* @swagger
* /account/login-panel:
*   post:
*     tags:
*       - Authentication
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userName:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     token:
*                       type: string
*/
// //getprofile  
/**
* @swagger
* /account/getprofile:
*   get:
*     tags:
*       - Authentication
*     security:
*       - BearerAuth: []
*     responses:
*       '200':
*         description: Successful response
*/

appRouter.use('/account', accountRouter)
// createdCategory
/**
* @swagger
* /category/create:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               image:
*                 type: file
*     responses:
*       '200':
*         description: Successful response
*/
// editCategory
/**
* @swagger
* /category/edit:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               id:
*                 type: string
*               image:
*                 type: file
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /category/getAll:
*   get:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: search
*         schema:
*           type: string
*       - in: query
*         name: pageSize
*         schema:
*           type: string
*       - in: query
*         name: currentPage
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAllClient
/**
* @swagger
* /category/getAllClient:
*   get:
*     tags:
*       - Category
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /category/changeavailable:
*   post:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// removecategory
/**
* @swagger
* /category/remove:
*   delete:
*     tags:
*       - Category
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/category', categoryRouter)

export default appRouter;