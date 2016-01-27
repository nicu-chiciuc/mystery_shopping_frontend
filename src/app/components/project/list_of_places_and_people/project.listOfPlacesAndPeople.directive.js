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

      vm.project.list_of_places = vm.project.list_of_places || [];
      vm.project.list_of_people = vm.project.list_of_people || [];

      vm.listOfPlacesAndPeopleLists = {
        place: vm.project.list_of_places,
        person: vm.project.list_of_people,
        ignored: []
      };

      vm.listOfPlacesAndPeopleNestedCheckboxListOptions = {
        showLegend: true,
        legend: $filter('translate')('PROJECT.METHODOLOGY.LIST_OF_PLACES_AND_PEOPLE'),
        children: [
          {
            itemsProp: 'departments_repr',
            itemLabelProp: 'name',
            itemValueProp: 'id',
            type: 'ignored',
            contentType: 'department',
            includeInList: false,
            children: [
              {
                itemsProp: 'managers',
                itemLabelProp: 'name',
                itemValueProp: 'id',
                type: 'ignored',
                contentType: 'clientmanager',
                includeInList: false
              },
              {
                itemsProp: 'entities',
                itemLabelProp: 'name',
                itemValueProp: 'id',
                type: 'place',
                contentType: 'entity',
                includeInList: true,
                children: [
                  {
                    itemsProp: 'managers',
                    itemLabelProp: 'name',
                    itemValueProp: 'id',
                    type: 'person',
                    contentType: 'clientmanager',
                    includeInList: true
                  },
                  {
                    itemsProp: 'employees',
                    itemLabelProp: 'name',
                    itemValueProp: 'id',
                    type: 'person',
                    contentType: 'clientemployee',
                    includeInList: true
                  },
                  {
                    itemsProp: 'sections',
                    itemLabelProp: 'name',
                    itemValueProp: 'id',
                    type: 'place',
                    contentType: 'section',
                    includeInList: true,
                    children: [
                      {
                        itemsProp: 'managers',
                        itemLabelProp: 'name',
                        itemValueProp: 'id',
                        type: 'person',
                        contentType: 'clientmanager',
                        includeInList: true
                      },
                      {
                        itemsProp: 'employees',
                        itemLabelProp: 'name',
                        itemValueProp: 'id',
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
