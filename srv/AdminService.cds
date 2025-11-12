using {flexso.cap.htf as my} from '../db/schema';

service AdminService {

    // Symbol translation app ***********************************************************************************************
    entity Symbols            as projection on my.Symbol
        actions {
            action translateSymbolBound();
        };

    entity SymbolTranslations as projection on my.SymbolTranslation;

    entity Languages          as projection on my.Language;

    // Base repair ***********************************************************************************************

    entity ProductCamera      as projection on my.ProductCamera
        actions {
            action produce();
        };

    entity Materials          as projection on my.Material
        actions {
            action order(amount: Int16, id: UUID);
        };

    entity Production         as projection on my.Production;

    entity Installation       as projection on my.Installation
        actions {
            action replace(id: UUID);
        };

    entity State              as projection on my.State;

    // Sonar app ***********************************************************************************************
    entity Sonar              as projection on my.Sonar;
    entity SubnauticLocation  as projection on my.SubnauticLocation;
    entity SonarType          as projection on my.SonarType;
    
    // Security Overview app ***********************************************************************************************
    entity CameraImages       as projection on my.CameraImages;

    //These functions below might be able to help you in setting up the security overview app
    //Or they could be a good starting point for your own functions or actions!
    function checkCameraAvailability() returns Boolean;

    function getCamerarecordingIdForLocation(location: UUID) returns UUID;
}