/******************************************************************************
 * Carbon Champ App kgCO2 and Civic Behaviour score module
 * Robin Wardle, September 2023
 * ***************************************************************************/

/* Schema validation */
//const Ajv = require("ajv");
//const ajv = new Ajv();
//scores_schema = require('./scores_schema.json');
//const validate = ajv.compile(scores_schema);

/* Look up tables / objects for the calculations */
carbonData = require('./carbon_data.json')
civicData = require('./civic_behaviour_data.json')
// Should have a values schema for testing the data here

/**
 *
 * @param {object} data  - from question
 * @param {integer} questionNumber - number of the question corresponding to data
 * @returns {number} - kgCO2 score for Q1-Q6 // civic behaviour score for Q7-Q9
 */
export default function getCarbonScore(data, questionNumber, user) {
  switch (questionNumber) {
    case 1: {
      return driving_kgCO2(data, user)
    }
    case 2: {
      return flying_kgCO2(data)
    }
    case 3: {
      return grocery_kgCO2(data)
    }
    case 4: {
      return goods_kgCO2(data)
    }
    case 5: {
      return heating_kgCO2(data, user)
    }
    case 6: {
      return electricity_kgCO2(data)
    }
    case 7: {
      return talk_to_relation_score(data)
    }
    case 8: {
      return climate_change_news_score(data)
    }
    case 9: {
      return mitigate_climate_change_score(data)
    }
    default: {
      return 0
    }
  }
}

/**
 * Carbon score calculation
 */

/**
 * Compute kgCO2 for driving behaviour (Q1)
 * @param {integer} data - from question
 * @returns {number} - kgCO2 score for driving behaviour
 */
function driving_kgCO2(data, user) {
  if (data.didUseCar) {
    return data.milesDriven * carbonData.driving_kgCO2[user.carType]
  } else {
    return 0
  }
}

/**
 * Compute kgCO2 for flying behaviour (Q2)
 * @param {integer} data - from question
 * @returns {number} - kgCO2 score for flying behaviour
 */
function flying_kgCO2(data) {
  if (data.didTakePlane) {
    if (data.hoursOfFlightLength <= carbonData.flying_kgCO2.threshold_hours) {
      return data.hoursOfFlightLength * carbonData.flying_kgCO2.lower_rate
    } else {
      return data.hoursOfFlightLength * carbonData.flying_kgCO2.upper_rate
    }
  } else {
    return 0
  }
}
/**
 * Compute kgCO2 for grocery purchases (Q3)
 * @param {object} data - from question
 * @returns {number} - kgCO2 score for grocery purchasing behaviour
 */
function grocery_kgCO2(data) {
  // grocery data {"beefSouthAmerica": true, "beefUK": false, "cheese": false, "chicken": false, "cowMilk": false, "cream": false, "didEatMeatOrDairy": true, "eggs": false, "freshFish": true, "lamb": false, "porkOrBaconOrHam": false, "tinnedFish": false, "yoghurt": false}
  if (data.didEatMeatOrDairy) {
    const { didEatMeatOrDairy, ...rest } = data
    const keys = Object.keys(rest)
    let total_kgCO2 = 0
    keys.forEach(function (key) {
      if (rest[key]) {
        total_kgCO2 += carbonData.grocery_kgCO2[key]
      }
    })
    return total_kgCO2
  } else {
    return 0
  }
}

/**
 * Compute kgCO2 for non-grocery purchases (Q4)
 * @param {object} data - from question
 * @returns {number} - kgCO2 score for non-grocery purchasing behaviour
 */
function goods_kgCO2(data) {
  if (data.didPurchaseNonGrocery) {
    const { didPurchaseNonGrocery, other, ...rest } = data
    const keys = Object.keys(rest)
    var total_kgCO2 = 0
    keys.forEach(function (key) {
      total_kgCO2 += carbonData.goods_kgCO2[key] * rest[key]
    })
    return total_kgCO2
  } else {
    return 0
  }
}

/**
 * Compute kgCO2 for daily heating use (Q5)
 * @param {integer} data - from question
 * @returns {number} - kgCO2 score for heating
 */
function heating_kgCO2(data, user) {
  if (data.didUseHeating) {
    return data.hoursUsedHeating * carbonData.heating_kgCO2[user.heaterType]
  } else {
    return 0
  }
}

/**
 * Compute kgCO2 for daily electricity use (Q6)
 * @param {integer} data - from question
 * @returns {number} - kgCO2 score for heating
 */
function electricity_kgCO2(data) {
  if (data.electricityUsedInKwh) {
    return (
      data.electricityUsedInKwh * carbonData.electricity_kgCO2.baseCarbonRate
    )
  } else {
    return 0
  }
}

