(function () {
  'use strict';

  angular
    .module('spark')
    .config(config);

  /** @ngInject */
  function config ( $translateProvider ) {
    $translateProvider.translations('en', {
      WELCOME: 'Welcome to Mystery Shopping platform! Start working by navigating the side menu.',
      LANGUAGE: {
        RO: 'Rom',
        RU: 'Rus'
      },
      CONTENT_TYPE: {
        25: 'Department',
        26: 'Entity',
        27: 'Section',
        17: 'Client project manager',
        18: 'Manager',
        19: 'Employee',
        20: 'Shopper'
      },
      BUTTON: {
        EDIT: 'Edit',
        SAVE: 'Save',
        CREATE: 'Create',
        CANCEL: 'Cancel',
        DELETE: 'Delete',
        CLOSE: 'Close',
        SUBMIT: 'Submit',
        SET: 'Set',
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        DETAILS: 'Details',
        SAVE_AS_DRAFT: 'Save as draft'
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
          MANAGE_PROJECTS: 'Manage projects',
          FULLY_DEFINED: 'All project chapters are defined',
          PARTIALLY_DEFINED: 'Not all project chapters are defined',
          NOT_DEFINED: 'Project chapters are not defined'
        },
        PROJECT_PLANNING: {
          HEADING: 'Project Planning',
          EVALUATIONS: 'Evaluations',
          NO_PROJECTS: 'No projects to manage',
          PROJECTS_TO_MANAGE: 'Choose a project to manage',
          PLAN_EVALUATIONS: 'Plan evaluations',
          ASSESS_EVALUATIONS: 'Assess evaluations',
          EDIT_GRID_PANEL: 'Grid Panel'
        },
        CLIENT_MANAGEMENT: {
          HEADING: 'Client Management',
          CLIENTS: 'Clients',
          CREATE: 'Create company',
          CLIENTS_TO_MANAGE: 'Choose a company to manage',
          NO_CLIENTS: 'No companies to manage'
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
        GRIDPANEL_MANAGEMENT: {
          CREATE_GRIDPANEL: 'Create GridPanel',
          LIST_GRIDPANELS: 'List GridPanels'
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
        },
        SHOPPERS: {
          EVALUATION_LIST: 'Evaluation list'
        },
        ADMIN: {
          UPLOADS: {
            HEADING: 'Uploads',
            LOCALITIES: 'Upload localities'
          }
        }
      },
      ACTIONS: {
        CHOOSE_COMPANY: 'Choose a company to manage or create a new one.',
        CHOOSE_PROJECT: 'Choose a project to manage or create a new one.',
        ACCESS_DENIED_TITLE: 'Access Denied',
        ACCESS_DENIED_MESSAGE: "You don't have access to this page."
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
        USERNAME: 'Username',
        PASSWORD: 'Password',
        GENDER: {
          HEADING: 'Gender',
          MALE: 'Male',
          FEMALE: 'Female',
          m: 'M',
          f: 'F'
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
        EDIT_SHOPPER: 'Edit shopper',
        LIST: 'Shoppers list',
        DETAILS: 'Shopper details',
        TABLE: {
          HEADER: {
            NAME: 'Name',
            EMAIL: 'Email',
            DRIVERS_LICENSE: 'Driver license',
            DATE_OF_BIRTH: 'Date of birth',
            AGE: 'Age',
            GENDER: 'Gender'
          }
        }
      },
      COMPANY: {
        NAME: 'Company name',
        NEW_COMPANY: 'New company',
        EDIT_COMPANY: 'Edit company',
        NEW_MANAGER: 'New manager',
        EDIT_MANAGER: 'Edit manager',
        NEW_EMPLOYEE: 'New employee',
        EDIT_EMPLOYEE: 'Edit employee',
        INDUSTRY: 'Industry',
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
        CONSULTANT: 'Consultant',
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
        QUESTIONNAIRE: 'Questionnaire',
        SCRIPT: 'Script',
        METHODOLOGY: {
          NUMBER_OF_EVALUATIONS: 'Number of evaluations',
          QUESTIONNAIRES: 'Questionnaires',
          SCRIPTS: 'Scripts',
          LIST_OF_PLACES_AND_PEOPLE: 'List of places and people to assess'
        },
        EVALUATION_LEVEL: {
          LEVEL: 'Level {LVL}',
          ADD_PROJECT_MANAGER: 'Add project manager',
          REMOVE_PROJECT_MANAGER: 'Remove project manager',
          ADD_LAYER: 'Add layer',
          DRAG_CONSULTANTS_HERE: 'Drag consultants here',
          NO_AVAILABLE_CONSULTANTS: 'No available consultants'
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
        NEW_QUESTIONNAIRE_TEMPLATE: 'New questionnaire template',
        EDIT_QUESTIONNAIRE_TEMPLATE: 'Edit questionnaire template',
        TITLE: 'Title',
        DESCRIPTION: 'Description',
        SAME_LEVEL_BLOCKS: 'Same level blocks',
        AVAILABLE_WEIGHT: 'Available weight: {WEIGHT}',
        AVAILABLE_WEIGHT_EXCEEDED: 'Weight cannot be greater than {ACCEPTABLE_WEIGHT}',
        OPEN_BLOCK_MENU: 'Open block menu',
        BLOCK: {
          HEADING: 'Block',
          WEIGHT: 'Weight',
          DELETE: 'Delete block',
          EDIT: 'Edit block',
          QUESTIONS: 'Block questions',
          DELETE_DIALOG: {
            TITLE: 'Delete confirmation',
            TEXT_CONTENT: 'Are you sure you want to delete this block?',
            ARIA_LABEL: 'Delete block confirmation'
          }
        },
        QUESTION: {
          TYPE: {
            SINGLE_CHOICE: 'Single choice',
            MULTIPLE_CHOICE: 'Multiple choice',
            TEXT: 'Text',
            DATE: 'Date'
          },
          HEADING: 'Question',
          HEADING_PLURAL: 'Questions',
          QUESTION_BODY: 'Question body',
          COMMENTS: 'Comments',
          CHOICES: 'Choices',
          CHOICE: {
            BODY: 'Choice body',
            SCORE: 'Choice score'
          },
          ANSWER: 'Answer',
          MAX_SCORE: 'Max score: {MAX_SCORE}',
          SCORE_AND_WEIGHT: '(score: {SCORE})',
          WEIGHT: 'Weight',
          DELETE: 'Delete question',
          REMOVE_FROM_CROSS_INDEX: 'Remove question from Cross-Index',
          EDIT: 'Edit question',
          AVAILABLE_WEIGHT_EXCEEDED: 'Sum of all question weights can not exceed {MAX_AMOUNT}',
          DELETE_DIALOG: {
            TITLE: 'Delete confirmation',
            TEXT_CONTENT: 'Are you sure you want to delete this question?',
            ARIA_LABEL: 'Delete question confirmation'
          }
        },
        ACTIONS: {
          ADD_BLOCK: 'Add block',
          ADD_QUESTION: 'Add question',
          ADD_CHOICE: 'Add choice',
          REVIEW_QUESTION_WEIGHTS: 'Review question weights'
        },
        DIALOG: {
          EDIT_BLOCK: 'Edit block',
          BLOCK_TITLE: 'Block title',
          ADD_QUESTION: 'Add question',

          EDIT_CROSS_INDEX: 'Edit Cross-Index',
          CROSS_INDEX_TITLE: 'Cross-Index title'
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
            SUGGESTED_START_DATE: 'Suggested start date',
            SUGGESTED_END_DATE: 'Suggested end date',
            STATUS: 'Status',
            SCORE: 'Score'
          }
        },
        PLANNING: {
          HEADING: 'Planning',
          NUMBER_OF_EVALUATIONS: 'Number of evaluations',
          LEFT_NUMBER_OF_EVALUATIONS: 'Only {NR} evaluations are left',
          CREATE_EVALUATIONS: 'Create evaluations',
          ALL_EVALUATIONS_WERE_PLANNED: 'No evaluations left to plan',
          SHOPPER: 'Shopper',
          SUBJECT_OF_EVALUATION: 'Subject of evaluation',
          SCRIPT: 'Script',
          QUESTIONNAIRE_TEMPLATE: 'Questionnaire template',
          SUGGESTED_START_DATE: 'Suggested start date',
          SUGGESTED_END_DATE: 'Suggested end date',
          PROJECT_NOT_FULLY_DEFINED: 'The selected project is not fully defined and thus cannot be planned. Finish the definition of the project and then come back.',
          NO_PLANNED_EVALUATIONS: 'There are no planned evaluations yet. You can add some in the section on the left side of the page.'
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
        HEADING_SINGULAR: 'Evaluation',
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
          FIELD_IS_REQUIRED: 'This field is required.',
          AT_LEAST_ONE_REQUIRED: 'At least one {ITEM} is required',
          ALL_ARE_REQUIRED: 'All {ITEMS} are required'
        },
        SPECIFIC_FIELD_IS_REQUIRED: 'Field "{FIELD_NAME}" is required.',
        DATE: {
          INVALID: 'The entered value is not a date.'
        },
        NUMBER: {
          INVALID: 'The entered value is not a number.'
        },
        PASSWORD: {
          MIN_LENGTH: 'Password should be longer than 8 characters.',
          PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.'
        },
        USER: {
          USERNAME_EXISTS: 'A user with that username already exists.'
        }
      },
      TOAST: {
        GENERIC: {
          ITEM_SAVE_SUCCESS: '{ITEM} successfully saved',
          ITEM_SAVE_ERROR: 'Error on saving "{ITEM}". Please retry.'
        },
        EVALUATION_SAVED_AS_DRAFT: 'Evaluation saved as draft',
        EVALUATION_SUBMITTED: 'Evaluation successfully submitted'
      }
    });

    $translateProvider.preferredLanguage('en');
  }
})();
