/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operations related to products
 *
 * /product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     description: Create a new product with the provided name, description, and price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Description:
 *                 type: string
 *               Price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Created product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductDTO'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a list of products
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateProductDTO'
 *       '500':
 *         description: Internal server error
 *
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product found by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductDTO'
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDTO'
 *     responses:
 *       '204':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     CreateProductDTO:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *         Name:
 *           type: string
 *         Description:
 *           type: string
 *         Price:
 *           type: number
 *     UpdateProductDTO:
 *       type: object
 *       properties:
 *         Id:
 *           type: string
 *         Name:
 *           type: string
 *         Description:
 *           type: string
 *         Price:
 *           type: number
 */
