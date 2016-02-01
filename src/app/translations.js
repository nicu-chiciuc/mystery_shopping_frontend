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
        EDIT: 'Edit',
        SAVE: 'Save',
        CREATE: 'Create',
        CANCEL: 'Cancel',
        DELETE: 'Delete',
        LOGIN: 'Login',
        LOGOUT: 'Logout'
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
          CREATE_QUESTIONNAIRE: 'Create questionnaire',
          LIST_QUESTIONNAIRES: 'List questionnaires',
          SCRIPTS: 'Scripts',
          CREATE_SCRIPT: 'Create scripts',
          LIST_SCRIPTS: 'List scripts'
        },
        SHOPPERS_MANAGEMENT: {
          HEADING: 'Shoppers Management',
          CREATE_SHOPPER: 'Create shopper',
          LIST_SHOPPERS: 'List shoppers'
        }
      },
      COMMON: {
        CITY: 'City',
        SECTOR: 'Sector',
        ADDRESS: 'Address',
        GEOGRAPHICAL_COORDINATES: 'Geographical coordinates',
        LATITUDE: 'Latitude',
        LONGITUDE: 'Longitude',
        GENDER: {
          MALE: 'Male',
          FEMALE: 'Female'
        },
        ACTIONS: {
          CLOSE_DIALOG: 'Close dialog', // Dialog means modal/popup window
          ENTER_DATE: 'Enter date'
        }
      },
      ACCOUNT: {
        FIRST_NAME: 'First name',
        LAST_NAME: 'Last name',
        JOB_TITLE: 'Job title',
        BIRTH_DATE: 'Birth date'
      },
      SHOPPER: {
        HAS_DRIVERS_LICENSE: 'Has drivers license'
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
      SCRIPT: {
        NEW_SCRIPT: 'New script',
        EDIT_SCRIPT: 'Edit script',
        TITLE: 'Title',
        DESCRIPTION: 'Description'
      },
      QUESTIONNAIRE: {
        BLOCK: {
          WEIGHT: 'Weight'
        },
        QUESTION: {
          TYPE: {
            SINGLE_CHOICE: 'Single choice',
            MULTIPLE_CHOICE: 'Multiple choice',
            TEXT: 'Text',
            DATE: 'Date'
          },
          QUESTION_BODY: 'Question body',
          CHOICES: 'Choices',
          ANSWER: 'Answer'
        },
        ACTIONS: {
          ADD_BLOCK: 'Add block',
          ADD_QUESTION: 'Add question',
          ADD_CHOICE: 'Add choice'
        },
        DIALOG: {
          EDIT_BLOCK_TITLE: 'Edit block title',
          DEFINE_BLOCK_TITLE: 'Define block title',
          BLOCK_TITLE: 'Block title',
          SET_TITLE: 'Set title',
          ADD_QUESTION: 'Add question'
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
