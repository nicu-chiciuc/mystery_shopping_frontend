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

    function blockToSelectableData (questionnaire, useScore) {
      var questions = R.map(function (question) {
        return {
          id: question.id,
          label: question.question_body,

          // score: useScore ? block.score : undefined,

          selected: false,
          available: true
        }
      }, questionnaire.questions || []);

      var blocks = R.map(function (block) {
        return {
          id: block.id,
          label: block.title,
          children: blockToSelectableData(block),

          // score: useScore ? block.score : undefined,

          selected: false,
          available: true
        }
      }, questionnaire.blocks || []);

      return questions.concat(blocks);
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

      _.forEach(recursiveProperties, function (recProp) {
        _.forEach((currentPathObj.obj[recProp] || []), function (subObject, index) {
          flattenPathObj(recursiveProperties, acc, {
            path: currentPathObj.path.concat([recProp, index]),
            obj: subObject
          })
        });
      });

      return acc;
    });

    function getAverageOfEvaluationArray (lens, evaluationArr) {
      return evaluationArr.length ?
        R.sum(R.map(R.compose(parseFloat, R.view(lens)), evaluationArr)) / evaluationArr.length :
        -1;
    }

    var isEvaluationOfWidget = R.curry(function (widget, evaluation) {
      function isEvaluationOfCategoryTypes (category) {
        return R.anyPass(
          R.map(
            isEvaluationOfCategoryType(category),
            R.filter(isCategoryTypeSelectedIncludingChildren, widget.categoryTypes[category])
          )
        );
      }

      return R.allPass(R.map(isEvaluationOfCategoryTypes, categoriesList())) (evaluation);
    });

    function createScoreObjectList (widget, evaluations) {
      var goodPlaces    = R.filter(isCategoryTypeSelectedIncludingChildren, widget.categoryTypes.places);
      var goodTemplates = R.filter(isCategoryTypeSelectedIncludingChildren, widget.categoryTypes.templates);
      var goodWaves     = R.filter(isCategoryTypeSelectedIncludingChildren, widget.categoryTypes.waves);

      //Create all combinations between places, templates and waves
      var combos = R.map(R.unnest, R.xprod(R.xprod(goodPlaces, goodTemplates), goodWaves));

      //Change the naming from 0, 1, 2 to places, templates, waves
      combos = combos.map(function (combo) {
        return {
          places: combo[0],
          templates: combo[1],
          waves: combo[2]
        }
      });

      //Filter the evaluations per combination of category type
      combos.forEach(function (combo) {
        combo.evals = evaluations.filter(function (evaluation) {
          return isEvaluationOfCategoryType('places', combo['places'], evaluation) &&
            isEvaluationOfCategoryType('templates', combo['templates'], evaluation) &&
            isEvaluationOfCategoryType('waves', combo['waves'], evaluation);
        });
      });

      combos.forEach(function (combo) {
        if (combo.evals.length) {
          var sampleEval = combo.evals[0];

          var flattened = flattenPathObj(['questions', 'blocks'], [], {path: [], obj: sampleEval.questionnaire_repr});

          var obj = {};

          flattened.forEach(function (flatt) {
            var test = R.map(R.view(R.lensPath(['questionnaire_repr'].concat(flatt.path))), combo.evals);

            var average = R.sum(R.map(R.prop('score'), test)) / test.length;

            // Replace 'questions' and 'blocks' with 'children' for better compatibility
            var goodPath = R.map(function (path) {
              return path === 'questions' || path === 'blocks' ? 'children' : path;
            }, flatt.path);

            // When replacing blocks and questions, they can have the same last index
            // so this should be checked (or the whole algorithm changed)
            while (goodPath.length > 0 && R.view(R.lensPath(goodPath), obj) !== undefined) {
              goodPath[goodPath.length - 1] ++;
            }

            obj = R.set(R.lensPath(goodPath), {
              score: average,
              label: R.prop('title', test[0]) || R.prop('question_body', test[0])
            }, obj);
          });

          combo.data = obj;
        }
      });

      return combos;
    }


    function setWidgetData(widget, keyCategory, valueCategory, evaluations) {

      var combos = createScoreObjectList(widget, evaluations);


      widget.chartOptions.chart.type = widget.graphType;

      switch (widget.graphType) {
        case 'pieChart':
          widget.data = getPieChartData(widget, keyCategory, combos);
          break;

        case 'cumulativeLineChart':
          if (valueCategory === 'waves') {
            widget.data = getLineChartData(widget, keyCategory, valueCategory, combos);
          }
          else {
            console.log('no line chart if waves are not selected');
          }
          break;


        default:
          widget.data = getBarChartData(widget, keyCategory, valueCategory, combos);
          break;
      }


    }

    function getBarChartData(widget, keyCategory, valueCategory, combos) {
      return mapFlatCategoryType(widget, keyCategory, function (keyCategoryType, flatKeyCategoryType) {

        var newObj = {
          key: flatKeyCategoryType.obj.label,
          values: []
        };

        var keyCombos = R.filter(function (combo) {
          return isEqualCategoryType(keyCategoryType, combo[keyCategory])
        }) (combos);

        newObj.values = mapFlatCategoryType(widget, valueCategory, function (valueCategoryType, flatValueCategoryType) {
          var nowCombos = R.filter(function (combo) {
            return isEqualCategoryType(valueCategoryType, combo[valueCategory]);
          }) (keyCombos);

          var nowCombo = nowCombos[0];

          var lensComboArr;

          if (keyCategory === 'templates' || valueCategory === 'templates') {
            var lensObj = keyCategory === 'templates' ? flatKeyCategoryType : flatValueCategoryType;

            var flatCombo = flattenPathObj(['children'], [], {
              path: [],
              obj: nowCombo.data
            });

            var actCombo = R.filter(function (block) {
              return block.obj.label === lensObj.obj.label
            }, flatCombo);

            lensComboArr = actCombo[0].path.concat('score');
          }
          else {
            lensComboArr = ['score'];
          }

          var comboAverageValue = R.view(R.lensPath(lensComboArr), nowCombo.data);


          return {
            label: valueCategoryType.label + ': ' + flatValueCategoryType.obj.label,
            value: comboAverageValue
          };
        });

        return newObj;
      });
    }

    function mapFlatCategoryType(widget, category, callback) {
      var data = [];

      widget.categoryTypes[category].forEach(function (categoryType) {
        var categoryTypeFlatKids = flattenPathObj(['children'], [], {path: [], obj: categoryType});

        categoryTypeFlatKids .forEach(function (flatCategoryType) {
          if (flatCategoryType.obj.selected) {
            data.push(callback(categoryType, flatCategoryType));
          }
        })
      });

      return data;
    }

    function getPieChartData(widget, valueCategory, combos) {
      return mapFlatCategoryType(widget, valueCategory, function (valueCategoryType, flatValueCategoryType) {
        var nowCombos = R.filter(function (combo) {
          return isEqualCategoryType(valueCategoryType, combo[valueCategory]);
        }) (combos);

        var nowCombo = nowCombos[0];

        var lensComboArr;

        if (valueCategory === 'templates') {
          var lensObj = flatValueCategoryType;

          var flatCombo = flattenPathObj(['children'], [], {
            path: [],
            obj: nowCombo.data
          });

          var actCombo = R.filter(function (block) {
            return block.obj.label === lensObj.obj.label
          }, flatCombo);

          lensComboArr = actCombo[0].path.concat('score');
        }
        else {
          lensComboArr = ['score'];
        }

        var comboAverageValue = R.view(R.lensPath(lensComboArr), nowCombo.data);


        return {
          label: flatValueCategoryType.obj.label + ': ' + valueCategoryType.label,
          value: comboAverageValue
        };
      });
    }

    function getLineChartData (widget, keyCategory, valueCategory, combos) {

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
