const products = require('../products');
const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        });
    },
    'POST /api/products': async (ctx, next) => {
        if(!ctx.request.body.name || !ctx.request.body.manufacturer || !ctx.request.body.price === null || !ctx.request.body.price === undefined) {
            throw new APIError('product:required', 'product name, manufacturer, price is required');
        }
        if(ctx.request.body.price <= 0) {
            throw new APIError('product:price_must_greater_than_zero', 'product price must greater than 0');
        }
        var p = products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },
    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
}
