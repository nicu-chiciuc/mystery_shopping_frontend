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
        companies: '='
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

      vm.listOfPlacesAndPeopleNestedCheckboxListOptions = {
        showLegend: true,
        legend: $filter('translate')('PROJECT.METHODOLOGY.LIST_OF_PLACES_AND_PEOPLE'),
        children: [
          {
            itemsProp: 'departments',
            itemLabelProp: 'name',
            itemValueProp: 'id',
            children: [
              {
                itemsProp: 'managers',
                itemLabelProp: 'name',
                itemValueProp: 'id'
              },
              {
                itemsProp: 'entities',
                itemLabelProp: 'name',
                itemValueProp: 'id',
                children: [
                  {
                    itemsProp: 'managers',
                    itemLabelProp: 'name',
                    itemValueProp: 'id'
                  },
                  {
                    itemsProp: 'employees',
                    itemLabelProp: 'name',
                    itemValueProp: 'id'
                  },
                  {
                    itemsProp: 'sections',
                    itemLabelProp: 'name',
                    itemValueProp: 'id',
                    children: [
                      {
                        itemsProp: 'managers',
                        itemLabelProp: 'name',
                        itemValueProp: 'id'
                      },
                      {
                        itemsProp: 'employees',
                        itemLabelProp: 'name',
                        itemValueProp: 'id'
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
