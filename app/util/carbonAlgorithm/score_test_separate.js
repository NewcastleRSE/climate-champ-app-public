const carbon = require("./carbon_algorithm.js");


/* This needs to adhere to the schema definition */
scoresNoData = {
    usedCar : {},
    tookPlane : {},
    eatMeatOrDairy : {},
    purchaseNonGrocery : {},
    heating : {},
    electricity : {},
    talkToRelation : {},
    getClimateChangeNews : {},
    mitigateClimateChange : {}
}

scoresAllNo = {
    usedCar : {
        didUseCar : false
    },
    tookPlane : {        
        didTakePlane : false
    },
    eatMeatOrDairy : {
        didEatMeatOrDairy : false
    },
    purchaseNonGrocery : {
        didPurchaseNonGrocery : false
    },
    heating : {
        didUseHeating : false
    },
    electricity : {
        electricityUsedInKwh : 9
    },
    talkToRelation : {},
    getClimateChangeNews : {},
    mitigateClimateChange : {}
}

scoresScenario1 = {
    usedCar : {
        didUseCar : true,
        milesDriven : 30
    },
    tookPlane : {
        didTakePlane : true,
        hoursOfFlightLength: 5
    },
    eatMeatOrDairy : {
        didEatMeatOrDairy : true,
        lamb : true,
        eggs : true
    },
    purchaseNonGrocery : {
        didPurchaseNonGrocery : true,
        furniture : 1,
        clothes : 3,
        electricDevicePhone : 1
    },
    heating : {
        didUseHeating : true,
        hoursUsedHeating : 5
    },
    electricity : {
        electricityUsedInKwh : 6
    },
    talkToRelation : {
        talkedToPartnerOrHusbandOrWife : "didNotTalk",
        talkedToYourChild : "didNotTalk",
        talkedToOtherFamily : "didNotTalk",
        talkedToFriend : "didNotTalk",
        talkedToNeighbour : "didNotTalk",
        talkedToColleague : "didNotTalk",
        talkedToStranger : "didNotTalk"
    },
    getClimateChangeNews : {
        didGetClimateChangeNews : true,
        mediaSourceRadio : true,
        mediaSourceBlog : true
    },
    mitigateClimateChange : {
        didMitigateClimateChange : false
    }
}

scoresScenario2 = {
    usedCar : {},
    tookPlane : {},
    eatMeatOrDairy : {
        didEatMeatOrDairy : true,
        beefUK : true,
        porkOrBaconOrHam : true,
        milkCow : true,
        cream : true
    },
    purchaseNonGrocery : {
        didPurchaseNonGrocery : true,
        clothes : 1,
        cosmeticsOrToiletries : 2,
        other : "Halloween decorations"
    },
    heating : {
        didUseHeating : true,
        hoursUsedHeating : 2
    },
    electricity : {
        electricityUsedInKwh : 10
    },
    talkToRelation : {
        talkedToYourChild : "confused",
        talkedToStranger : "interested"
    },
    getClimateChangeNews : {},
    mitigateClimateChange : {
        didMitigateClimateChange : true,
        didSignPetition : true,
        didContactBank : true
    }
}

scoresScenario3 = {
    usedCar : {
        didUseCar : true,
        milesDriven : 66
    },
    tookPlane : {
        didTakePlane : true,
        hoursOfFlightLength : 10
    },
    eatMeatOrDairy : {
        didEatMeatOrDairy: true,
        beefUK : true,
        beefSouthAmerica : true,
        lamb : true,
        porkOrBaconOrHam : true,
        chicken : true,
        freshFish : true,
        tinnedFish : true,
        eggs : true,
        milkCow : true,
        cheese : true,
        yoghurt : true,
        cream : true 
    },
    purchaseNonGrocery : {
        didPurchaseNonGrocery : true,
        shoesPair : 1,
        clothes : 1,
        jewellery : 1,
        cosmeticsOrToiletries : 1,
        furniture : 1,
        electricDeviceLaptopOrDesktopOrTV : 1,
        electricDevicePhone : 1,
        electricAccessories : 1,
        other : "Paint"
    },
    heating : {
        didUseHeating : true,
        hoursUsedHeating : 8
    },
    electricity : {
        electricityUsedInKwh : 4
    },
    talkToRelation : {
        talkedToPartnerOrHusbandOrWife : "interested",
        talkedToYourChild : "confused",
        talkedToOtherFamily : "annoyed",
        talkedToFriend : "anxious",
        talkedToNeighbour : "dismissive",
        talkedToColleague : "engaged",
        talkedToStranger : "sad"
    },
    getClimateChangeNews : {
        didGetClimateChangeNews: true,
        mediaSourceTV : true,
        mediaSourceOnlineNews : true,
        mediaSourceNewsPaper : true,
        mediaSourceSocialMedia : true,
        mediaSourceRadio : true,
        mediaSourcePodcast : true,
        mediaSourceBlog : true,
        mediaSourceYoutube : true
    },
    mitigateClimateChange : {
        didMitigateClimateChange: true,
        didContactMPViaSocialMediaOrEmail : true,
        didContactMPViaLetter : true,
        didSignPetition: true,
        didContactCityCouncil : true,
        didDonateForClimateCause : true,
        didJoinClimateCampaignGroup : true,
        didClimateProtestAction : true,
        didContactEmplover : true,
        didContactPensionFund : true,
        didContactBank : true,
        didChangeElectricitySupplier : true,
        didEnquireGreenHomeRetrofitting : true,
        other : "Saved some whales"
    }
}

