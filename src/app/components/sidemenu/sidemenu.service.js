(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, $location ) {
    var sections = [];

    // Project Management section
    sections.push({
      name: 'Project Management',
      type: 'heading',
      children: [
        {
          name: 'Projects',
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
        }
      ]
    });

    // Client Management section
    sections.push({
      name: 'Client Management',
      type: 'heading',
      children: [
        {
          name: 'Clients',
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
