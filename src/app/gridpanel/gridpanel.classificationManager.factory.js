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
            idObj: {
              category: 'places',
              content_type: evaluation.typeTranslationKey,
              id: retId
            },

            label: retRepr.displayName,

            selected: false,
            available: true
          }
        },

      'templates': function (evaluation) {
          return {
            idObj: {
              category: 'templates',
              id: evaluation.questionnaire_repr.template
            },

            label: evaluation.questionnaire_repr.title,

            children: blockToSelectableData(evaluation.questionnaire_repr),

            selected: false,
            available: true
          }
        },

      'waves': function (evaluation) {
        return {
          idObj: {
            category: 'waves',
            id: evaluation.project
          },

          label: evaluation.project_repr.period_start + ' - ' + evaluation.project_repr.period_end,

          selected: false,
          available: true
        }
      }

    };

    function blockToSelectableData (questionnaire) {
      var a = R.map(function (question) {
        return {
          label: question.question_body,
          selected: false,
          available: true
        }
      }, questionnaire.questions || []);

      var b = R.map(function (block) {
        return {
          label: block.title,
          children: blockToSelectableData(block),

          selected: false,
          available: true
        }
      }, questionnaire.blocks);

      return a.concat(b);
    }

    var isEqualCategoryType = R.curry(function (categoryType1, categoryType2) {
      return _.isEqual(categoryType1.idObj, categoryType2.idObj);
    });

    function isCategoryTypeSelectedIncludingChildren (categoryType) {
      return categoryType.selected || R.any(isCategoryTypeSelectedIncludingChildren, categoryType.children || []);
    }

    var isEvaluationOfCategoryType = R.curry(function (category, categoryType, evaluation) {
      return isEqualCategoryType(categories[category](evaluation), categoryType);
    });

    function getEvaluationsByCategoryType (category, categoryType, evaluations) {
      return R.filter(isEvaluationOfCategoryType(category, categoryType), evaluations);
    }

    function getCategoryTypesByEvaluations (category, evaluations) {
      return _.uniqWith(_.map(evaluations, categories[category]), isEqualCategoryType);
    }

    function getCategoryTypesByCategoryType (getCategory, byCategory, byCategoryType, evaluations) {
      return getCategoryTypesByEvaluations(
        getCategory,
        getEvaluationsByCategoryType(byCategory, byCategoryType, evaluations)
      );
    }

    function getCategoryTypesByCategoryTypes (getCategory, byCategory, byCategoryTypes, returnAllIfNoCategoryTypes, evaluations) {
      // A common approach is to return everything if nothing is set as a filter
      if (returnAllIfNoCategoryTypes && byCategoryTypes.length === 0) {
        return getCategoryTypesByEvaluations(getCategory, evaluations)
      }

      var categoryTypes = _.map(byCategoryTypes, function (categoryType) {
        return getCategoryTypesByCategoryType(getCategory, byCategory, categoryType, evaluations);
      });

      categoryTypes.push(isEqualCategoryType);
      return _.intersectionWith.apply(_, categoryTypes)
    }

    function recalculateAvailableForWidget (evaluations, widget) {
      categoriesList().forEach(function (category) {
        var availableNow = getAvailableForCategory(category);
        widget.categoryTypes[category].forEach(function (categoryType) {
          categoryType.available = !!R.find(isEqualCategoryType(categoryType), availableNow);
        });
      });


      function getAvailableForCategory (category) {
        var avail = [];

        categoriesList().forEach(function (otherCategory) {
          if (otherCategory !== category) {
            var selectedCategoryTypes = R.filter(isCategoryTypeSelectedIncludingChildren, widget.categoryTypes[otherCategory]);
            avail.push(getCategoryTypesByCategoryTypes(category, otherCategory, selectedCategoryTypes, true, evaluations));
          }
        });

        avail.push(isEqualCategoryType);
        return _.intersectionWith.apply(_, avail);
      }
    }

    function getScoreOfEvaluationByCategoryTypeOrKid (categoryTypeKid, evaluation) {

    }

    function updateCategoryTypesOfWidget (widget, evaluations) {
      categoriesList().forEach(function (category) {
        var availableCategoryTypes = getCategoryTypesByEvaluations(category, evaluations);
        widget.categoryTypes[category] = widget.categoryTypes[category] || [];
        var tmp = widget.categoryTypes[category];

        var shouldBeAdded = R.differenceWith(isEqualCategoryType, availableCategoryTypes, tmp);
        var shouldBeRemoved = R.differenceWith(isEqualCategoryType, tmp, availableCategoryTypes);

        Array.prototype.push.apply(tmp, shouldBeAdded);
      });
    }

    var flattenPathObj = R.curry(function (recursiveProperties, acc, currentPathObj) {
      acc.push(currentPathObj);

      recursiveProperties.forEach(function (recProp) {
        (currentPathObj.obj[recProp] || []).forEach(function (subObject, index) {
          flattenPathObj(recursiveProperties, acc, {
            path: currentPathObj.path.concat([recProp, index]),
            obj: subObject
          })
        });
      });

      return acc;
    });

    function getAverageOfEvaluationArray (lens, evaluationArr) {
      var sum = 0;
      var num = 0;

      if (evaluationArr.length < 1) {
        return -1;
      }

      evaluationArr.forEach(function (evaluation, index) {
        sum += parseFloat(R.view(lens, evaluation));
        num += 1;
      });

      return sum / num;
    }


    function setWidgetData(widget, keyCategory, valueCategory, evaluations) {
      var newData = [];




      widget.categoryTypes[keyCategory].forEach(function (keyCategoryType) {
        var keyCategoryTypeFlatKids = flattenPathObj(['children'], [], {path: [], obj: keyCategoryType});

        keyCategoryTypeFlatKids.forEach(function (flatKeyCategoryType) {
          if (flatKeyCategoryType.obj.selected) {
            var newObj = {
              key: flatKeyCategoryType.obj.label,
              values: []
            };

            widget.categoryTypes[valueCategory].forEach(function (valueCategoryType) {
              var valueCategoryTypeFlatKids = flattenPathObj(['children'], [], {path: [], obj: valueCategoryType});

              valueCategoryTypeFlatKids.forEach(function (flatValueCategoryType) {
                if (flatValueCategoryType.obj.selected) {
                  var flt = R.allPass([
                    isEvaluationOfCategoryType(keyCategory, keyCategoryType),
                    isEvaluationOfCategoryType(valueCategory, valueCategoryType)
                  ]);

                  var nowEvals = R.filter(flt, evaluations);


                  var lensObj = keyCategory === 'templates' ? flatKeyCategoryType : flatValueCategoryType;
                  var flatEval = flattenPathObj(['questions', 'blocks'], [], {path: ['questionnaire_repr'], obj: nowEvals[0].questionnaire_repr});

                  var actEval = R.filter(function (block) {
                    return block.obj.title === lensObj.obj.label || block.obj.question_body === lensObj.obj.label
                  }, flatEval);

                  var averageValue = getAverageOfEvaluationArray(R.lensPath(actEval[0].path.concat('score')), nowEvals);

                  newObj.values.push({
                    label: valueCategoryType.label + ': ' + flatValueCategoryType.obj.label,
                    value: averageValue
                  });
                }
              });
            });

            newData.push(newObj);
          }
        });
      });

      widget.data = newData;
    }

    function categoriesList () {
      return Object.keys(categories);
    }



    return {
      recalculateAvailableForWidget: recalculateAvailableForWidget,
      updateCategoryTypesOfWidget: updateCategoryTypesOfWidget,

      getCategoryTypesByEvaluations: getCategoryTypesByEvaluations,
      isEqualCategoryType: isEqualCategoryType,
      isCategoryTypeSelectedIncludingChildren: isCategoryTypeSelectedIncludingChildren,

      setWidgetData: setWidgetData,

      categoriesList: categoriesList
    };


  }
})();