console.log("No Data");
console.log("\tQ1: " + carbon.getCarbonScore(scoresNoData.usedCar, 1) + " kg");
console.log("\tQ2: " + carbon.getCarbonScore(scoresNoData.tookPlane, 2) + " kg");
console.log("\tQ3: " + carbon.getCarbonScore(scoresNoData.eatMeatOrDairy, 3) + " kg");
console.log("\tQ4: " + carbon.getCarbonScore(scoresNoData.purchaseNonGrocery, 4) + " kg");
console.log("\tQ5: " + carbon.getCarbonScore(scoresNoData.heating, 5) + " kg");
console.log("\tQ6: " + carbon.getCarbonScore(scoresNoData.electricity, 6) + " kg");
console.log("\tQ7: " + carbon.getCarbonScore(scoresNoData.talkToRelation, 7));
console.log("\tQ8: " + carbon.getCarbonScore(scoresNoData.getClimateChangeNews, 8));
console.log("\tQ9: " + carbon.getCarbonScore(scoresNoData.mitigateClimateChange, 9));


console.log("Answers All No");
console.log("\tQ1: " + carbon.getCarbonScore(scoresAllNo.usedCar, 1) + " kg");
console.log("\tQ2: " + carbon.getCarbonScore(scoresAllNo.tookPlane, 2) + " kg");
console.log("\tQ3: " + carbon.getCarbonScore(scoresAllNo.eatMeatOrDairy, 3) + " kg");
console.log("\tQ4: " + carbon.getCarbonScore(scoresAllNo.purchaseNonGrocery, 4) + " kg");
console.log("\tQ5: " + carbon.getCarbonScore(scoresAllNo.heating, 5) + " kg");
console.log("\tQ6: " + carbon.getCarbonScore(scoresAllNo.electricity, 6) + " kg");
console.log("\tQ7: " + carbon.getCarbonScore(scoresAllNo.talkToRelation, 7));
console.log("\tQ8: " + carbon.getCarbonScore(scoresAllNo.getClimateChangeNews, 8));
console.log("\tQ9: " + carbon.getCarbonScore(scoresAllNo.mitigateClimateChange, 9));

console.log("Scenario 1");
console.log("\tQ1: " + carbon.getCarbonScore(scoresScenario1.usedCar, 1) + " kg");
console.log("\tQ2: " + carbon.getCarbonScore(scoresScenario1.tookPlane, 2) + " kg");
console.log("\tQ3: " + carbon.getCarbonScore(scoresScenario1.eatMeatOrDairy, 3) + " kg");
console.log("\tQ4: " + carbon.getCarbonScore(scoresScenario1.purchaseNonGrocery, 4) + " kg");
console.log("\tQ5: " + carbon.getCarbonScore(scoresScenario1.heating, 5) + " kg");
console.log("\tQ6: " + carbon.getCarbonScore(scoresScenario1.electricity, 6) + " kg");
console.log("\tQ7: " + carbon.getCarbonScore(scoresScenario1.talkToRelation, 7));
console.log("\tQ8: " + carbon.getCarbonScore(scoresScenario1.getClimateChangeNews, 8));
console.log("\tQ9: " + carbon.getCarbonScore(scoresScenario1.mitigateClimateChange, 9));

console.log("Scenario 2");
console.log("\tQ1: " + carbon.getCarbonScore(scoresScenario2.usedCar, 1) + " kg");
console.log("\tQ2: " + carbon.getCarbonScore(scoresScenario2.tookPlane, 2) + " kg");
console.log("\tQ3: " + carbon.getCarbonScore(scoresScenario2.eatMeatOrDairy, 3) + " kg");
console.log("\tQ4: " + carbon.getCarbonScore(scoresScenario2.purchaseNonGrocery, 4) + " kg");
console.log("\tQ5: " + carbon.getCarbonScore(scoresScenario2.heating, 5) + " kg");
console.log("\tQ6: " + carbon.getCarbonScore(scoresScenario2.electricity, 6) + " kg");
console.log("\tQ7: " + carbon.getCarbonScore(scoresScenario2.talkToRelation, 7));
console.log("\tQ8: " + carbon.getCarbonScore(scoresScenario2.getClimateChangeNews, 8));
console.log("\tQ9: " + carbon.getCarbonScore(scoresScenario2.mitigateClimateChange, 9));

console.log("Scenario 3");
console.log("\tQ1: " + carbon.getCarbonScore(scoresScenario3.usedCar, 1) + " kg");
console.log("\tQ2: " + carbon.getCarbonScore(scoresScenario3.tookPlane, 2) + " kg");
console.log("\tQ3: " + carbon.getCarbonScore(scoresScenario3.eatMeatOrDairy, 3) + " kg");
console.log("\tQ4: " + carbon.getCarbonScore(scoresScenario3.purchaseNonGrocery, 4) + " kg");
console.log("\tQ5: " + carbon.getCarbonScore(scoresScenario3.heating, 5) + " kg");
console.log("\tQ6: " + carbon.getCarbonScore(scoresScenario3.electricity, 6) + " kg");
console.log("\tQ7: " + carbon.getCarbonScore(scoresScenario3.talkToRelation, 7));
console.log("\tQ8: " + carbon.getCarbonScore(scoresScenario3.getClimateChangeNews, 8));
console.log("\tQ9: " + carbon.getCarbonScore(scoresScenario3.mitigateClimateChange, 9));
