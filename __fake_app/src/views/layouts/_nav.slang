- active = context.request.path == "/" ? "active" : ""
a class="nav-item #{active}" href="/" Home
- active = context.request.path == "/categories" ? "active" : ""
a class="nav-item #{active}" href="/categories" Categories
- active = context.request.path == "/products" ? "active" : ""
a class="nav-item #{active}" href="/products" Products
- active = context.request.path == "/comments" ? "active" : ""
a class="nav-item #{active}" href="/comments" Comments
- active = context.request.path == "/items" ? "active" : ""
a class="nav-item #{active}" href="/items" Items
