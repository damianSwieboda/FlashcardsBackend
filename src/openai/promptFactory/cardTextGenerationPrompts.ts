export const GENERATE_PROMPT_USAGE_EXAMPLE = (sourceExpression: string) => {
  return `Provide me only very short, simple usage example of this english expression: "${sourceExpression}", try to generate this usage example in context of which this word may be used. Make sure that this usage example is no longer than 12 words.`;
};
export const GENERATE_PROMPT_USAGE_EXAMPLE_TRANSLATION = (
  sourceExpression: string,
  sourceUsageExample: string,
  targetLanguageExpression: string,
  targetLanguageFullName: string
) => {
  return `Here is english expression: "${sourceExpression}", and its usage example: ${sourceUsageExample}, here is mentioned expression translated to ${targetLanguageFullName}: "${targetLanguageExpression}". I need to generate translation of this english expression ussage example in ${targetLanguageFullName}, remember to use the word "${targetLanguageExpression}". Provide only translated usage example.`;
};
export const GENERATE_PROMPT_CHECK_EXPRESSION_TRANSLATION_RISKS = (
  sourceExpression: string,
  targetLanguageExpression: string,
  targetLanguageFullName: string
) => {
  return `Is this english word / expression is correctly translated to ${targetLanguageFullName} language: "${sourceExpression}" translated to "${targetLanguageExpression}"? Or there is someting in ${targetLanguageFullName} that translation of this particular word is more complicated? Provide me only "OK" word if translation is good, but if this translation is not so good, then provide me only sentence starting with "___Error" and short message what is wrong`;
};
