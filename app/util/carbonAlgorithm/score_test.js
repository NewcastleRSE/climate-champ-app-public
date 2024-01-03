carbon = require('./carbon_algorithm');

carbon.user_settings.vehicle = "petrol_or_diesel";
carbon.user_settings.heating = "gas_boiler_old";

/* This needs to adhere to the schema definition */
scoresNoData = {
}

scoresAllNo = {
    electricity_kwh : 9
}

scoresScenario1 = {
    driving_miles : 30,
    flying_hours : 5,
    grocery_goods_amount : {
        "lamb" : true,
        "eggs" : true
    },
    other_goods_amount : {
        "furniture" : 1,
        "clothing" : 3,
        "electrical_device_phone" : 1
    },
    heating_hours : 5,
    electricity_kwh : 6,
    climate_change_communications : {},
    climate_change_news_source : {
        "radio" : true,
        "blog" : true
    }
}

scoresScenario2 = {
    grocery_goods_amount : {
        "beef_uk" : true,
        "pork_bacon_ham" : true,
        "milk_cow" : true,
        "cream" : true
    },
    other_goods_amount : {
        "clothing" : 1,
        "cosmetics" : 2,
        "other" : 2
    },
    heating_hours : 2,
    electricity_kwh : 10,
    climate_change_communications : {
        "child" : true,
        "stranger" : true
    },
    climate_change_action : {
        "signed_petition" : true,
        "bank_investment_change" : true
    },

}

scoresScenario3 = {
    driving_miles : 66,
    flying_hours : 10,
    grocery_goods_amount : {
        "beef_uk" : true,
        "beef_south_america" : true,
        "lamb" : true,
        "pork_bacon_ham" : true,
        "chicken" : true,
        "fish_fresh" : true,
        "fish_tinned" : true,
        "eggs" : true,
        "milk_cow" : true,
        "cheese" : true,
        "yoghurt" : true,
        "cream" : true 
    },
    other_goods_amount : {
        "shoes" : 1,
        "clothing" : 1,
        "jewellery" : 1,
        "cosmetics" : 1,
        "furniture" : 1,
        "electrical_device_computer" : 1,
        "electrical_device_phone" : 1,
        "electrical_accessories" : 1,
        "other" : 1
    },
    heating_hours : 8,
    electricity_kwh : 4,
    climate_change_communications : {
        "partner" : true,
        "child" : true,
        "other_family" : true,
        "friend" : true,
        "neighbour" : true,
        "colleague" : true,
        "stranger" : true
    },
    climate_change_news_source : {
        "tv" : true,
        "online_news" : true,
        "newspaper" : true,
        "social_media" : true,
        "radio" : true,
        "podcast" : true,
        "blog" : true,
        "online_streaming" : true
    },
    climate_change_action : {
        "contacted_mp_electronically" : true,
        "contacted_mp_letter" : true,
        "signed_petition": true,
        "contacted_city_council" : true,
        "donated_money" : true,
        "joined_campaign" : true,
        "climate_protest_action" : true,
        "requested_employer_action" : true,
        "pension_fund_change" : true,
        "bank_investment_change" : true,
        "changed_electricity_supplier" : true,
        "green_home_retrofitting_enquiry" : true,
        "other" : true
    }
}

console.log("No Data");
console.log("\tCarbon: " + carbon.total_kgCO2(scoresNoData) + " kg");
console.log("\tCivic Behaviour: " + carbon.total_civic_behaviour(scoresNoData));

console.log("Scores All No");
console.log("\tCarbon: " + carbon.total_kgCO2(scoresAllNo) + " kg");
console.log("\tCivic Behaviour: " + carbon.total_civic_behaviour(scoresAllNo));

console.log("Scenario 1");
console.log("\tCarbon: " + carbon.total_kgCO2(scoresScenario1) + " kg");
console.log("\tCivic Behaviour: " + carbon.total_civic_behaviour(scoresScenario1));

console.log("Scenario 2");
console.log("\tCarbon: " + carbon.total_kgCO2(scoresScenario2) + " kg");
console.log("\tCivic Behaviour: " + carbon.total_civic_behaviour(scoresScenario2));

console.log("Scenario 3");
console.log("\tCarbon: " + carbon.total_kgCO2(scoresScenario3) + " kg");
console.log("\tCivic Behaviour: " + carbon.total_civic_behaviour(scoresScenario3));
