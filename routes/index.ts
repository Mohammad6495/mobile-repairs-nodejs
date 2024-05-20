import express from 'express';
import accountRouter from './account'
import categoryRouter from './category'
import courseRouter from './course';
import headlineRouter from './headline';
import eductionalVideoRouter from './eductionalVideo';
import cartRouter from './cart';
import orderRouter from './order';

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
// createdCourse
/**
* @swagger
* /course/create:
*   post:
*     tags:
*       - Course
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
*               description:
*                 type: string
*               viewCount:
*                 type: number
*               price:
*                 type: number
*               courseLevel:
*                 type: integer
*                 enum:
*                   - 0
*                   - 1
*                   - 2
*               courseStatus:
*                 type: integer
*                 enum:
*                   - 0
*                   - 1
*                   - 2
*               teacher:
*                 type: string
*               isAvailable:
*                 type: boolean
*               isFree:
*                 type: boolean
*               category:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editCourse
/**
* @swagger
* /course/edit:
*   post:
*     tags:
*       - Course
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: string
*               title:
*                 type: string
*               image:
*                 type: file
*               description:
*                 type: string
*               viewCount:
*                 type: number
*               price:
*                 type: number
*               courseLevel:
*                 type: integer
*                 enum:
*                   - 0
*                   - 1
*                   - 2
*               courseStatus:
*                 type: integer
*                 enum:
*                   - 0
*                   - 1
*                   - 2
*               teacher:
*                 type: string
*               isAvailable:
*                 type: boolean
*               isFree:
*                 type: boolean
*               category:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /course/getAll:
*   get:
*     tags:
*       - Course
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
* /course/getAllClient:
*   get:
*     tags:
*       - Course
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /course/changeavailable:
*   post:
*     tags:
*       - Course
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
// removeCourse
/**
* @swagger
* /course/remove:
*   delete:
*     tags:
*       - Course
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
// detailCourse
/**
* @swagger
* /course/detail:
*   get:
*     tags:
*       - Course
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/course', courseRouter)

// createdHeadline
/**
* @swagger
* /headline/create:
*   post:
*     tags:
*       - Headline
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               description:
*                 type: string
*               course:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editheadline
/**
* @swagger
* /headline/edit:
*   post:
*     tags:
*       - Headline
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               description:
*                 type: string
*               id:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /headline/getAll:
*   get:
*     tags:
*       - Headline
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
*       - in: query
*         name: courseId
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAllClient
/**
* @swagger
* /headline/getAllClient:
*   get:
*     tags:
*       - Headline
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /headline/changeavailable:
*   post:
*     tags:
*       - Headline
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
// removeheadline
/**
* @swagger
* /headline/remove:
*   delete:
*     tags:
*       - Headline
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
appRouter.use('/headline', headlineRouter)

// createdEductionalVideo
/**
* @swagger
* /eductionalVideo/create:
*   post:
*     tags:
*       - EductionalVideo
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               headLine:
*                 type: string
*               isPayActive:
*                 type: string
*               videoTime:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// editeductionalVideo
/**
* @swagger
* /eductionalVideo/edit:
*   post:
*     tags:
*       - EductionalVideo
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*               isPayActive:
*                 type: string
*               videoTime:
*                 type: string
*               id:
*                 type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAll
/**
* @swagger
* /eductionalVideo/getAll:
*   get:
*     tags:
*       - EductionalVideo
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
*       - in: query
*         name: headlineId
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
// getAllClient
/**
* @swagger
* /eductionalVideo/getAllClient:
*   get:
*     tags:
*       - EductionalVideo
*     responses:
*       '200':
*         description: Successful response
*/
// changeavailable
/**
* @swagger
* /eductionalVideo/changeavailable:
*   post:
*     tags:
*       - EductionalVideo
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
// removeeductionalVideo
/**
* @swagger
* /eductionalVideo/remove:
*   delete:
*     tags:
*       - EductionalVideo
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
appRouter.use('/eductionalVideo', eductionalVideoRouter)


// submitfactor
/**
* @swagger
* /cart/submitfactor:
*   post:
*     tags:
*       - Cart
*     security:
*       - BearerAuth: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               items:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     productId:
*                       type: string
*                     productCount:
*                       type: integer
*     responses:
*       '200':
*         description: Successful response
*/
// getfactor
/**
* @swagger
* /cart/getfactor:
*   post:
*     tags:
*       - Cart
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               items:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     productId:
*                       type: string
*                     productCount:
*                       type: integer
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/cart', cartRouter)

// submitfactor
/**
* @swagger
* /order/getAll:
*   get:
*     tags:
*       - Order
*     security:
*       - BearerAuth: []
*     responses:
*       '200':
*         description: Successful response
*/
// getfactor
/**
* @swagger
* /order/detail:
*   get:
*     tags:
*       - Order
*     parameters:
*       - in: query
*         name: id
*         schema:
*           type: string
*     responses:
*       '200':
*         description: Successful response
*/
appRouter.use('/order', orderRouter)

export default appRouter;