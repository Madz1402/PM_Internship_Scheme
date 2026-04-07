const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

// Schema (must match CSV columns)
const companySchema = new mongoose.Schema({
  company_name: String,
  qualification: String,
  skills_required: String,
  state: String,
  district: String,
  intern_title: String,
});
const Company = mongoose.model("Company", companySchema);

// Function to import CSV
async function importCSV() {
  try {
    await mongoose.connect("mongodb://localhost:27017/internships", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const results = [];

    fs.createReadStream("skills_relevant_fixed.csv")
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          await Company.insertMany(results);
          console.log("✅ CSV import complete!");
        } catch (err) {
          console.error("❌ Error inserting rows:", err.message);
        } finally {
          mongoose.connection.close();
        }
      });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

importCSV();