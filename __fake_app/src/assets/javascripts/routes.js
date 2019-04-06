var routes = [];

export default routes;

import Home from '../../views/home/index.vue'

routes.push({ id: 'Home', component: Home, text: 'Home', path: '/', })

import Categories from '../../views/category/index.vue'
import CategoryNew from '../../views/category/new.vue'
import CategoryEdit from '../../views/category/edit.vue'
import CategoryShow from '../../views/category/show.vue'

routes.push({ id: 'Categories', component: Categories, text: 'Categories', path: '/categories' })
routes.push({ id: 'CategoryNew', component: CategoryNew, path: '/categories/new' })
routes.push({ id: 'CategoryEdit', component: CategoryEdit, path: '/categories/:id/edit', props: true  })
routes.push({ id: 'CategoryShow', component: CategoryShow, path: '/categories/:id', props: true  })

import Products from '../../views/product/index.vue'
import ProductNew from '../../views/product/new.vue'
import ProductEdit from '../../views/product/edit.vue'
import ProductShow from '../../views/product/show.vue'

routes.push({ id: 'Products', component: Products, text: 'Products', path: '/products' })
routes.push({ id: 'ProductNew', component: ProductNew, path: '/products/new' })
routes.push({ id: 'ProductEdit', component: ProductEdit, path: '/products/:id/edit', props: true  })
routes.push({ id: 'ProductShow', component: ProductShow, path: '/products/:id', props: true  })

import Comments from '../../views/comment/index.vue'
import CommentNew from '../../views/comment/new.vue'
import CommentEdit from '../../views/comment/edit.vue'
import CommentShow from '../../views/comment/show.vue'

routes.push({ id: 'Comments', component: Comments, text: 'Comments', path: '/comments' })
routes.push({ id: 'CommentNew', component: CommentNew, path: '/comments/new' })
routes.push({ id: 'CommentEdit', component: CommentEdit, path: '/comments/:id/edit', props: true  })
routes.push({ id: 'CommentShow', component: CommentShow, path: '/comments/:id', props: true  })

import Items from '../../views/item/index.vue'
import ItemNew from '../../views/item/new.vue'
import ItemEdit from '../../views/item/edit.vue'
import ItemShow from '../../views/item/show.vue'

routes.push({ id: 'Items', component: Items, text: 'Items', path: '/items' })
routes.push({ id: 'ItemNew', component: ItemNew, path: '/items/new' })
routes.push({ id: 'ItemEdit', component: ItemEdit, path: '/items/:id/edit', props: true  })
routes.push({ id: 'ItemShow', component: ItemShow, path: '/items/:id', props: true  })
