const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3001;

app.use(cors());

// Helper function to read and parse CSV files
const readCSV = (filePath, providerName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Normalize data structure
        // AWS has 'account_id', GCP has 'project_id'. We map both to 'resource_id'.
        const normalizedItem = {
          date: data.date,
          service: data.service,
          team: data.team,
          env: data.env,
          cost_usd: parseFloat(data.cost_usd), // Ensure cost is a number
          cloud_provider: providerName,
          resource_id: data.account_id || data.project_id || 'N/A'
        };
        results.push(normalizedItem);
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

app.get('/api/spend', async (req, res) => {
  try {
    const awsData = await readCSV('./aws_line_items_12mo.csv', 'AWS');
    const gcpData = await readCSV('./gcp_billing_12mo.csv', 'GCP');
    
    // Combine datasets
    const combinedData = [...awsData, ...gcpData];
    
    // Sort by date (descending)
    combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({ data: combinedData, count: combinedData.length });
  } catch (error) {
    console.error("Error reading CSV files:", error);
    res.status(500).json({ error: "Failed to fetch spend data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});