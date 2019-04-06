const itemApi = {
  index(success, failure) {
    $.ajax({ url: "/items" }).done(success).fail(failure);
  },
  show(id, success, failure) {
    $.ajax({ url: `/items/${id}` }).done(success).fail(failure);
  },
  new(success, failure) {
    $.ajax({ url: `/items/new` }).done(success).fail(failure);
  },
  submit(self, success, failure) {
    $.ajax({
      method: self.method,
      url: self.action,
      dataType: "JSON",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      },
      data: self.item
    }).done(success).fail(failure);
  },
  destroy(self, id, success, failure) {
    $.ajax({
      url: `/items/${id}`,
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": self.csrf
      }
    }).done(success).fail(failure);
  }
}

export default itemApi;
