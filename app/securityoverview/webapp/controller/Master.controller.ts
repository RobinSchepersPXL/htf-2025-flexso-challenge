import Controller from "sap/ui/core/mvc/Controller";
import ui5Event from "sap/ui/base/Event";
import Component from "../Component";
import { LayoutType } from "sap/f/library";
import JSONModel from "sap/ui/model/json/JSONModel";
import UIComponent from "sap/ui/core/UIComponent";
import { Route$MatchedEvent } from "sap/ui/core/routing/Route";

/**
 * @namespace flexso.cap.htf.securityoverview.controller
 */
export default class Master extends Controller {
  private appViewModel: JSONModel;

  public onInit(): void {
    //Routings can be tricky! Don't hesitate to ask for help if you get stuck
    const router = (this.getOwnerComponent() as Component).getRouter();
    router.getRoute("master")?.attachMatched(this.onRouteMatched.bind(this));
    router.getRoute("masterWithSelection")?.attachMatched(this.onRouteMatched.bind(this));

    //This is a local JSON Model that tracks whether a location is selected or not
    this.appViewModel = new JSONModel({
      hasSelectedLocation: false
    });
  }

  private onRouteMatched(event: Route$MatchedEvent): void {
    //Here we will also have to pass along the correct camera image guid to the view
    //Once that happens, we can start filling our frontend with data about the camera image
    //That way we will discovered what is happening at that location and possibly solve the mystery
    let cameraImageGuid = "";

    if (event.getParameter("name") === "masterWithSelection") {
      this.appViewModel.setProperty("/hasSelectedLocation", true);
      this.getView()?.bindElement(
        { path: `/CameraImages(${cameraImageGuid})` }
      )
    }
  }

  public onSelectLocation(oEvent: ui5Event): void {
    //HACK THE FUTURE Challenge:
    //When a location is selected, we want to route to a different page with the details for the camera image of that location
    //The camera image GUID is different than the location guid, maybe you can write some code to get the correct one?
    let cameraImageGuid = "";

    const router = (this.getOwnerComponent() as UIComponent).getRouter();
    router.navTo("masterWithSelection", {
      id: cameraImageGuid
    });
  }

}
