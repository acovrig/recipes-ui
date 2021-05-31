export default {
  baseURI: `https://${process.env.NODE_ENV === 'development' ? 'dev-' : ''}recipes.thecovrigs.net`,
  hostname: `${process.env.NODE_ENV === 'development' ? 'dev-' : ''}recipes.thecovrigs.net`,
};
