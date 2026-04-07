const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/internships", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const companySchema = new mongoose.Schema({
  company_name: String,
  qualification: String,
  skills_required: String,
  state: String,
  intern_title: String,
});
const Company = mongoose.model("Company", companySchema);

// Recommendation API
app.post("/recommend", async (req, res) => {
  const { qualification, skills, location } = req.body;

  const userQualification = qualification ? qualification.toLowerCase().trim() : "";
  const userSkills = skills ? skills.map((s) => s.toLowerCase().trim()) : [];
  const userLocation = location ? location.toLowerCase().trim() : "";

  // Max possible score (2 for qualification + skills length + 1 for state)
  const maxPossible = 2 + userSkills.length + 1;

  const companies = await Company.find();

  const scored = companies.map((c) => {
    let rawScore = 0;
    let matchedSkills = [];
    let locationPriority = 2; // default = other state

    const companyReq = c.skills_required ? c.skills_required.toLowerCase() : "";

    // Qualification match
    if (c.qualification && c.qualification.toLowerCase().includes(userQualification)) {
      rawScore += 2;
    }

    // Skill matching
    const companySkills = companyReq.split(",").map((s) => s.trim());
    matchedSkills = companySkills.filter((s) => userSkills.includes(s));
    rawScore += matchedSkills.length;

    // State matching only
    if (c.state && c.state.toLowerCase() === userLocation) {
      rawScore += 1;
      locationPriority = 1; // state match
    }

    // Normalize to 100
    const normalizedScore = Math.round((rawScore / maxPossible) * 100);

    return {
      ...c._doc,
      score: normalizedScore,
      matchedSkills,
      locationPriority,
    };
  });

  // Sort by score desc
  const top5 = scored.sort((a, b) => b.score - a.score).slice(0, 5);

  res.json(top5);
});

// Start server
app.listen(5000, () => console.log("✅ Server running on port 5000"));