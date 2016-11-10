'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the grand ' + chalk.red('generator-ebook-template') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'whichColor',
      message: 'Which color template would you like to use?',
      choices: ['orange', 'green', 'blue']
    }, {
      type: 'input',
      name: 'title',
      message: 'What\'s the title of the book?'
    }, {
      type: 'confirm',
      name: 'picturePrompt',
      message: 'Would you like to upload a book cover picture?'
    }, {
      when: function (response) {
        if (response.picturePrompt) {
          return response.picturePrompt;
        } else {
          response.pictureUrl = 'http://placehold.it/350x150';
        }
      },
      type: 'input',
      name: 'pictureUrl',
      message: 'Please input a URL.'
    }, {
      type: 'input',
      name: 'description',
      message: 'Please enter a description for the book.'
    }, {
      type: 'input',
      name: 'price',
      message: 'What price would you like displayed for your book?'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('./index.html'),
      this.destinationPath('./index.html'),
      {
        title: this.props.title,
        pictureUrl: this.props.pictureUrl,
        description: this.props.description,
        price: this.props.price
      }
    );
    this.fs.copy(
      this.templatePath('../assets/font'),
      this.destinationPath('./assets/font')
    );
    this.fs.copy(
      this.templatePath('../assets/ico'),
      this.destinationPath('./assets/ico')
    );
    this.fs.copy(
      this.templatePath('../assets/img'),
      this.destinationPath('./assets/img')
    );
    if (this.props.whichColor === 'orange') {
      var marketingColor = '#f26922';
      var socialColor = '#b0402a';
      var heroColor = '#903605';
      var hrColor = '#f7681a';
      var aColor = '#d9563c';
      var borderColor = '#c94d35';
    } else if (this.props.whichColor === 'blue'){
      var marketingColor = '#205e9e';
      var socialColor = '#62d41e';
      var heroColor = socialColor;
      var hrColor = socialColor;
      var aColor = socialColor;
      var borderColor = socialColor;
    } else if (this.props.whichColor === 'green') {
      var marketingColor = '#62d41e';
      var socialColor = '#ab1894';
      var heroColor = socialColor;
      var hrColor = socialColor;
      var aColor = socialColor;
      var borderColor = socialColor;
    }
    this.fs.copyTpl(
      this.templatePath('../assets/css/styles.css'),
      this.destinationPath('./assets/css/styles.css'),
      {
        marketingColor: marketingColor,
        socialColor: socialColor,
        heroColor: heroColor,
        hrColor: hrColor,
        aColor: aColor,
        borderColor: borderColor
      }
    )
  },

  install: function () {
    this.installDependencies();
  }

});
