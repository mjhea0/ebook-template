(function() {

  'use strict';

  const yeoman = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');

  module.exports = yeoman.Base.extend({
    prompting: function() {
      this.log(yosay(
        'Welcome to the grand ' + chalk.red('generator-ebook-template') + ' generator!'
      ));

      const prompts = [{
        type: 'list',
        name: 'whichColor',
        message: 'Which color template would you like to use?',
        choices: ['orange', 'green', 'blue']
      }, {
        type: 'input',
        name: 'title',
        message: 'What\'s the title of the book?'
      }];

      return this.prompt(prompts).then(function(props) {
        this.props = props;
      }.bind(this));
    },

    writing: function() {
      this.fs.copyTpl(
        this.templatePath('./index.html'),
        this.destinationPath('./index.html'),
        {
          title: this.props.title
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
      let colors = {};
      if (this.props.whichColor === 'orange') {
        colors.marketingColor = '#f26922';
        colors.socialColor = '#b0402a';
        colors.heroColor = '#903605';
        colors.hrColor = '#f7681a';
        colors.aColor = '#d9563c';
        colors.borderColor = '#c94d35';
      } else if (this.props.whichColor === 'blue'){
        colors.marketingColor = '#205e9e';
        colors.socialColor = '#62d41e';
        colors.heroColor = colors.socialColor;
        colors.hrColor = colors.socialColor;
        colors.aColor = colors. socialColor;
        colors.borderColor = colors.socialColor;
      } else if (this.props.whichColor === 'green') {
        colors.marketingColor = '#62d41e';
        colors.socialColor = '#ab1894';
        colors.heroColor = colors.socialColor;
        colors.hrColor = colors.socialColor;
        colors.aColor = colors.socialColor;
        colors.borderColor = colors.socialColor;
      }
      this.fs.copyTpl(
        this.templatePath('../assets/css/styles.css'),
        this.destinationPath('./assets/css/styles.css'),
        {
          marketingColor: colors.marketingColor,
          socialColor: colors.socialColor,
          heroColor: colors.heroColor,
          hrColor: colors.hrColor,
          aColor: colors.aColor,
          borderColor: colors.borderColor
        }
      );
    }

    // install: function() {
    //   this.installDependencies();
    // }

  });


}());
