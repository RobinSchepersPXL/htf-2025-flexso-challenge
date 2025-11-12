import * as cds from "@sap/cds";
const { Symbol, SymbolTranslation } = cds.entities;

export const translate = async (req: cds.Request) => {
  // Iterate over all IDs provided in the request parameters
  for (const id of req.params) {
    // Fetch the record from the Symbol entity
    const record = await SELECT.one.from(Symbol).where({ ID: id });

    if (!record) {
      console.warn(`No record found for ID: ${id}`);
      continue;
    }

    // Check if the record contains a string or singular symbols
    const inputText = record.text; // Assuming the field to translate is `text`
    if (!inputText) {
      console.warn(`No text found for record ID: ${id}`);
      continue;
    }

    // Fetch all translation mappings from the SymbolTranslation entity
    const translations = await SELECT.from(SymbolTranslation);

    // Perform the translation
    let translatedText = inputText;
    translations.forEach((mapping: any) => {
      const { source, target } = mapping; // Assuming `source` and `target` fields exist
      const regex = new RegExp(source, "g"); // Use regex for global replacement
      translatedText = translatedText.replace(regex, target);
    });

    // Update the Symbol entity with the translated text
    await UPDATE(Symbol).set({ translatedText }).where({ ID: id });

    console.log(`Translated record ID: ${id}, Original: "${inputText}", Translated: "${translatedText}"`);
  }
};