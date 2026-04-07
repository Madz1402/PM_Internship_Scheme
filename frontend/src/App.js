import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";
import { Home, Image, FileCheck2, Info, Globe } from "lucide-react";
import emblem from "./assets/India.jpg";
import ministerLogo from "./assets/Minister.png";

// Dropdown options
const skillsOptions = [
  'API Development', 'AWS', 'Agile', 'Angular', 'Azure', 'Bootstrap',
  'Business Writing', 'C', 'C++', 'CI/CD', 'CSS', 'Cisco', 'Communication',
  'Data Analysis', 'Data Visualization', 'Deep Learning', 'Docker',
  'Embedded C', 'Excel', 'Figma', 'Firewalls', 'Frontend development', 'Git',
  'Google Cloud', 'HTML', 'IoT', 'Java', 'JavaScript', 'Kubernetes', 'Linux',
  'MATLAB', 'MS Excel', 'Machine Learning', 'Microcontrollers', 'MongoDB',
  'MySQL', 'NLP', 'Networking', 'Node', 'Node.js', 'OOP', 'PCB Design',
  'PostgreSQL', 'Power BI', 'Problem Solving', 'PyTorch', 'Python', 'REST API',
  'React Native', 'React.js', 'Routing', 'SQL', 'Spring Boot', 'Statistics',
  'Switching', 'Tableau', 'Teamwork', 'TensorFlow', 'UI/UX'
];

const qualificationOptions = [
  "BCA", "B.Tech Computer Science", "M.Tech Computer Science",
  "B.Sc IT", "B.Tech ECE", "B.Com", "MBA", "MCA"
];

const stateOptions = [
  "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "West Bengal"
];

// 🌐 Translations
const translations = {
  en: { govt: "Government of India", govt_hi: "भारत सरकार", portal: "PM Internship Portal", internships: "Internship Opportunities", search: "🔍 Search", noResults: "No results yet. Try searching!", results: "Recommended Internships", inState: "Internships in Your State", other: "Other Internships", qualification: "Any Qualification", skill: "Any Skill", state: "Any State", home: "Home", gallery: "Gallery", eligibility: "Eligibility", about: "About Us" },
  hi: { govt: "भारत सरकार", govt_hi: "Government of India", portal: "पीएम इंटर्नशिप पोर्टल", internships: "इंटर्नशिप अवसर", search: "🔍 खोजें", noResults: "कोई परिणाम नहीं मिला। कोशिश करें!", results: "अनुशंसित इंटर्नशिप", inState: "आपके राज्य में इंटर्नशिप", other: "अन्य इंटर्नशिप", qualification: "कोई भी योग्यता", skill: "कोई भी कौशल", state: "कोई भी राज्य", home: "होम", gallery: "गैलरी", eligibility: "पात्रता", about: "हमारे बारे में" },
  ta: { govt: "இந்திய அரசு", govt_hi: "Government of India", portal: "பிரதமர் இன்டர்ன்ஷிப் போர்டல்", internships: "இன்டர்ன்ஷிப் வாய்ப்புகள்", search: "🔍 தேடு", noResults: "முடிவுகள் இல்லை. முயற்சி செய்க!", results: "பரிந்துரைக்கப்பட்ட இன்டர்ன்ஷிப்புகள்", inState: "உங்கள் மாநிலத்தில் இன்டர்ன்ஷிப்புகள்", other: "பிற இன்டர்ன்ஷிப்புகள்", qualification: "எந்த தகுதியும்", skill: "எந்த திறனும்", state: "எந்த மாநிலமும்", home: "முகப்பு", gallery: "காட்சியகம்", eligibility: "தகுதி", about: "எங்களை பற்றி" },
  te: { govt: "భారత ప్రభుత్వం", govt_hi: "Government of India", portal: "ప్రధాని ఇంటర్న్షిప్ పోర్టల్", internships: "ఇంటర్న్షిప్ అవకాశాలు", search: "🔍 వెతకండి", noResults: "ఫలితాలు లేవు. ప్రయత్నించండి!", results: "సిఫారసు చేసిన ఇంటర్నషిప్స్", inState: "మీ రాష్ట్రంలో ఇంటర్న్షిప్స్", other: "ఇతర ఇంటర్న్షిప్స్", qualification: "ఏదైనా అర్హత", skill: "ఏదైనా నైపుణ్యం", state: "ఏదైనా రాష్ట్రం", home: "హోమ్", gallery: "గ్యాలరీ", eligibility: "అర్హత", about: "మా గురించి" },
  bn: { govt: "ভারত সরকার", govt_hi: "Government of India", portal: "প্রধানমন্ত্রী ইন্টার্নশিপ পোর্টাল", internships: "ইন্টার্নশিপের সুযোগ", search: "🔍 অনুসন্ধান করুন", noResults: "কোন ফলাফল নেই। আবার চেষ্টা করুন!", results: "প্রস্তাবিত ইন্টার্নশিপ", inState: "আপনার রাজ্যে ইন্টার্নশিপ", other: "অন্যান্য ইন্টার্নশিপ", qualification: "যেকোনো যোগ্যতা", skill: "যেকোনো দক্ষতা", state: "যেকোনো রাজ্য", home: "হোম", gallery: "গ্যালারি", eligibility: "যোগ্যতা", about: "আমাদের সম্পর্কে" },
  ml: { govt: "ഇന്ത്യൻ സർക്കാർ", govt_hi: "Government of India", portal: "പ്രധാനമന്ത്രി ഇന്റേൺഷിപ്പ് പോർട്ടൽ", internships: "ഇന്റേൺഷിപ്പ് അവസരങ്ങൾ", search: "🔍 തിരയുക", noResults: "ഫലങ്ങളൊന്നും കണ്ടെത്താനായില്ല. വീണ്ടും ശ്രമിക്കുക!", results: "ശുപാർശ ചെയ്ത ഇന്റേൺഷിപ്പുകൾ", inState: "നിങ്ങളുടെ സംസ്ഥാനത്തിലെ ഇന്റേൺഷിപ്പുകൾ", other: "മറ്റ് ഇന്റേൺഷിപ്പുകൾ", qualification: "ഏതെങ്കിലും യോഗ്യത", skill: "ഏതെങ്കിലും കഴിവ്", state: "ഏതെങ്കിലും സംസ്ഥാനം", home: "ഹോം", gallery: "ഗാലറി", eligibility: "യോഗ്യത", about: "ഞങ്ങളെക്കുറിച്ച്" },
};

