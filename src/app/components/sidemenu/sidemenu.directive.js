(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, $location ) {
    var sections = [];

    sections.push({
      name: 'Project Management',
      type: 'heading',
      children: [
        {
          name: 'Projects',
          type: 'toggle',
          pages: [
            {
              name: 'New',
              url: 'projects/new',
              type: 'link'
            },
            {
              name : 'List',
              url: 'projects/',
              type: 'link'
            }
          ]
        },
        {
          name: 'Client Management',
          type: 'toggle',
          pages: [
            {
              name: 'Clients',
              url: 'clients',
              type: 'link'
            }
          ]
        }
      ]
    });

    var self;

    $rootScope.$on('$locationChangeSuccess', onLocationChange);

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

    function onLocationChange() {
      var path = $location.path();
      var introLink = {
        name: "Introduction",
        url:  "/",
        type: "link"
      };

      if (path == '/') {
        self.selectSection(introLink);
        self.selectPage(introLink, introLink);
        return;
      }

      var matchPage = function(section, page) {
        if (path.indexOf(page.url) !== -1) {
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
