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
        project: '='
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

      console.log(vm.project);
      // If it's a new project, it doesn't have any consultants list, so create one.

      vm.listOfPlacesAndPeopleNestedCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.METHODOLOGY.LIST_OF_PLACES_AND_PEOPLE'),
        labelProp: 'name',
        valueProp: 'id',
        childrenChainProp: 'departments.entities|managers|employees.sections|managers|employees'
      };
    }
  }

})();
