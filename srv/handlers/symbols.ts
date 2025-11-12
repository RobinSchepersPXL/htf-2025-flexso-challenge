import * as cds from "@sap/cds";
const { Symbol, SymbolTranslation } = cds.entities;

export const translate = async (req: cds.Request) => {
  req.params.forEach(async (id) => {
    //HACK THE FUTURE Challenge
    //The Symbol entity contains all records that are already translated or will be translated by this action
    //The Symbol Translation entity contains all translation mapping
    //Don't forget that we should be able to translate whole strings, not only singluar symbols
    const record = await SELECT.from(Symbol).where({ ID: id });

  });
};
