export const EXPRESSION_TRANSLATION = 'EXPRESSION_TRANSLATION';
export const USAGE_EXAMPLE = 'USAGE_EXAMPLE';
export const USAGE_EXAMPLE_TRANSLATION = 'USAGE_EXAMPLE_TRANSLATION';

export const GENERATE_INSTRUCTION = (instructionName, input) => {
  switch (instructionName) {
    case 'USAGE_EXAMPLE':
      return `Generate and provide only example of usage of expression: ${input.expression} in ${input.sourceLanguage} language`;
    case 'USAGE_EXAMPLE_TRANSLATION':
      // translate this ${input.sourceLanguage} expression usage example: ${input.usageExample}, to ${input.targetLanguage} language, generate only answer
      return `Generate and provide only example of usage of expression: ${input.expression} in ${input.sourceLanguage} language`;
  }
};
