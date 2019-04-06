- active = context.request.path == "/" ? "active" : ""
a class="nav-item #{active}" href="/" Home
- active = context.request.path == "/categories" ? "active" : ""
a class="nav-item #{active}" href="/categories" Categories
- active = context.request.path == "/products" ? "active" : ""
a class="nav-item #{active}" href="/products" Products