/**
 * Civic behaviour score calculation is the same for all
 */
/**
 * Calculate civic behaviour score for talkToRelation (Q7)
 * @param {object} data - from question
 * @returns {number} - total civic behaviour score for talkToRelation
 */
function talk_to_relation_score(data) {
  let keys = Object.keys(data)
  let total_score = 0
  keys.forEach(function (key) {
    if (data[key] !== 'didNotTalk') {
      total_score += civicData.talkToRelation[key]
    }
  })
  return total_score
}

/**
 * Calculate civic behaviour score for getClimateChangeNews (Q8)
 * @param {object} data - from question
 * @returns {number} - total civic score for getClimateChangeNews
 */
function climate_change_news_score(data) {
  if (data.didGetClimateChangeNews) {
    const { didGetClimateChangeNews, ...rest } = data
    let keys = Object.keys(rest)
    let total_score = 0
    keys.forEach(function (key) {
      if (rest[key]) {
        total_score += civicData.getClimateChangeNews[key]
      }
    })
    return total_score
  } else {
    return 0
  }
}

/**
 * Calculate civic behaviour score for mitigateClimateChange (Q9)
 * @param {object} data - from question
 * @returns {number} - total civic score for mitigateClimateChange
 */
function mitigate_climate_change_score(data) {
  if (data.didMitigateClimateChange) {
    const { didMitigateClimateChange, ...rest } = data
    let keys = Object.keys(rest)
    let total_score = 0
    keys.forEach(function (key) {
      if (rest[key]) {
        if (key === 'other') {
          str = data[key]
          if (typeof str === 'string' && str.length !== 0 && str !== null) {
            total_score += civicData.mitigateClimateChange[key]
          }
        } else {
          total_score += civicData.mitigateClimateChange[key]
        }
      }
    })
    return total_score
  } else {
    return 0
  }
}

/**
 * Map each object property to a function which will perform a
   calculation on that property
 */
// const scoring_map = {
//   driving_miles: score_carbon.driving_kgCO2,
//   flying_hours: score_carbon.flying_kgCO2,
//   grocery_goods_amount: score_carbon.grocery_kgCO2,
//   other_goods_amount: score_carbon.goods_kgCO2,
//   heating_hours: score_carbon.heating_kgCO2,
//   electricity_kwh: score_carbon.electricity_kgCO2,
// }

///* CURRENTLY DEPRECATED */
///**
// * Calculates kgCO2 score from user survey responses
// * @param {object} scores - the user survey responses object
// * @returns {number} - the total kgCO2 score
// */
// function total_kgCO2(scores) {
//    /* Validate scores vs schema */
//    if (!validate(scores)) {
//        console.log(validate.errors);
//       throw new RuntimeException("Data does not match schema");
//    };

//   kgCO2_scores = (
//        {
//            usedCar : scores.usedCar.milesDriven,
//            tookPlane : scores.tookPlane.hoursOfFlightLength,
//            eatMeatOrDairy : scores.eatMeatOrDairy.amounts,
//            purchaseNonGrocery : scores.purchaseNonGrocery.amounts,
//            heating : scores.heating.hoursUsedHeating,
//            electricity : scores.electricity.electricityUsedInKwh
//        });
//    let keys = Object.keys(kgCO2_scores);
//    var total_kgCO2 = 0;
//    keys.forEach(function(key) {
//        /* TODO: Move this to the construction of civic_stores above so that no
//        undefined values appear in the properties subset at all */
//        if (kgCO2_scores[key] != null) {
//            total_kgCO2 += scoring_map[key](kgCO2_scores[key]);
//            //console.log(key);
//            //console.log(scoring_map[key](kgCO2_scores[key]));
//        }
//    });
//    return total_kgCO2;
//}

// /**
//  * Calculates civic behaviour score from user survey responses
//  * @param {object} scores - the user survey responses object
//  * @returns {number} - the total civic behaviour score
//  */
// function total_civic_behaviour(scores) {
//     /* Validate scores vs schema */
//     if (!validate(scores)) {
//         console.log(validate.errors);
// //        throw new RuntimeException("Data does not match schema");
//     };

//     civic_scores = (
//         {
//             climate_change_communications : scores.climate_change_communications,
//             climate_change_news_source : scores.climate_change_news_source,
//             climate_change_action : scores.climate_change_action
//         });
//     let keys = Object.keys(civic_scores);
//     var total_score = 0;
//     keys.forEach(function(key) {
//         /* TODO: Move this to the construction of civic_stores above so that no
//         undefined values appear in the properties subset at all */
//         if (civic_scores[key] != null) {
//             total_score += score_civic_behaviour.scoring(key, civic_scores[key]);
//         };
//     });
//     return total_score;
// }
