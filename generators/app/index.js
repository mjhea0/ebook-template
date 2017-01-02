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
      const prompts = [
        {
          name: 'name',
          message: 'Your name (for the LICENSE)?',
          required: true,
          default: 'change me'
        },
        {
          type: 'list',
          name: 'whichColor',
          message: 'Which color template would you like to use?',
          choices: ['orange', 'green', 'blue']
        },
        {
          type: 'input',
          name: 'title',
          message: 'What\'s the title of the book?',
          default: 'Green Apple'
        },
        {
          type: 'confirm',
          name: 'picturePrompt',
          message: 'Would you like to display a book cover picture?',
          default: true
        },
        {
          when: function (response) {
            if (response.picturePrompt) {
            return response.picturePrompt;
          } else {
            return false;
          }
        },
          type: 'input',
          name: 'pictureUrl',
          message: 'Please input a URL.',
          default : 'http://placehold.it/228x316'
        },
        {
          type: 'input',
          name: 'lead',
          message: 'Please enter a lead slogan.',
          default: 'Responsive landing page for selling an ebook'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Please enter a description for the book.',
          default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut scelerisque nibh, at sollicitudin arcu. Donec viverra ullamcorper pulvinar. Proin vel nulla sed diam tempor ullamcorper sed quis eros. Phasellus nunc elit, viverra aliquet elit auctor, luctus aliquam justo. Sed et dignissim nisl. Pellentesque cursus augue id elit tempor cursus. Suspendisse potenti.'
        },
        {
          type: 'input',
          name: 'price',
          message: 'What price would you like displayed for your book?',
          default: '60'
        },
        {
          type: 'input',
          name: 'authorPhoto',
          message: 'Please input a URL for the author photo.',
          default : 'http://placehold.it/135x135'
        },
        {
          type: 'confirm',
          name: 'facebookPrompt',
          message: 'Would you like to add a link to your Facebook profile?',
          default: true
        },
        {
          when: function (response) {
            if (response.facebookPrompt) {
            return response.facebookPrompt;
          } else {
            return false;
          }
        },
          type: 'input',
          name: 'facebookUrl',
          message: 'Please input a URL.',
          default : 'https://facebook.com'
        },
        {
          type: 'confirm',
          name: 'twitterPrompt',
          message: 'Would you like to add a link to your Twitter profile?',
          default: true
        },
        {
          when: function (response) {
            if (response.twitterPrompt) {
            return response.twitterPrompt;
          } else {
            return false;
          }
        },
          type: 'input',
          name: 'twitterUrl',
          message: 'Please input a URL.',
          default : 'https://twitter.com'
        },
      ];
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
          lead: this.props.lead,
          picturePrompt: this.props.picturePrompt,
          pictureUrl: this.props.pictureUrl,
          description: this.props.description,
          price: this.props.price,
          authorPhoto: this.props.authorPhoto,
          facebook: this.props.facebookUrl,
          twitter: this.props.twitterUrl
        }
      );
      this.fs.copy(
        this.templatePath('./assets/font'),
        this.destinationPath('./assets/font')
      );
      this.fs.copy(
        this.templatePath('./assets/ico'),
        this.destinationPath('./assets/ico')
      );
      this.fs.copy(
        this.templatePath('./assets/img'),
        this.destinationPath('./assets/img')
      );
      this.fs.copy(
        this.templatePath('dot-gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          year: (new Date()).getFullYear(),
          name: this.props.name
        }
      );
      let marketingColor = '';
      let socialColor = '';
      let heroColor = '';
      let hrColor = '';
      let aColor = '';
      let borderColor = '';
      if (this.props.whichColor === 'orange') {
        marketingColor = '#F26822';
        socialColor = '#B03F2A';
        heroColor = '#903605';
        hrColor = '#F7671A';
        aColor = '#D9573C';
        borderColor = '#C94C35';
      } else if (this.props.whichColor === 'blue'){
        marketingColor = '#205E9E';
        socialColor = '#1D5A6E';
        heroColor = '#0A325E';
        hrColor = '#1C5BA1';
        aColor = '#2A6E88';
        borderColor = '#25687E';
      } else if (this.props.whichColor === 'green') {
        marketingColor = '#17A174';
        socialColor = '#205E9E';
        heroColor = '#0A325E';
        hrColor = '#1C5BA1';
        aColor = '#2A6E88';
        borderColor = '#25687E';
      }
      this.fs.copyTpl(
        this.templatePath('./assets/css/styles.css'),
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
    },
    install: function () {
      this.installDependencies();
    }
  });

}());
