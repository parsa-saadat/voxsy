export const validateFileContent = (buffer) => {
  const content = buffer.toString('utf-8').toLowerCase();

  const forbiddenPatterns = [
    /<script.*?>.*?<\/script>/,
    /javascript:/,
    /<iframe.*?>.*?<\/iframe>/,
    /<object.*?>.*?<\/object>/,
    /<embed.*?>.*?<\/embed>/,
    /<\?php.*?\?>/,
  ];

  return !forbiddenPatterns.some(pattern => pattern.test(content));
};