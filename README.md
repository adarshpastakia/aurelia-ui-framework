## Aurelia UI Framework
#### A bespoke UI Framework for business applications

---

Demo Site: [https://aurelia-ui-framework.herokuapp.com](https://aurelia-ui-framework.herokuapp.com)

---

![Stars](https://img.shields.io/github/stars/adarshpastakia/aurelia-ui-framework.svg?logoColor=blue&style=social&logo=github "GitHub Stars")
![Forks](https://img.shields.io/github/forks/adarshpastakia/aurelia-ui-framework.svg?logoColor=blue&style=social&logo=github "GitHub Forks")
![Issues](https://img.shields.io/github/issues/adarshpastakia/aurelia-ui-framework.svg?logoColor=blue&style=social&logo=github "GitHub Issues")

![Build](https://img.shields.io/travis/adarshpastakia/aurelia-ui-framework/master.svg?style=popout-square&logo=travis&label= "Travis Build")
![Coverage](https://img.shields.io/codecov/c/github/adarshpastakia/aurelia-ui-framework/master.svg?style=popout-square&logo=codecov&label= "Code Coverage")
![NPM Release](https://img.shields.io/npm/v/aurelia-ui-framework/next.svg?style=popout-square&logo=npm&label= "NPM Release")

---

* Running examples

  `npm start`

* Building the plugin

  `npm dist`
  
* Using the plugin

  - NPM
    
    `npm i aurelia-ui-framework`
  
  - Yarn
  
    `yarn add aurelia-ui-framework`

* Using plugin as local link

  `aurelia-ui-framework$> npm link`

  `project$> npm link aurelia-ui-framework`

  > webpack.config 
  > ```
  > resolve.symlinks = false
  > resolve.alias: {
  >        'aurelia-binding': path.resolve(__dirname, 'node_modules/aurelia-binding'),
  >        'aurelia-framework': path.resolve(__dirname, 'node_modules/aurelia-framework'),
  >        'aurelia-templating': path.resolve(__dirname, 'node_modules/aurelia-templating'),
  >        'aurelia-pal': path.resolve(__dirname, 'node_modules/aurelia-pal')
  >      }
  >
  > ```

---

- #### Package Dependencies
  - `date-fns`
  - `numeral`
  - `kramed`
  - `libphonenumber-js`
  - `resize-observer-polyfill`


- #### Optional Dependencies
  - `@mdi/font`
  - `zxcvbn` _Password strength meter_


- #### Dev Dependencies
  - `awesome-typescript-loader`
  - `stylelint`
  - `stylelint-order`
  - `stylelint-webpack-plugin`
  - `tslint`
  - `tslint-eslint-rules`
  - `tslint-config-prettier`
  - `tslint-webpack-plugin `
