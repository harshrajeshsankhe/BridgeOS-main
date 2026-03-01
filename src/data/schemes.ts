export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  ministry: string;
  benefit: string;
  benefitHi: string;
  eligibility: string[];
  eligibilityHi: string[];
  applyUrl: string;
  category: string;
  states: string[];
  maxIncome?: number;
  requiredCategories?: string[];
  requiredOccupations?: string[];
  requiresBpl?: boolean;
  estimatedBenefitValue: number;
  difficulty: "easy" | "medium" | "documents_required";
  deadlineDays?: number;
  documents: string[];
  documentsHi: string[];
}

export const schemes: Scheme[] = [
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    nameHi: "प्रधानमंत्री आवास योजना",
    ministry: "Ministry of Housing and Urban Affairs",
    benefit: "Financial assistance up to ₹2.67 lakh for building a pucca house",
    benefitHi: "पक्का घर बनाने के लिए ₹2.67 लाख तक की आर्थिक सहायता",
    eligibility: ["BPL family", "No pucca house", "Income below ₹18 lakh/year"],
    eligibilityHi: ["बीपीएल परिवार", "कोई पक्का घर नहीं", "आय ₹18 लाख/वर्ष से कम"],
    applyUrl: "https://pmaymis.gov.in",
    category: "Housing",
    states: ["All"],
    maxIncome: 18000,
    requiresBpl: true,
    estimatedBenefitValue: 267000,
    difficulty: "documents_required",
    deadlineDays: 45,
    documents: ["Aadhaar Card", "Income Certificate", "BPL Card", "Land Documents", "Bank Passbook"],
    documentsHi: ["आधार कार्ड", "आय प्रमाणपत्र", "बीपीएल कार्ड", "भूमि दस्तावेज", "बैंक पासबुक"],
  },
  {
    id: "ujjwala",
    name: "PM Ujjwala Yojana",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना",
    ministry: "Ministry of Petroleum and Natural Gas",
    benefit: "Free LPG connection with first refill and stove",
    benefitHi: "पहली रिफिल और चूल्हे के साथ मुफ्त एलपीजी कनेक्शन",
    eligibility: ["BPL household", "Women applicant", "No existing LPG connection"],
    eligibilityHi: ["बीपीएल परिवार", "महिला आवेदक", "कोई मौजूदा एलपीजी कनेक्शन नहीं"],
    applyUrl: "https://www.pmujjwalayojana.com",
    category: "Welfare",
    states: ["All"],
    requiresBpl: true,
    estimatedBenefitValue: 3200,
    difficulty: "easy",
    deadlineDays: 30,
    documents: ["Aadhaar Card", "BPL Card", "Bank Passbook"],
    documentsHi: ["आधार कार्ड", "बीपीएल कार्ड", "बैंक पासबुक"],
  },
  {
    id: "widow-pension",
    name: "National Widow Pension Scheme",
    nameHi: "राष्ट्रीय विधवा पेंशन योजना",
    ministry: "Ministry of Rural Development",
    benefit: "Monthly pension of ₹300-₹500 for widows",
    benefitHi: "विधवाओं के लिए ₹300-₹500 मासिक पेंशन",
    eligibility: ["Widow", "Age 40-79", "BPL family"],
    eligibilityHi: ["विधवा", "आयु 40-79", "बीपीएल परिवार"],
    applyUrl: "https://nsap.nic.in",
    category: "Pension",
    states: ["All"],
    requiredCategories: ["Widow"],
    requiresBpl: true,
    estimatedBenefitValue: 6000,
    difficulty: "medium",
    deadlineDays: 60,
    documents: ["Aadhaar Card", "Death Certificate of Husband", "BPL Card", "Age Proof"],
    documentsHi: ["आधार कार्ड", "पति का मृत्यु प्रमाणपत्र", "बीपीएल कार्ड", "आयु प्रमाण"],
  },
  {
    id: "pmkvy",
    name: "PMKVY Skill Development",
    nameHi: "पीएमकेवीवाई कौशल विकास",
    ministry: "Ministry of Skill Development",
    benefit: "Free skill training with certification and ₹8,000 reward",
    benefitHi: "प्रमाणपत्र और ₹8,000 इनाम के साथ मुफ्त कौशल प्रशिक्षण",
    eligibility: ["Age 15-45", "Indian citizen", "Class 10 pass or dropout"],
    eligibilityHi: ["आयु 15-45", "भारतीय नागरिक", "कक्षा 10 पास या ड्रॉपआउट"],
    applyUrl: "https://www.pmkvyofficial.org",
    category: "Skills",
    states: ["All"],
    requiredOccupations: ["Unemployed", "Student", "Daily Wage"],
    estimatedBenefitValue: 8000,
    difficulty: "easy",
    deadlineDays: 20,
    documents: ["Aadhaar Card", "Class 10 Marksheet"],
    documentsHi: ["आधार कार्ड", "कक्षा 10 अंकपत्र"],
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat - PMJAY",
    nameHi: "आयुष्मान भारत - पीएमजेएवाई",
    ministry: "Ministry of Health and Family Welfare",
    benefit: "Health insurance cover of ₹5 lakh per family per year",
    benefitHi: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवर",
    eligibility: ["BPL family", "No other health insurance", "SECC listed"],
    eligibilityHi: ["बीपीएल परिवार", "कोई अन्य स्वास्थ्य बीमा नहीं", "SECC सूचीबद्ध"],
    applyUrl: "https://pmjay.gov.in",
    category: "Health",
    states: ["All"],
    requiresBpl: true,
    estimatedBenefitValue: 500000,
    difficulty: "medium",
    deadlineDays: 90,
    documents: ["Aadhaar Card", "Ration Card", "BPL Card", "Family Photo"],
    documentsHi: ["आधार कार्ड", "राशन कार्ड", "बीपीएल कार्ड", "परिवार फोटो"],
  },
  {
    id: "kisan-samman",
    name: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    ministry: "Ministry of Agriculture",
    benefit: "₹6,000 per year in three installments to farmer families",
    benefitHi: "किसान परिवारों को तीन किस्तों में ₹6,000 प्रति वर्ष",
    eligibility: ["Land-owning farmer", "Indian citizen"],
    eligibilityHi: ["भूमि वाले किसान", "भारतीय नागरिक"],
    applyUrl: "https://pmkisan.gov.in",
    category: "Agriculture",
    states: ["All"],
    requiredOccupations: ["Farmer"],
    estimatedBenefitValue: 6000,
    difficulty: "easy",
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
    documentsHi: ["आधार कार्ड", "भूमि अभिलेख", "बैंक पासबुक"],
  },
  {
    id: "sukanya",
    name: "Sukanya Samriddhi Yojana",
    nameHi: "सुकन्या समृद्धि योजना",
    ministry: "Ministry of Finance",
    benefit: "Savings scheme for girl child with 8% interest rate",
    benefitHi: "8% ब्याज दर के साथ बालिकाओं के लिए बचत योजना",
    eligibility: ["Girl child below 10 years", "Indian resident"],
    eligibilityHi: ["10 वर्ष से कम उम्र की बालिका", "भारतीय निवासी"],
    applyUrl: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    category: "Savings",
    states: ["All"],
    estimatedBenefitValue: 15000,
    difficulty: "easy",
    documents: ["Birth Certificate of Girl", "Aadhaar of Parent", "Address Proof"],
    documentsHi: ["बालिका का जन्म प्रमाणपत्र", "अभिभावक का आधार", "पता प्रमाण"],
  },
  {
    id: "mgnrega",
    name: "MGNREGA - 100 Days Work",
    nameHi: "मनरेगा - 100 दिन रोजगार",
    ministry: "Ministry of Rural Development",
    benefit: "Guaranteed 100 days of wage employment per year",
    benefitHi: "प्रति वर्ष 100 दिन की मजदूरी रोजगार की गारंटी",
    eligibility: ["Rural household", "Adult member willing to do manual work"],
    eligibilityHi: ["ग्रामीण परिवार", "शारीरिक श्रम करने को इच्छुक वयस्क सदस्य"],
    applyUrl: "https://nrega.nic.in",
    category: "Employment",
    states: ["All"],
    requiredOccupations: ["Daily Wage", "Unemployed", "Farmer"],
    estimatedBenefitValue: 30000,
    difficulty: "easy",
    deadlineDays: 15,
    documents: ["Aadhaar Card", "Job Card", "Bank Passbook"],
    documentsHi: ["आधार कार्ड", "जॉब कार्ड", "बैंक पासबुक"],
  },
];

