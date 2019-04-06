var routes = [];

export default routes;

import Home from '../../views/home/index.vue'

routes.push({component: Home, text: 'Home', path: '/', })

import Categories from '../../views/category/index.vue'
import CategoryNew from '../../views/category/new.vue'
import CategoryEdit from '../../views/category/edit.vue'
import CategoryShow from '../../views/category/show.vue'

routes.push({component: Categories, text: 'Categories', path: '/categories' })
routes.push({component: CategoryNew, path: '/categories/new' })
routes.push({component: CategoryEdit, path: '/categories/:id/edit', props: true })
routes.push({component: CategoryShow, path: '/categories/:id', props: true })

import Products from '../../views/product/index.vue'
import ProductNew from '../../views/product/new.vue'
import ProductEdit from '../../views/product/edit.vue'
import ProductShow from '../../views/product/show.vue'

routes.push({component: Products, text: 'Products', path: '/products' })
routes.push({component: ProductNew, path: '/products/new' })
routes.push({component: ProductEdit, path: '/products/:id/edit' })
routes.push({component: ProductShow, path: '/products/:id' })
