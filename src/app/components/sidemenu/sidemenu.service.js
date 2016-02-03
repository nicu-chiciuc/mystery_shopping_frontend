(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, $filter ) {
    var sections = [];

    // Client Management section
    sections.push({
      name: $filter('translate')('MENU.CLIENT_MANAGEMENT.HEADING'),
      type: 'heading',
      children: [
        {
          name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CLIENTS'),
          type: 'toggle',
          pages: [
            {
              name: 'New client',
              state: 'companies.create',
              type: 'link'
            },
            {
              name: 'List clients',
              state: 'companies.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    // Project Management section
    sections.push({
      name: $filter('translate')('MENU.PROJECT_MANAGEMENT.HEADING'),
      type: 'heading',
      children: [
        {
          name: $filter('translate')('MENU.PROJECT_MANAGEMENT.PROJECTS'),
          type: 'toggle',
          pages: [
            {
              name: 'New project',
              state: 'projects.create',
              type: 'link'
            },
            {
              name : 'List projects',
              state: 'projects',
              type: 'link'
            }
          ]
        },
        {
          name: $filter('translate')('MENU.PROJECT_MANAGEMENT.EVALUATIONS'),
          type: 'toggle',
          pages: [
            {
              name: 'Planned evaluations',
              state: 'evaluations.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    // Questionnaires section
    sections.push({
      name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.HEADING'),
      type: 'heading',
      children: [
        {
          name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.QUESTIONNAIRES'),
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.CREATE_QUESTIONNAIRE'),
              state: 'questionnaires.templates.create',
              type: 'link'
            },
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.LIST_QUESTIONNAIRES'),
              state: 'questionnaires.templates.list',
              type: 'link'
            }
          ]
        },
        {
          name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.SCRIPTS'),
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.CREATE_SCRIPT'),
              state: 'scripts.create',
              type: 'link'
            },
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.LIST_SCRIPTS'),
              state: 'scripts.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    // Shoppers section
    sections.push({
      name: $filter('translate')('MENU.SHOPPERS_MANAGEMENT.HEADING'),
      type: 'heading',
      children: [
        {
          name: $filter('translate')('MENU.SHOPPERS_MANAGEMENT.CREATE_SHOPPER'),
          state: 'shoppers.create',
          type: 'link'
        },
        {
          name: $filter('translate')('MENU.SHOPPERS_MANAGEMENT.LIST_SHOPPERS'),
          state: 'shoppers.list',
          type: 'link'
        }
      ]
    });

    var self;

    $rootScope.$on('$stateChangeSuccess', onStateChange);

    return self = {
      sections: sections,

      selectSection: function(section) {
        self.openedSection = section;
      },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(page) {
        return self.currentPage === page;
      }
    };

    function onStateChange() {
      var matchPage = function(section, page) {
        if ($state.current.name === page.state) {
          self.selectSection(section);
          self.selectPage(section, page);
        }
      };

      sections.forEach(function(section) {
        if (section.children) {
          // matches nested section toggles, such as API or Customization
          section.children.forEach(function(childSection){
            if(childSection.pages){
              childSection.pages.forEach(function(page){
                matchPage(childSection, page);
              });
            }
          });
        }
        else if (section.pages) {
          // matches top-level section toggles, such as Demos
          section.pages.forEach(function(page) {
            matchPage(section, page);
          });
        }
        else if (section.type === 'link') {
          // matches top-level links, such as "Getting Started"
          matchPage(section, section);
        }
      });
    }
  }

})();
