(function() {

  'use strict';

  const yeoman = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');

  module.exports = yeoman.Base.extend({
    prompting: function () {
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
        message: 'What\'s the title of the book?',
        default: 'Real Python'
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
        message: 'Please enter a description for the book.',
        default: 'Real Python teaches programming and web development through hands-on, interesting examples that are useful and fun! Join the thousands who have already benefited from these unique Python courses and download your copy today. Get three courses, with over 1,300 pages of content - packed with exercises, sample files, assignments, and bonus videos for only $60!'
      }, {
        type: 'input',
        name: 'price',
        message: 'What price would you like displayed for your book?',
        default: '60'
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
      var marketingColor = '';
      var socialColor = '';
      var heroColor = '';
      var hrColor = '';
      var aColor = '';
      var borderColor = '';
      if (this.props.whichColor === 'orange') {
        marketingColor = '#f26922';
        socialColor = '#b0402a';
        heroColor = '#903605';
        hrColor = '#f7681a';
        aColor = '#d9563c';
        borderColor = '#c94d35';
      } else if (this.props.whichColor === 'blue'){
        marketingColor = '#205e9e';
        socialColor = '#62d41e';
        heroColor = socialColor;
        hrColor = socialColor;
        aColor = socialColor;
        borderColor = socialColor;
      } else if (this.props.whichColor === 'green') {
        marketingColor = '#62d41e';
        socialColor = '#ab1894';
        heroColor = socialColor;
        hrColor = socialColor;
        aColor = socialColor;
        borderColor = socialColor;
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
      );
    }
  });

}());
