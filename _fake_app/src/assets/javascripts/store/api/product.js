const productApi = {
  all(success, failure, url = "/products") {
    $.ajax({ url: url }).done(success).fail(failure);
  },
  show(id, success, failure) {
    $.ajax({ url: `/products/${id}` }).done(success).fail(failure);
  },
  edit(id, success, failure) {
    $.ajax({ url: `/products/${id}/edit` }).done(success).fail(failure);
  },
  submit(method, action, data, success, failure) {
    $.ajax({
      url: action,
      method: method,
      dataType: "JSON",
      headers: {
        "X-CSRF-TOKEN": window.csrf
      },
      data: data
    }).done(success).fail(failure);
  },
  destroy(id, success, failure) {
    let request = $.ajax({
      url: `/products/${id}`,
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": window.csrf
      }
    }).done(success).fail(failure);
  }
}

export default productApi;
