const categoryApi = {
  index(success, failure) {
    $.ajax({ url: "/categories" }).done(success).fail(failure);
  },
  show(id, success, failure) {
    $.ajax({ url: `/categories/${id}` }).done(success).fail(failure);
  },
  new(success, failure) {
    $.ajax({ url: `/categories/new` }).done(success).fail(failure);
  },
  submit(self, success, failure) {
    $.ajax({
      method: self.method,
      url: self.action,
      dataType: "JSON",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      },
      data: self.category
    }).done(success).fail(failure);
  },
  destroy(self, id, success, failure) {
    $.ajax({
      url: `/categories/${id}`,
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      }
    }).done(success).fail(failure);
  }
}

export default categoryApi;
