const categoryApi = {
  index(success, failure, url = "/categories") {
    $.ajax({ url: url }).done(success).fail(failure);
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
      data: self.localCategory
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
