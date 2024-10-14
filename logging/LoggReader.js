const fs = require("fs");

const readLogFile = (logFilePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(logFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading log file:", err);
        return reject(err);  
      }
      const logEntries = data
        .split("\n")
        .map((line) => {
          try {
            return JSON.parse(line);  
          } catch (e) {
            return null;  
          }
        })
        .filter((entry) => entry !== null);  

      resolve(logEntries);  
    });
  });
};

const displayLogData = async (logFilePath) => {
  try {
    const logData = await readLogFile(logFilePath);
    return logData;  
  } catch (error) {
    console.error("Failed to display log data:", error);
    throw error;  
  }
};

module.exports = {
  readLogFile,
  displayLogData,
};
