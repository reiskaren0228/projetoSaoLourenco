const logInfo = (message: string): void => {
  console.log(`[INFO] ${message}`);
};

const logError = (message: string, error: Error): void => {
  console.error(`[ERROR] ${message}`, error);
};

export { logInfo, logError };
