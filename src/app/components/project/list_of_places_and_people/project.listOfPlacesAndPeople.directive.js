(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectListOfPlacesAndPeople', msProjectListOfPlacesAndPeople);

  /** @ngInject */
  function msProjectListOfPlacesAndPeople () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/list_of_places_and_people/project-list-of-places-and-people.html',
      scope: {
        project: '=',
        companies: '=',
        saveProjectMethod: '&'
      },
      controller: ProjectListOfPlacesAndPeopleController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectListOfPlacesAndPeopleController ( $filter, $log ) {
      $log.debug('Entered ProjectListOfPlacesAndPeopleController');
      var vm = this;

      vm.project.research_methodology.places_to_assess_repr = vm.project.research_methodology.places_to_assess_repr || [];
      vm.project.research_methodology.people_to_assess_repr = vm.project.research_methodology.people_to_assess_repr || [];

      var personItemValuePropFn = function ( item ) {
        return {
          person_id: item.id,
          person_type: item.contentTypeId
        };
      };

      var placeItemValuePropFn = function ( item ) {
        return {
          place_id: item.id,
          place_type: item.contentTypeId
        };
      };

      vm.listOfPlacesAndPeopleNestedCheckboxListOptions = {
        showLegend: true,
        legend: $filter('translate')('PROJECT.METHODOLOGY.LIST_OF_PLACES_AND_PEOPLE'),
        children: [
          {
            itemsProp: 'departments_repr',
            itemLabelProp: 'name',
            itemValueProp: placeItemValuePropFn,
            type: 'ignored',
            contentType: 'department',
            includeInList: false,
            children: [
              //{
              //  itemsProp: 'managers',
              //  itemLabelProp: 'fullName',
              //  itemValueProp: personItemValuePropFn,
              //  type: 'ignored',
              //  contentType: 'clientmanager',
              //  includeInList: false
              //},
              {
                itemsProp: 'entities',
                itemLabelProp: 'name',
                itemValueProp: placeItemValuePropFn,
                type: 'place',
                contentType: 'entity',
                includeInList: true,
                children: [
                  {
                    itemsProp: 'managers',
                    itemLabelProp: 'fullName',
                    itemValueProp: personItemValuePropFn,
                    type: 'person',
                    contentType: 'clientmanager',
                    includeInList: true
                  },
                  {
                    itemsProp: 'employees',
                    itemLabelProp: 'fullName',
                    itemValueProp: personItemValuePropFn,
                    type: 'person',
                    contentType: 'clientemployee',
                    includeInList: true,
                    requireEmptyProp: 'section'
                  },
                  {
                    itemsProp: 'sections',
                    itemLabelProp: 'name',
                    itemValueProp: placeItemValuePropFn,
                    type: 'place',
                    contentType: 'section',
                    includeInList: true,
                    children: [
                      {
                        itemsProp: 'managers',
                        itemLabelProp: 'fullName',
                        itemValueProp: personItemValuePropFn,
                        type: 'person',
                        contentType: 'clientmanager',
                        includeInList: true
                      },
                      {
                        itemsProp: 'employees',
                        itemLabelProp: 'fullName',
                        itemValueProp: personItemValuePropFn,
                        type: 'person',
                        contentType: 'clientemployee',
                        includeInList: true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  }

})();