export const getMatchConfidence = (
  scheme: Scheme,
  profile: { income?: number; bpl?: boolean; occupation?: string; categories?: string[] }
): number => {
  let score = 50; // base
  if (scheme.requiresBpl && profile.bpl) score += 20;
  if (scheme.requiredOccupations?.includes(profile.occupation || "")) score += 20;
  if (scheme.requiredCategories?.some((c) => profile.categories?.includes(c))) score += 20;
  if (scheme.maxIncome && profile.income && profile.income <= scheme.maxIncome) score += 10;
  if (!scheme.requiresBpl && !scheme.requiredOccupations && !scheme.requiredCategories) score = 70;
  return Math.min(score, 99);
};

export const getWhyYouQualify = (
  scheme: Scheme,
  profile: { income?: number; bpl?: boolean; occupation?: string; categories?: string[] },
  isHi: boolean
): string[] => {
  const reasons: string[] = [];
  if (scheme.requiresBpl && profile.bpl) {
    reasons.push(isHi ? "आप बीपीएल कार्डधारक हैं" : "You hold a BPL card");
  }
  if (scheme.requiredOccupations?.includes(profile.occupation || "")) {
    reasons.push(isHi ? `आपका व्यवसाय: ${profile.occupation}` : `Your occupation: ${profile.occupation}`);
  }
  if (scheme.requiredCategories?.some((c) => profile.categories?.includes(c))) {
    const matched = scheme.requiredCategories!.filter((c) => profile.categories?.includes(c));
    reasons.push(isHi ? `श्रेणी: ${matched.join(", ")}` : `Category: ${matched.join(", ")}`);
  }
  if (scheme.maxIncome && profile.income && profile.income <= scheme.maxIncome) {
    reasons.push(isHi ? `आय पात्रता सीमा के अंदर` : `Income within eligibility limit`);
  }
  return reasons;
};

export const matchSchemes = (profile: {
  income?: number;
  bpl?: boolean;
  occupation?: string;
  categories?: string[];
  state?: string;
}): Scheme[] => {
  return schemes.filter((scheme) => {
    if (scheme.maxIncome && profile.income && profile.income > scheme.maxIncome) return false;
    if (scheme.requiresBpl && !profile.bpl) return false;
    if (scheme.requiredOccupations && profile.occupation && !scheme.requiredOccupations.includes(profile.occupation)) return false;
    if (scheme.requiredCategories && profile.categories) {
      const hasCategory = scheme.requiredCategories.some((c) => profile.categories!.includes(c));
      if (!hasCategory) return false;
    }
    if (scheme.requiredCategories && (!profile.categories || profile.categories.length === 0)) return false;
    return true;
  });
};
