# AI-Based Internship Recommendation Engine

### Smart India Hackathon 2025 – SIH25034

---

## Project Overview

The AI-Based Internship Recommendation Engine is designed to help students identify the most relevant internships under the PM Internship Scheme.

Instead of navigating long and complex internship listings, the system provides personalized recommendations based on:

* Education
* Skills
* Preferred Sector
* Location

---

## Objectives

* Reduce confusion in internship selection
* Improve accuracy of student–internship matching
* Support rural and first-generation learners
* Provide a scalable and lightweight solution

---

## Key Features

* Skill-based internship matching
* Rule-based and weighted scoring recommendation system
* Simple and user-friendly interface
* Mobile-friendly design
* Multilingual support through API integration

---

## Technology Stack

### Frontend

* React.js

### Backend

* Node.js (Express) / FastAPI (depending on implementation)

### Database / Dataset

* Excel dataset (`skills_relevant_fixed.xlsx`)
* Can be extended to MySQL or PostgreSQL in production

### Additional Tools

* Google Translate API
* AWS (optional deployment)

---

## Project Structure

```bash
project-root/
│
├── backend/
│   ├── server.js
│   ├── import.js
│   ├── skills_relevant_fixed.xlsx
│   ├── package.json
│
├── frontend/
│   ├── package.json
│   ├── src/
│
├── README.md
├── .gitignore
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-link>
cd project-root
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Important Notes

* The `node_modules` folder is not included in this repository due to its large size
* All dependencies will be installed using `npm install`
* Ensure Node.js is installed before running the project

---

## Working Principle

1. The user provides input such as skills, education, and location
2. The backend processes the input data
3. The recommendation engine filters available internships
4. Internships are ranked using a weighted scoring mechanism
5. The top recommendations are displayed on the user interface

---

## Dataset

* File: `skills_relevant_fixed.xlsx`
* Purpose: Maps user skills to relevant internship opportunities

---

## Future Enhancements

* Integration with real-time internship APIs
* Migration from Excel to MySQL/PostgreSQL
* Implementation of advanced machine learning models
* User authentication and profile management
* Offline-first support for low-connectivity regions

---

## Impact

* Improves access to internship opportunities for rural students
* Encourages participation in government initiatives
* Enhances employability and job readiness
* Bridges the gap between urban and rural opportunities

---

## Team Details

Team Name: Pixel Pirates
Hackathon: Smart India Hackathon 2025
Problem ID: SIH25034

---

## License

This project is developed for academic and hackathon purposes.

---

## Acknowledgment

* Government of India – PM Internship Scheme
* Smart India Hackathon (SIH)
* Open-source community
