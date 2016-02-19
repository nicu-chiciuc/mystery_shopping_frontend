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
      CONTENT_TYPE: {
        24: 'Department',
        25: 'Entity',
        26: 'Section',
        16: 'Client project manager',
        17: 'Manager',
        18: 'Employee',
        19: 'Shopper'
      },
      BUTTON: {
        EDIT: 'Edit',
        SAVE: 'Save',
        CREATE: 'Create',
        CANCEL: 'Cancel',
        DELETE: 'Delete',
        SET: 'Set',
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        DETAILS: 'Details'
      },
      MENU: {
        MANAGEMENT: {
          CHANGE_COMPANY: 'Change company',
          EDIT_COMPANY: 'Edit company',
          CHANGE_PROJECT: 'Change project',
          EDIT_PROJECT: 'Edit project'
        },
        PROJECT_MANAGEMENT: {
          HEADING: 'Project Management',
          PROJECTS: 'Projects',
          MANAGE_PROJECTS: 'Manage projects'
        },
        PROJECT_PLANNING: {
          HEADING: 'Project Planning',
          EVALUATIONS: 'Evaluations',
          NO_PROJECTS: 'No projects to manage',
          PROJECTS_TO_MANAGE: 'Choose a project to manage',
          PLAN_EVALUATIONS: 'Plan evaluations',
          ASSESS_EVALUATIONS: 'Assess evaluations'
        },
        CLIENT_MANAGEMENT: {
          HEADING: 'Client Management',
          CLIENTS: 'Clients',
          CREATE: 'Create company',
          CLIENTS_TO_MANAGE: 'Choose a company to manage'
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
        METHODOLOGY_TOOLS: {
          HEADING: 'Methodology'
        },
        USER_MANAGEMENT: {
          HEADING: 'User Management',
          SHOPPERS: {
            HEADING: 'Shoppers',
            CREATE: 'Create shopper',
            LIST: 'List shoppers'
          },
          CONSULTANTS: {
            HEADING: 'Consultants',
            CREATE: 'Create consultant',
            LIST: 'List consultants'
          }
        }
      },
      COMMON: {
        CITY: 'City',
        SECTOR: 'Sector',
        ADDRESS: 'Address',
        GEOGRAPHICAL_COORDINATES: 'Geographical coordinates',
        LATITUDE: 'Latitude',
        LONGITUDE: 'Longitude',
        DEADLINE: 'Deadline',
        TYPE: 'Type',
        NAME: 'Name',
        GENDER: {
          HEADING: 'Gender',
          MALE: 'Male',
          FEMALE: 'Female'
        },
        ACTIONS: {
          CLOSE_DIALOG: 'Close dialog', // Dialog means modal/popup window
          ENTER_DATE: 'Enter date'
        }
      },
      ACCOUNT: {
        USERNAME: 'Username',
        EMAIL: 'Email',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm password',
        NAME: 'Name',
        FIRST_NAME: 'First name',
        LAST_NAME: 'Last name',
        JOB_TITLE: 'Job title',
        BIRTH_DATE: 'Birth date',
        DETAILS: 'Details'
      },
      SHOPPER: {
        HAS_DRIVERS_LICENSE: 'Has drivers license',
        NEW_SHOPPER: 'New shopper',
        EDIT_SHOPPER: 'Edit shopper'
      },
      COMPANY: {
        NAME: 'Company name',
        NEW_COMPANY: 'New company',
        EDIT_COMPANY: 'Edit company',
        NEW_MANAGER: 'New manager',
        EDIT_MANAGER: 'Edit manager',
        NEW_EMPLOYEE: 'New employee',
        EDIT_EMPLOYEE: 'Edit employee',
        INDUSTRY: 'Industry company activates in',
        COUNTRY: 'Country',
        CONTACT_PERSON: 'Contact person',
        CONTACT_PHONE: 'Contact phone',
        CONTACT_EMAIL: 'Contact email',
        DOMAIN: 'Domain',
        COMPANY_STRUCTURE: 'Company structure',
        ADD_DEPARTMENT: 'Add department',
        ADD_MANAGER: 'Add manager',
        ADD_EMPLOYEE: 'Add employee',
        MANAGER_OF: 'Manager of "{PLACE_NAME}"',
        EMPLOYEE_OF: 'Employee of "{PLACE_NAME}"',
        JOB_TITLE: 'Job title: {TITLE}',
        DEPARTMENT: {
          NAME: 'Department name',
          STRUCTURE: 'Department structure',
          NEW_DEPARTMENT: 'New department',
          EDIT_DEPARTMENT: 'Edit department',
          ADD_ENTITY: 'Add entity',
          ENTITY: {
            ADD_SECTION: 'Add section',
            NAME: 'Entity name',
            NEW_ENTITY: 'New entity',
            EDIT_ENTITY: 'Edit entity',
            STRUCTURE: 'Entity structure',
            SECTION: {
              NAME: 'Section name',
              NEW_SECTION: 'New section',
              EDIT_SECTION: 'Edit section',
              STRUCTURE: 'Section structure'
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
        VIEW_METHODOLOGY: 'View methodology',
        PRIMARY_INFO: 'Primary info',
        RESEARCH_METHODOLOGY: 'Research methodology',
        SHOPPERS_DISTRIBUTION: 'Shoppers distribution',
        EVALUATION_LEVELS: 'Evaluation levels',
        METHODOLOGY: {
          NUMBER_OF_EVALUATIONS: 'Number of evaluations',
          QUESTIONNAIRES: 'Questionnaires',
          SCRIPTS: 'Scripts',
          LIST_OF_PLACES_AND_PEOPLE: 'List of places and people to assess'
        },
        EVALUATION_LEVEL: {
          ADD_PROJECT_MANAGER: 'Add project manager'
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
        TITLE: 'Title',
        DESCRIPTION: 'Description',
        SAME_LEVEL_BLOCKS: 'Same level blocks',
        AVAILABLE_WEIGHT_EXCEEDED: 'Weight cannot be greater than {ACCEPTABLE_WEIGHT}',
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
          CHOICE: {
            BODY: 'Choice body',
            SCORE: 'Choice score'
          },
          ANSWER: 'Answer',
          MAX_SCORE: 'Max score: {MAX_SCORE}',
          SCORE_AND_WEIGHT: '(score - {SCORE}, weight - {WEIGHT})'
        },
        ACTIONS: {
          ADD_BLOCK: 'Add block',
          ADD_QUESTION: 'Add question',
          ADD_CHOICE: 'Add choice'
        },
        DIALOG: {
          EDIT_BLOCK: 'Edit block',
          BLOCK_TITLE: 'Block title',
          ADD_QUESTION: 'Add question'
        }
      },
      EVALUATION: {
        TABLE: {
          HEADER: {
            VISIT_ID: 'Visit ID',
            SHOPPER: 'Shopper',
            SUBJECT_OF_EVALUATION: 'Subject of evaluation',
            EVALUATION_TYPE: 'Evaluation type',
            SCRIPT: 'Script',
            QUESTIONNAIRE_TEMPLATE: 'Questionnaire template',
            DATE: 'Date',
            TIME: 'Time period',
            STATUS: 'Status'
          }
        },
        PLANNING: {
          HEADING: 'Planning',
          NUMBER_OF_EVALUATIONS: 'Number of evaluations',
          CREATE_EVALUATIONS: 'Create evaluations',
          ALL_EVALUATIONS_WERE_PLANNED: 'No evaluations left to plan',
          SHOPPER: 'Shopper',
          SUBJECT_OF_EVALUATION: 'Subject of evaluation',
          SCRIPT: 'Script',
          QUESTIONNAIRE_TEMPLATE: 'Questionnaire template',
          SUGGESTED_START_DATE: 'Suggested start date',
          SUGGESTED_END_DATE: 'Suggested end date'
        },
        VIEW: {
          SECTION_NAME: 'Section name',
          ENTITY_NAME: 'Entity name',
          SCRIPT: 'Script',
          QUESTIONNAIRE: 'Questionnaire'
        },
        TYPE: {
          HEADING: 'Evaluation type',
          CALL: 'Call',
          VISIT: 'Visit'
        },
        HEADING: 'Evaluations',
        TOTAL: 'Total: {NR}',
        NOT_PLANNED: 'Not planned: {NR}',
        DETAILS: 'Evaluation details',
        DELETE: 'Delete evaluation',
        DELETE_DIALOG: {
          TITLE: 'Delete confirmation',
          TEXT_CONTENT: 'Are you sure you want to delete this evaluation?',
          ARIA_LABEL: 'Delete evaluation confirmation'
        }
      },
      VALIDATION_MESSAGE: {
        GENERIC: {
          FIELD_IS_REQUIRED: 'This field is required.'
        },
        SPECIFIC_FIELD_IS_REQUIRED: 'Field "{FIELD_NAME}" is required.',
        DATE: {
          INVALID: 'The entered value is not a date.'
        },
        PASSWORD: {
          MIN_LENGTH: 'Password should be longer than 8 characters.',
          PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.'
        },
        USER: {
          USERNAME_EXISTS: 'A user with that username already exists.'
        }
      }
    });

    $translateProvider.preferredLanguage('en');
  }
})();
