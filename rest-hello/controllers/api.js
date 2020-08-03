var products = [{
    name: 'iPhone',
    price: 6999,
}, {
    name: 'Kindle',
    price: 999,
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            products: products
        }
    },
    // curl -H 'Content-Type: application/json' -X POST -d '{"name":"XBox","price":3999}' http://localhost:3000/api/products
    'POST /api/products': async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price,
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
}
