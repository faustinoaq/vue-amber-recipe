# Amber + Vue

![amber+vue](./app/public/dist/images/logo.png)

A SPA (Single Page Application) recipe using Vue.js and Amber Framework.

```
amber new app -r https://codeload.github.com/faustinoaq/vue-amber-recipe/zip/0.0.1
cd app
amber g scaffold Category title:string
amber g scaffold Product title:string description:text category:reference
amber g scaffold Comment body:text product:reference
```

## Notes

* This recipe generates models with [Granite](https://github.com/amberframework/granite) ORM only.
* Vue generated templates use [Pug](https://pugjs.org/api/getting-started.html) language.

## Tests

To run the test suite:

```
crystal spec
```

## Contributing

1. Fork it ( https://github.com/faustinoaq/fake_app/fork )
2. Create your feature branch ( `git checkout -b my-new-feature` )
3. Commit your changes ( `git commit -am 'Add some feature'` )
4. Push to the branch ( `git push origin my-new-feature` )
5. Create a new Pull Request

## Contributors

- [faustinoaq](https://github.com/faustinoaq) Faustino Aguilar - creator, maintainer
