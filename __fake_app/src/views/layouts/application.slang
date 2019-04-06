doctype html
html
  head
    title Fake App using Amber
    meta charset="utf-8"
    meta http-equiv="X-UA-Compatible" content="IE=edge"
    meta name="viewport" content="width=device-width, initial-scale=1"
    link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
    link rel="stylesheet" href="/dist/main.bundle.css"

  body
    / This #app node will be replaced by Vue.js when SPA is triggered
    #app
      .masthead
        .container
          nav.nav
            == render(partial: "layouts/_nav.slang")
      .container
        .row
          .col-sm
            - flash.each do |key, value|
              div class="alert alert-#{key}"
                p = flash[key]
        .row
          .col-sm-12.main
             == content

    script src="https://code.jquery.com/jquery-3.3.1.min.js"
    script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
    script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
    - if @load_vuejs
      script src="/dist/main.bundle.js"