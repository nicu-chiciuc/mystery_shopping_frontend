(function () {
  'use strict';

  angular
    .module('spark')
    .config(config);

  /** @ngInject */
  function config ( $translateProvider ) {
    $translateProvider.translations('en', {
      LANGUAGE: {
        RO: 'Rom',
        RU: 'Rus'
      },
      BUTTON: {
        SAVE: 'Save',
        CREATE: 'Create'
      },
      MENU: {
        PROJECT_MANAGEMENT: {
          HEADING: 'Project Management',
          PROJECTS: 'Projects'
        },
        CLIENT_MANAGEMENT: {
          HEADING: 'Client Management',
          CLIENTS: 'Clients'
        },
        QUESTIONNAIRE_MANAGEMENT: {
          HEADING: 'Questionnaire Management',
          QUESTIONNAIRES: 'Questionnaires',
          CREATE_QUESTIONNAIRE: 'Create questionnaire'
        }
      },
      COMMON: {
        CITY: 'City',
        ADDRESS: 'Address',
        GEOGRAPHICAL_COORDINATES: 'Geographical coordinates',
        LATITUDE: 'Latitude',
        LONGITUDE: 'Longitude'
      },
      COMPANY: {
        NEW_COMPANY: 'New company',
        EDIT_COMPANY: 'Edit company',
        NAME: 'Company name',
        INDUSTRY: 'Industry company activates in',
        COUNTRY: 'Country',
        CONTACT_PERSON: 'Contact person',
        CONTACT_PHONE: 'Contact phone',
        CONTACT_EMAIL: 'Contact email',
        DOMAIN: 'Domain',
        DEPARTMENT: {
          NAME: 'Department name',
          ENTITY: {
            NAME: 'Entity name',
            SECTION: {
              NAME: 'Section name'
            }
          }
        }
      },
      PROJECT: {
        CLIENT: 'Company',
        START_DATE: 'Start date',
        END_DATE: 'End date',
        PROJECT_MANAGER: 'Project manager',
        CONSULTANTS: 'Consultants',
        SHOPPERS: 'Shoppers',
        METHODOLOGY: {
          NUMBER_OF_EVALUATIONS: 'Number of evaluations',
          QUESTIONNAIRES: 'Questionnaires',
          SCRIPTS: 'Scripts',
          LIST_OF_PLACES_AND_PEOPLE: 'List of places and people to assess'
        },
        PLACEHOLDER: {
          START_DATE: 'Start date',
          END_DATE: 'End date',
          METHODOLOGY: {
            NUMBER_OF_EVALUATIONS: 'Number of evaluations'
          }
        }
      },
      VALIDATION_MESSAGE: {
        GENERIC: {
          FIELD_IS_REQUIRED: 'This field is required.'
        },
        SPECIFIC_FIELD_IS_REQUIRED: '{FIELD_NAME} is required.'
      }
    });

    $translateProvider.preferredLanguage('en');
  }
})();
