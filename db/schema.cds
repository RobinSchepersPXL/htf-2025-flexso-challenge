namespace flexso.cap.htf;

using {
    cuid,
    managed
} from '@sap/cds/common';

// Symbol Translation app *******************************************************************************
entity Symbol : cuid, managed {
    symbol      : String; //The symbol
    whereFound  : String; //Where was this symbol seen?
    language    : String; //To what language-group does this symbol belong to?
    translation : String;
}

entity SymbolTranslation : cuid, managed {
    symbol      : String; //The symbol
    translation : String; //What does the symbol mean?
    language    : String; //To what language-group does this symbol belong to?
}

entity Language : cuid {

    language : String; //To what language-group does this symbol belong to?
}

// Base Repair app **************************************************************************************
entity ProductCamera : cuid, managed {
    name          : String; //The name of the product
    weight        : String;
    dimensions    : String;
    color         : String;
    amountInStock : Int16;
    materials     : Association to many Material
                        on materials.product = $self.ID;
    installations : Association to many Installation
                        on installations.product = $self.ID;
}

entity Material : cuid, managed {
    name                      : String; //The name of the product
    weight                    : String;
    dimensions                : String;
    color                     : String;
    amountInStock             : Int16;
    amountOrderd              : Int16;
    amountNeededForProduction : Int16;
    product                   : UUID;
}

entity Production : cuid {
    icon     : String;
    label    : String;
    position : Int16;
    state    : Composition of many State
                   on state.production = $self.ID;
    product  : UUID;
}

entity State : cuid {
    state      : String;
    value      : Int16;
    production : UUID;
}

entity Installation : cuid, managed {
    product  : UUID;
    status   : String;
    location : String;
    image    : String;
}

// Sonar app **************************************************************************************

entity Sonar : cuid {
    hoursInPast: Int16;
    milesFromBase: Int16;
    finding: String;
    signalStrength: Int16;
    subnauticLocation: Association to SubnauticLocation;
    sonarType: Association to SonarType;
}

entity SonarType: cuid {
    typeName : String;
    typeDescription : String;
}

entity SubnauticLocation: cuid {
    name        : String;
    description : String;
    closestCamera: Association to Installation;
}

// Security Overview app **************************************************************************************
entity CameraImages: cuid {
    recording: String;
    subnauticLocation: Association to SubnauticLocation;
}
