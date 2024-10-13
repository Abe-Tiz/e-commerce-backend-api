const path = require("path");
const { displayLogData } = require("../logging/LoggReader");

const viewLogs = async (req, res) => {
  const logFilePath = path.resolve(__dirname, "../combined.log");
  try {
    const logData = await displayLogData(logFilePath);
     res.json(logData); 
  } catch (error) {
    res.status(500).json({ error: error.message });  
  }
};

module.exports = {
  viewLogs,
};
