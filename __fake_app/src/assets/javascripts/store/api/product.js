const productApi = {
  index(success, failure) {
    $.ajax({ url: "/products" }).done(success).fail(failure);
  },
  show(id, success, failure) {
    $.ajax({ url: `/products/${id}` }).done(success).fail(failure);
  },
  new(success, failure) {
    $.ajax({ url: `/products/new` }).done(success).fail(failure);
  },
  submit(self, success, failure) {
    $.ajax({
      method: self.method,
      url: self.action,
      dataType: "JSON",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      },
      data: self.product
    }).done(success).fail(failure);
  },
  destroy(self, id, success, failure) {
    $.ajax({
      url: `/products/${id}`,
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      }
    }).done(success).fail(failure);
  }
}

export default productApi;
