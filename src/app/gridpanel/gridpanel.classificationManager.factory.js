(function () {
  'use strict'

  angular
    .module('spark')
    .factory('ClassificationManager', ClassificationManager);

  function ClassificationManager () {

    var categories = {
      'places': function (evaluation) {
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
          }
        },

      'templates': function (evaluation) {
          return {
            id: evaluation.questionnaire_repr.template,
            name: evaluation.questionnaire_repr.title
          }
        },

      'waves': function (evaluation) {
        return {
          id: evaluation.project,
          name: evaluation.project_repr.period_start + " - " + evaluation.project_repr.period_end
        }
      }
    };

    function isEvaluationOfCategoryType (category, evaluation, categoryType) {
      return _.isEqual(categories[category](evaluation), categoryType);
    }

    function getEvaluationsByCategoryType (category, evaluations, categoryType) {
      return _.filter(evaluations, function (evaluation) {
        return isEvaluationOfCategoryType(category, evaluation, categoryType);
      });
    }

    function getEvaluationsByCategoryTypesIntersection (category, evaluations, categoryTypes) {
      var evaluationsArray = _.map(categoryTypes, function (categoryType) {
        return getEvaluationsByCategoryType(category, evaluations, categoryType);
      });

      return _.intersection.apply(_, evaluationsArray);
    }

    function getCategoryTypesByEvaluations (category, evaluations) {
      return _.uniqWith(_.map(evaluations, categories[category]), _.isEqual);
    }

    function getCategoryTypesByCategoryType (getCategory, evaluations, byCategory, byCategoryType) {
      return getCategoryTypesByEvaluations(
        getCategory,
        getEvaluationsByCategoryType(byCategory, evaluations, byCategoryType)
      );
    }

    function getCategoryTypesByCategoryTypes (getCategory, evaluations, byCategory, byCategoryTypes, returnAllIfNoCategoryTypes) {
      // A common approach is to return everything if nothing is set as a filter
      if (returnAllIfNoCategoryTypes && byCategoryTypes.length === 0) {
        return getCategoryTypesByEvaluations(getCategory, evaluations)
      }

      var categoryTypes = _.map(byCategoryTypes, function (categoryType) {
        return getCategoryTypesByCategoryType(getCategory, evaluations, byCategory, categoryType);
      });

      categoryTypes.push(_.isEqual);
      return _.intersectionWith.apply(_, categoryTypes)
    }


    function recalculateAvailableForWidget (evaluations, widget) {
      _.forOwn(categories, function (value, category) {
        widget.available[category] = getAvailableForCategory(category);
      });


      function getAvailableForCategory (category) {
        var avail = [];

        _.forOwn(categories, function (value, otherCategory) {
          if (otherCategory !== category) {
            avail.push(getCategoryTypesByCategoryTypes(category, evaluations, otherCategory, widget.checked[otherCategory], true));
          }
        });

        avail.push(_.isEqual);
        return _.intersectionWith.apply(_, avail);
      }
    }

    function getEvaluationsByPlaceAndTemplate (evaluations, place, template) {
      return _.filter(evaluations, function (evaluation) {
        return isEvaluationOfCategoryType('places', evaluation, place) &&
          isEvaluationOfCategoryType('templates', evaluation, template);
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
      getCategoryTypesByEvaluations: getCategoryTypesByEvaluations,

      setWidgetDataWithKeyPlaces: setWidgetDataWithKeyPlaces,
      setWidgetDataWithKeyTemplates: setWidgetDataWithKeyTemplates
    };


  }
})();