function Internship() {
  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState([]); // multiple skills
  const [state, setState] = useState("");
  const [results, setResults] = useState([]);
  const [language, setLanguage] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false); // language dropdown
  const dropdownRef = useRef(null);

  const t = translations[language];
  const skillOptionsFormatted = skillsOptions.map((s) => ({ value: s, label: s }));

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qualification && skills.length === 0 && !state) {
      alert("Please select at least one filter before searching.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/recommend", {
        qualification,
        skills,
        location: state,
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  const localResults = results.filter((r) => r.locationPriority === 1);
  const otherResults = results.filter((r) => r.locationPriority === 2);

  const languages = [
    { code: "en", label: "🇬🇧 English" },
    { code: "hi", label: "🇮🇳 हिंदी" },
    { code: "ta", label: "🇮🇳 தமிழ்" },
    { code: "te", label: "🇮🇳 తెలుగు" },
    { code: "bn", label: "🇮🇳 বাংলা" },
    { code: "ml", label: "🇮🇳 മലയാളം" },
  ];

  return (
    <div className="App">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src={emblem} alt="Emblem" className="logo" />
          <div className="gov-text">
            <span>{t.govt}</span>
            <span>{t.govt_hi}</span>
          </div>
        </div>
        <div className="navbar-right" ref={dropdownRef}>
          <div className="dropdown">
            <button
              className="dropbtn"
              style={{ backgroundColor: "#007bff", color: "white" }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Globe size={16} /> {languages.find((l) => l.code === language).label}
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setDropdownOpen(false);
                    }}
                    className={language === lang.code ? "active-lang" : ""}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Scheme Bar */}
      <div className="scheme-bar">
        <div className="scheme-left">
          <img src={ministerLogo} alt="Minister Logo" className="minister-logo" />
          <h1 className="scheme-text">{t.portal}</h1>
        </div>
      </div>

      {/* Dark Blue Secondary Navbar */}
      <div className="menu-bar">
        <a href="#" className="menu-item"><Home size={18}/> {t.home}</a>
        <a href="#" className="menu-item"><Image size={18}/> {t.gallery}</a>
        <a href="#" className="menu-item"><FileCheck2 size={18}/> {t.eligibility}</a>
        <a href="#" className="menu-item"><Info size={18}/> {t.about}</a>
      </div>

      {/* Filter Section */}
      <div className="internship-section">
        <h2>{t.internships}</h2>
        <form className="filter-form" onSubmit={handleSubmit}>
          <select value={qualification} onChange={(e) => setQualification(e.target.value)}>
            <option value="">{t.qualification}</option>
            {qualificationOptions.map((q) => <option key={q}>{q}</option>)}
          </select>

          <Select
            options={skillOptionsFormatted}
            value={skillOptionsFormatted.filter((s) => skills.includes(s.value))}
            onChange={(selected) => setSkills(selected ? selected.map((s) => s.value) : [])}
            isClearable
            isMulti
            placeholder={t.skill}
            isSearchable
          />

          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">{t.state}</option>
            {stateOptions.map((s) => <option key={s}>{s}</option>)}
          </select>

          <button type="submit">{t.search}</button>
        </form>

        <div className="results">
          <h3>{t.results}</h3>
          {results.length === 0 ? (
            <p>{t.noResults}</p>
          ) : (
            <>
              {localResults.length > 0 && (
                <>
                  <h4>{t.inState}</h4>
                  <ul>
                    {localResults.map((r, i) => (
                      <InternCard key={i} r={r} />
                    ))}
                  </ul>
                </>
              )}
              {otherResults.length > 0 && (
                <>
                  <h4>{t.other}</h4>
                  <ul>
                    {otherResults.map((r, i) => (
                      <InternCard key={i} r={r} />
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Card component
function InternCard({ r }) {
  return (
    <li className="intern-card">
      <b>{r.intern_title}</b> @ {r.company_name}
      <div>Location: {r.district}, {r.state}</div>
      <div>Qualification: {r.qualification}</div>
      <div>Skills Required: {r.skills_required}</div>
      <div>Match Score: {r.score}%</div>
    </li>
  );
}

export default Internship;
