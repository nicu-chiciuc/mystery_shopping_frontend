(function () {
  'use strict'

  angular
    .module('spark')
    .factory('ClassificationManager', ClassificationManager);

  function ClassificationManager () {

    function isEvaluationsOfPlace (evaluation, place) {
      if (evaluation.typeTranslationKey !== place.content_type) {
        return false;
      }

      switch (evaluation.typeTranslationKey) {
        case 'CONTENT_TYPE.18':
        case 'CONTENT_TYPE.19':
          return evaluation.employee_repr.id === place.id;

        case 'CONTENT_TYPE.25':
          return evaluation.department_repr.id === place.id;

        case 'CONTENT_TYPE.26':
          return evaluation.entity_repr.id === place.id;

        case 'CONTENT_TYPE.27':
          return evaluation.section_repr.id === place.id;

        default:
          return false;
      }
    }

    function isEvaluationOfTemplate (evaluation, template) {
      return evaluation.questionnaire_repr.template === template.id;
    }

    function getTemplatesByPlace (evaluations, place) {
      var templates = [];

      evaluations.forEach(function (evaluation) {
        if (isEvaluationsOfPlace(evaluation, place)) {
          templates.push( getTemplateOfEvaluation(evaluation) );
        }
      });

      return templates;
    }

    function getPlacesByTemplate (evaluations, template) {
      var places = [];

      evaluations.forEach(function (evaluation) {
        if (isEvaluationOfTemplate(evaluation, template)){
          places.push( getPlaceOfEvaluation(evaluation) );
        }
      });


      return places;
    }

    function getPlaceOfEvaluation (evaluation) {
      var retId;
      var retRepr;

      switch (evaluation.typeTranslationKey) {
        case 'CONTENT_TYPE.18':
        case 'CONTENT_TYPE.19':
          retId = evaluation.employee_repr.id;
          retRepr = evaluation.employee_repr;
          break;

        case 'CONTENT_TYPE.25':
          retId = evaluation.department_repr.id;
          retRepr = evaluation.department_repr;
          break;

        case 'CONTENT_TYPE.26':
          retId = evaluation.entity_repr.id;
          retRepr = evaluation.entity_repr;
          break;

        case 'CONTENT_TYPE.27':
          retId = evaluation.section_repr.id;
          retRepr = evaluation.section_repr;
          break;

        default:
          return null;
      }

      return {
        content_type: evaluation.typeTranslationKey,
        id: retId,
        name: retRepr.displayName
      };
    }

    function getTemplateOfEvaluation (evaluation) {
      return {
        id: evaluation.questionnaire_repr.template,
        name: evaluation.questionnaire_repr.title
      }
    }

    // For uniqueness comparison
    function placeMatcher (place) {
      return place.content_type + place.id.toString();
    }

    function templateMatcher (template) {
      return template.id;
    }


    function getPlacesOfAllEvaluations (evaluations) {
      return _.uniqBy(_.map(evaluations, getPlaceOfEvaluation), placeMatcher);
    }

    function getTemplatesOfAllEvaluations (evaluations) {
      return _.uniqBy(_.map(evaluations, getTemplateOfEvaluation), templateMatcher);
    }

    function getTemplatesByPlaceArray (evaluations, places) {
      var templatesArrays = [];

      places.forEach(function (place) {
        var tmp = getTemplatesByPlace(evaluations, place);
        if (tmp !== []) {
          templatesArrays.push(tmp);
        }
      });

      templatesArrays.push(templateMatcher);
      var templateIds = _.intersectionBy.apply(_, templatesArrays);

      return templateIds;
    }

    function getPlacesByTemplateArray (evaluations, templates) {
      var placesArrays = [];

      templates.forEach(function (template) {
        var tmp = getPlacesByTemplate(evaluations, template);
        if (tmp !== []) {
          placesArrays.push(tmp);
        }
      });

      placesArrays.push(placeMatcher);
      var uniqPlaces = _.intersectionBy.apply(_, placesArrays);

      return uniqPlaces;
    }

    function recalculateAvailableForWidget (evaluations, widget) {
      var availableTemplates;
      var availablePlaces;

      if (widget.checked.places.length > 0) {
        availableTemplates = getTemplatesByPlaceArray(evaluations, widget.checked.places);
      }
      else {
        availableTemplates = getTemplatesOfAllEvaluations(evaluations);
      }

      if (widget.checked.templates.length > 0) {
        availablePlaces = getPlacesByTemplateArray(evaluations, widget.checked.templates)
      }
      else {
        availablePlaces = getPlacesOfAllEvaluations(evaluations);
      }

      widget.available.places = availablePlaces;
      widget.available.templates = availableTemplates;
    }

    function getEvaluationsByPlaceAndTemplate (evaluations, place, template) {
      return _.filter(evaluations, function (evaluation) {
        return isEvaluationsOfPlace(evaluation, place) &&
          isEvaluationOfTemplate(evaluation, template);
      })
    }

    function getAverageOfEvaluationArray (evaluationArr) {
      var sum = 0;
      var num = 0;

      if (evaluationArr.length < 1) {
        return -1;
      }

      evaluationArr.forEach(function (evaluation) {
        sum += evaluation.questionnaire_repr.score;
        num += 1;
      });

      return sum / num;
    }

    function setWidgetDataWithKeyPlaces (evaluations, widget) {
      var newData = [];

      widget.checked.places.forEach(function (place) {
        var newObj = {
          key: place.name,
          values: []
        };

        widget.checked.templates.forEach(function (template) {
          var averageValue = getAverageOfEvaluationArray(getEvaluationsByPlaceAndTemplate(evaluations, place, template));

          newObj.values.push({
            label: template.name,
            value: averageValue
          });
          console.log(averageValue);
        });

        newData.push(newObj);
      });

      widget.data = newData;
    }

    function setWidgetDataWithKeyTemplates (evaluations, widget) {
      var newData = [];

      widget.checked.templates.forEach(function (template) {
        var newObj = {
          key: template.name,
          values: []
        };

        widget.checked.places.forEach(function (place) {
          var averageValue = getAverageOfEvaluationArray(getEvaluationsByPlaceAndTemplate(evaluations, place, template));

          newObj.values.push({
            label: place.name,
            value: averageValue
          });

        });

        newData.push(newObj);
      });

      widget.data = newData;
    }

    return {
      recalculateAvailableForWidget: recalculateAvailableForWidget,
      getPlacesOfAllEvaluations: getPlacesOfAllEvaluations,
      getTemplatesOfAllEvaluations: getTemplatesOfAllEvaluations,
      setWidgetDataWithKeyPlaces: setWidgetDataWithKeyPlaces,
      setWidgetDataWithKeyTemplates: setWidgetDataWithKeyTemplates
    };


  }
})();
