// Global Variables
let currentSubject = '';
let currentTopic = '';
let currentFlashcard = 0;
let isFlipped = false;
let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;
let currentFlashcards = [];
let currentQuizQuestions = [];
let timerInterval = null;
let timePerQuestion = 60;
let cardNotes = {}; // Store notes for each card
let isComprehensiveBoardExam = false; // Track if we're in board exam mode

// Data Structure for all courses
const courseData = {
    pmls401: {
        title: "PMLS 401 - Principles of Medical Laboratory Science",
        topics: {
            topic1: {
                title: "History of Medical Technology",
                flashcards: [
                    { question: "What is the oldest preserved Egyptian medical text?", answer: "The Ebers Papyrus (1500 B.C.)." },
                    { question: "Who traced the beginning of medical technology to the identification of intestinal parasites?", answer: "Vivian Herrick." },
                    { question: "What is the oldest laboratory procedure?", answer: "Urinalysis." },
                    { question: "Who is the Father of Medicine?", answer: "Hippocrates." },
                    { question: "What are the four humors in Hippocratic medicine?", answer: "Blood, Phlegm, Yellow bile, Black bile." },
                    { question: "Who made the first description of hematuria?", answer: "Rufus of Ephesus." },
                    { question: "What was the main diagnostic method during the Middle Ages?", answer: "Uroscopy (visual examination of urine)." },
                    { question: "Who invented the microscope in the 1590s?", answer: "Zaccharias Janssen and his father Hans Janssen." },
                    { question: "Who first observed bacteria and classified them by shape?", answer: "Anton van Leeuwenhoek." },
                    { question: "Who is considered the Father of Microbiology?", answer: "Anton van Leeuwenhoek." },
                    { question: "Who discovered blood transfusion between animals?", answer: "Richard Lower." },
                    { question: "Who developed the first qualitative glucose test for urine?", answer: "Herman von Fehling (1848)." },
                    { question: "Who studied the cholera outbreak in London in 1854?", answer: "John Snow." },
                    { question: "Who developed anthrax vaccine and pasteurization methods?", answer: "Louis Pasteur." },
                    { question: "Who identified the causative agents of anthrax, tuberculosis, and cholera?", answer: "Robert Koch." },
                    { question: "What are Koch's postulates?", answer: "Four principles linking specific microorganisms to specific diseases." },
                    { question: "What was the first hospital laboratory in Britain?", answer: "Guy's Hospital." },
                    { question: "Who established the first pathology lab course in the U.S.?", answer: "Dr. William H. Welch (1878, Bellevue Hospital Medical College)." },
                    { question: "Who opened the first clinical laboratory in John Hopkins Hospital in 1896?", answer: "Dr. William Osler." },
                    { question: "Who wrote Clinical Diagnosis: A Manual of Laboratory Methods (1908)?", answer: "Dr. James C. Todd." },
                    { question: "What was the first school to offer a degree in Medical Technology in the U.S.?", answer: "University of Minnesota (1923)." },
                    { question: "Who established the first MedTech school in the Philippines?", answer: "Dr. Willa Hilgert Hedrick (with Dr. Reuben Manalaysay and others)." },
                    { question: "Who was the first MedTech graduate in the Philippines?", answer: "Jesse Umali (1954, Philippine Union College)." },
                    { question: "What was the first clinical laboratory in the Philippines?", answer: "26th Medical Laboratory of the 6th U.S. Army (1944, Quiricada St., Sta. Cruz, Manila)." },
                    { question: "Who preserved the remains of the first lab after WWII?", answer: "Dr. Pio de Roda and Dr. Mariano Icasiano." }
                ],
                quiz: [
                    {
                        question: "What does the Ebers Papyrus (1500 B.C.) contain?",
                        options: ["Rules of nephrology", "Compilation of medical texts", "DNA discovery", "Vaccination methods"],
                        answer: 1
                    },
                    {
                        question: "The first description of hematuria was made by:",
                        options: ["Louis Pasteur", "Rufus of Ephesus", "Robert Koch", "Anton van Leeuwenhoek"],
                        answer: 1
                    },
                    {
                        question: "Which diagnostic procedure was a fad in the Middle Ages?",
                        options: ["Microscopy", "Uroscopy", "Blood transfusion", "Pasteurization"],
                        answer: 1
                    },
                    {
                        question: "Who is considered the Father of Microbiology?",
                        options: ["Robert Koch", "Louis Pasteur", "Anton van Leeuwenhoek", "John Snow"],
                        answer: 2
                    },
                    {
                        question: "The first hospital laboratory in Britain was established at:",
                        options: ["Guy's Hospital", "Bellevue Hospital", "University of Michigan", "John Hopkins Hospital"],
                        answer: 0
                    },
                    {
                        question: "Who opened the first clinical laboratory in the U.S. in 1896?",
                        options: ["Dr. James Todd", "Dr. William Welch", "Dr. William Osler", "Dr. John Bernard Henry"],
                        answer: 2
                    },
                    {
                        question: "Who was the first MedTech graduate in the Philippines?",
                        options: ["Jesse Umali", "Dr. Hedrick", "Dr. Reuben Manalaysay", "Dr. Pio de Roda"],
                        answer: 0
                    },
                    {
                        question: "The 26th Medical Laboratory in the Philippines was established by:",
                        options: ["Filipino doctors", "6th U.S. Army", "University of Santo Tomas", "Philippine Union College"],
                        answer: 1
                    },
                    {
                        question: "Who preserved the remains of the Quiricada lab after WWII?",
                        options: ["Dr. Hedrick and Dr. Manalaysay", "Dr. Pio de Roda and Dr. Mariano Icasiano", "Dr. Todd and Dr. Welch", "Dr. Osler and Dr. Henry"],
                        answer: 1
                    },
                    {
                        question: "Which university first offered a 4-year BSMT program in the Philippines?",
                        options: ["University of the Philippines", "Philippine Union College", "University of Santo Tomas", "Far Eastern University"],
                        answer: 1
                    }
                ]
            },
            topic2: {
                title: "CMO 13 (CHED PSG for BSMT/MLS)",
                flashcards: [
                    { question: "When was CHED created?", answer: "May 18, 1994, by RA 7722 (Higher Education Act of 1994)." },
                    { question: "What reform divided the education sector into 3 governing bodies?", answer: "Trifocalization of Education." },
                    { question: "Which agency handles tertiary education?", answer: "CHED (Commission on Higher Education)." },
                    { question: "Which agency handles basic education?", answer: "DepEd." },
                    { question: "Which agency handles technical-vocational education?", answer: "TESDA." },
                    { question: "What is OBE in education?", answer: "Outcomes-Based Education." },
                    { question: "What are the three characteristics of OBE?", answer: "Student-centered, Clarity of objectives, Flexibility." },
                    { question: "What is the degree name under CMO 13?", answer: "Bachelor of Science in Medical Technology / Medical Laboratory Science." },
                    { question: "How long is the BSMT/MLS program?", answer: "4 years (general education + professional courses + 1-year internship)." },
                    { question: "What are the goals of the BSMT/MLS program?", answer: "Develop knowledge, skills, attitude, critical thinking, research, leadership, and life-long learning." },
                    { question: "What careers are available for BSMT/MLS graduates?", answer: "Medical Technologists, Molecular Scientists, Researchers, Educators, Public Health Practitioners, Diagnostic Product Specialists." },
                    { question: "What allied fields are related to MedTech?", answer: "Public Health, Epidemiology, Veterinary Science, Forensic Science, Molecular Biology, Nuclear Science." },
                    { question: "How many total units are required in the BSMT/MLS curriculum?", answer: "173 units." },
                    { question: "How many internship hours must students complete?", answer: "1,664 hours (32 hours per week × 52 weeks)." },
                    { question: "What are the subjects in the PRC MedTech Board Exam and their weights?", answer: "Clinical Chemistry – 20%, Microbiology & Parasitology – 20%, Clinical Microscopy – 10%, Hematology – 20%, Blood Banking & Serology – 20%, Histopathology & MT Laws – 10%." },
                    { question: "What is the passing average for the MedTech Board Exam?", answer: "75%, with no subject below 50%." },
                    { question: "How many attempts are allowed before requiring a refresher course?", answer: "3 attempts." }
                ],
                quiz: [
                    {
                        question: "RA 7722, also called the Higher Education Act of 1994, created which agency?",
                        options: ["TESDA", "CHED", "DepEd", "DOH"],
                        answer: 1
                    },
                    {
                        question: "Which education body oversees technical-vocational training?",
                        options: ["CHED", "DepEd", "TESDA", "PRC"],
                        answer: 2
                    },
                    {
                        question: "Outcomes-Based Education is best described as:",
                        options: ["Teacher-centered", "Flexible, student-centered", "Strict curriculum-based", "Traditional education system"],
                        answer: 1
                    },
                    {
                        question: "What is the total number of units in the BSMT/MLS program?",
                        options: ["165", "170", "173", "180"],
                        answer: 2
                    },
                    {
                        question: "The internship program requires how many duty hours in total?",
                        options: ["1,200", "1,500", "1,664", "1,800"],
                        answer: 2
                    },
                    {
                        question: "Which subject has the highest percentage weight in the PRC MedTech Board Exam?",
                        options: ["Clinical Chemistry", "Hematology", "Blood Banking & Serology", "Histopathology"],
                        answer: 1
                    },
                    {
                        question: "To pass the MedTech Board Exam, a student must obtain:",
                        options: ["70% general average", "75% general average", "80% general average", "85% general average"],
                        answer: 1
                    },
                    {
                        question: "How many refresher months are required after failing 3 exam attempts?",
                        options: ["6 months", "9 months", "12 months", "24 months"],
                        answer: 2
                    }
                ]
            },
            topic3: {
                title: "RA 5527 & Practice of Medical Technology",
                flashcards: [
                    { question: "What is RA 5527?", answer: "Philippine Medical Technology Act of 1969." },
                    { question: "When was RA 5527 approved?", answer: "June 21, 1969." },
                    { question: "Who was the President when RA 5527 was signed?", answer: "Ferdinand Marcos." },
                    { question: "How many sections does RA 5527 have?", answer: "32 sections." },
                    { question: "What is the main purpose of RA 5527?", answer: "To regulate the practice of medical technology and require registration of practitioners." },
                    { question: "According to RA 5527, who can practice Medical Technology?", answer: "Only registered medical technologists." },
                    { question: "What are the services considered as practice of MedTech?", answer: "Examination of tissues, fluids, blood banking, microbiology, parasitology, histopathology, cytotechnology, specimen collection, lab QC, reagent preparation." },
                    { question: "Who is the Head of the Laboratory?", answer: "The Pathologist." },
                    { question: "What are the responsibilities of a Pathologist?", answer: "Interprets lab results, counterchecks MedTech work, signs reports." },
                    { question: "Who is the frontliner in laboratory diagnostics?", answer: "Medical Technologist." },
                    { question: "What is the role of a Medical Laboratory Technician?", answer: "Assists a MedTech or Pathologist; obtained 70% in the board exam." },
                    { question: "What is a Phlebotomist?", answer: "A person trained to collect blood samples (venipuncture, arterial puncture, skin puncture)." },
                    { question: "What does a Cytotechnologist do?", answer: "Examines human specimens for cancer cells or abnormalities." },
                    { question: "What does a Histotechnologist do?", answer: "Prepares, processes, and stains tissue specimens for microscopic examination." },
                    { question: "What is a Specialist in MedTech practice?", answer: "A MedTech with advanced training in a specific discipline (e.g., blood banking)." },
                    { question: "What does a Cytogenetic Technologist study?", answer: "Human chromosomes and their genetic content (e.g., for leukemia, tumors, birth defects)." }
                ],
                quiz: [
                    {
                        question: "RA 5527 is also known as:",
                        options: ["Clinical Laboratory Law", "Blood Bank Law", "Philippine Medical Technology Act of 1969", "PRC Modernization Act"],
                        answer: 2
                    },
                    {
                        question: "Who approves laboratory results and signs reports?",
                        options: ["Phlebotomist", "Medical Technologist", "Pathologist", "Cytogeneticist"],
                        answer: 2
                    },
                    {
                        question: "Which practitioner assists a MedTech or Pathologist and scored 70% in the board exam?",
                        options: ["Specialist", "Cytotechnologist", "Laboratory Technician", "Histotechnologist"],
                        answer: 2
                    },
                    {
                        question: "Which of the following is NOT part of the practice of medical technology?",
                        options: ["Histopathologic procedures", "Clinical research with MedTech methods", "Drawing architectural blueprints", "Collection and preservation of specimens"],
                        answer: 2
                    },
                    {
                        question: "A MedTech who has advanced training in one discipline is called a:",
                        options: ["Pathologist", "Specialist", "Cytogeneticist", "Technician"],
                        answer: 1
                    },
                    {
                        question: "Cytotechnologists mainly detect:",
                        options: ["Hormone levels", "Cancer cells", "Blood parasites", "Bacteria"],
                        answer: 1
                    },
                    {
                        question: "Which of the following studies chromosomes and genetic content?",
                        options: ["Cytogenetic Technologist", "Histotechnologist", "Phlebotomist", "Specialist"],
                        answer: 0
                    },
                    {
                        question: "Who are the only professionals legally allowed to practice MedTech in the Philippines?",
                        options: ["Nursing graduates", "Medical Laboratory Technicians", "Registered Medical Technologists", "Biology graduates"],
                        answer: 2
                    }
                ]
            },
            topic4: {
                title: "PASMETH and PAMET Laws",
                flashcards: [
                    { question: "When was PASMETH formed?", answer: "1970." },
                    { question: "Who appointed Dr. Serafin Juliano and Dr. Gustavo Reyes to organize PASMETH?", answer: "Director Narciso Albarracin." },
                    { question: "When was the first PASMETH organizational meeting held?", answer: "June 22, 1970, at UST." },
                    { question: "Who were the first PASMETH officers?", answer: "Pres. Dr. Gustavo Reyes, VP Dr. Serafin Juliano, Sec/Treasurer Dr. Velia Trinidad, PRO Dr. Faustino Sunico." },
                    { question: "When was PASMETH registered with SEC?", answer: "October 6, 1985." },
                    { question: "Who is the current PASMETH President?", answer: "Dr. Bernard Ebuen." },
                    { question: "When was PHISMETS organized?", answer: "2002." },
                    { question: "Who was PASMETH President when PHISMETS was organized?", answer: "Dean Zenaida Cajucom." },
                    { question: "Who is the Father of PAMET?", answer: "Mr. Crisanto Almario." },
                    { question: "When was PAMET organized?", answer: "September 15, 1963, at Manila Public Health Laboratory." },
                    { question: "When was the first PAMET election and convention held?", answer: "September 20, 1964, at Far Eastern University." },
                    { question: "Who was the first PAMET President?", answer: "Charlemagne Tamondong." },
                    { question: "When was PAMET registered with SEC?", answer: "October 14, 1969 (Reg. No. 39570)." },
                    { question: "When did PRC officially recognize PAMET as the only APO for MedTech?", answer: "June 22, 1973 (PD 223)." },
                    { question: "What are PAMET's five core values?", answer: "Integrity, Professionalism, Commitment, Excellence, Unity." },
                    { question: "What does the circle in the PAMET logo symbolize?", answer: "Continuous involvement of practice and education." },
                    { question: "What do the microscope and snake in the logo symbolize?", answer: "The science of Medical Technology." },
                    { question: "What does the color green in the logo represent?", answer: "Health." },
                    { question: "What year is written on the PAMET logo and what does it signify?", answer: "1964 – year of first PAMET election." },
                    { question: "Who is the current PAMET National President?", answer: "Mr. Rommel F. Saceda." },
                    { question: "What is RA 4688?", answer: "Clinical Laboratory Law (1966) – regulates operation/maintenance of clinical labs." },
                    { question: "What is RA 1517?", answer: "Blood Bank Law (1956) – regulates collection, processing, sale of human blood." },
                    { question: "What replaced RA 1517?", answer: "RA 7719 – National Blood Services Act of 1994 (voluntary blood donation)." },
                    { question: "What is RA 8504?", answer: "Philippine AIDS Prevention and Control Act of 1998." },
                    { question: "What is RA 9165?", answer: "Comprehensive Dangerous Drugs Act of 2002." },
                    { question: "What is RA 9288?", answer: "Newborn Screening Act of 2004." },
                    { question: "What is RA 8981?", answer: "PRC Modernization Act of 2000." },
                    { question: "What is RA 7170?", answer: "Organ Donation Act of 1991." }
                ],
                quiz: [
                    {
                        question: "Who is considered the Father of PAMET?",
                        options: ["Charlemagne Tamondong", "Nardito Moraleta", "Crisanto Almario", "Rommel Saceda"],
                        answer: 2
                    },
                    {
                        question: "When was PASMETH first organized?",
                        options: ["1963", "1970", "1985", "2002"],
                        answer: 1
                    },
                    {
                        question: "The first PAMET convention and election was held at:",
                        options: ["UST", "Far Eastern University", "University of the Philippines", "San Pedro College"],
                        answer: 1
                    },
                    {
                        question: "What year was PASMETH officially registered with the SEC?",
                        options: ["1963", "1969", "1970", "1985"],
                        answer: 3
                    },
                    {
                        question: "What do the microscope and snake in the PAMET logo symbolize?",
                        options: ["Integrity", "Unity", "Science of Medical Technology", "Continuous Education"],
                        answer: 2
                    },
                    {
                        question: "Which law regulates the operation and maintenance of clinical laboratories?",
                        options: ["RA 7719", "RA 4688", "RA 5527", "RA 7170"],
                        answer: 1
                    },
                    {
                        question: "Which law focuses on voluntary blood donation and blood safety?",
                        options: ["RA 1517", "RA 7719", "RA 5527", "RA 8981"],
                        answer: 1
                    },
                    {
                        question: "Which law modernized the Professional Regulation Commission (PRC)?",
                        options: ["RA 5527", "RA 8981", "RA 9165", "RA 9288"],
                        answer: 1
                    },
                    {
                        question: "Which law is also known as the Newborn Screening Act?",
                        options: ["RA 7170", "RA 8504", "RA 9288", "RA 4688"],
                        answer: 2
                    },
                    {
                        question: "What year was PAMET officially recognized as the only APO for MedTech?",
                        options: ["1963", "1964", "1969", "1973"],
                        answer: 3
                    }
                ]
            }
        }
    },
    pmls402: {
        title: "ANAPHY LEC - Anatomy & Physiology Lecture",
        topics: {
            topic1: {
                title: "Skin Layers & Epidermis",
                flashcards: [
                    { question: "What are the three main layers of the skin?", answer: "Epidermis, Dermis, Hypodermis (Subcutaneous Layer)" },
                    { question: "What type of tissue is the epidermis?", answer: "Keratinized, stratified squamous epithelium." },
                    { question: "Is the epidermis vascular or avascular?", answer: "Avascular (no blood vessels)." },
                    { question: "What is the most abundant cell type in the epidermis?", answer: "Keratinocytes (90%)." },
                    { question: "What is the function of melanocytes?", answer: "To produce melanin." },
                    { question: "Which epidermal cell is involved in the immune response?", answer: "Langerhans cells (Intraepidermal macrophages)." },
                    { question: "Which cells are responsible for detecting touch sensations?", answer: "Merkel cells (in conjunction with a tactile disc)." },
                    { question: "List the layers of the epidermis from deepest to most superficial.", answer: "Stratum Basale, Stratum Spinosum, Stratum Granulosum, Stratum Lucidum (only in thick skin), Stratum Corneum." },
                    { question: "Which layer is only found in thick skin (palms, soles)?", answer: "Stratum Lucidum." },
                    { question: "What is the function of the stratum corneum?", answer: "Protection from dehydration and microbes; it is periodically shed." }
                ],
                quiz: [
                    {
                        question: "The epidermis is primarily composed of what type of tissue?",
                        options: ["Simple columnar epithelium", "Keratinized, stratified squamous epithelium", "Dense irregular connective tissue", "Loose areolar connective tissue"],
                        answer: 1
                    },
                    {
                        question: "Which of the following cells is responsible for producing the pigment that protects against UV radiation?",
                        options: ["Keratinocyte", "Merkel cell", "Langerhans cell", "Melanocyte"],
                        answer: 3
                    },
                    {
                        question: "Which epidermal layer is characterized by dead, flattened, keratinized cells that are periodically shed?",
                        options: ["Stratum Basale", "Stratum Spinosum", "Stratum Granulosum", "Stratum Corneum"],
                        answer: 3
                    },
                    {
                        question: "The layer of the epidermis where keratin synthesis begins is the:",
                        options: ["Stratum Basale", "Stratum Spinosum", "Stratum Granulosum", "Stratum Lucidum"],
                        answer: 1
                    },
                    {
                        question: "Which of the following statements about the epidermis is TRUE?",
                        options: ["It is highly vascularized to nourish the skin.", "It contains Meissner's corpuscles for deep pressure sensation.", "It is avascular and receives nutrients from the underlying dermis.", "Its primary component is adipose tissue for insulation."],
                        answer: 2
                    }
                ]
            },
            topic2: {
                title: "Dermis & Hypodermis",
                flashcards: [
                    { question: "Is the dermis vascular or avascular?", answer: "Vascularized." },
                    { question: "What are the two layers of the dermis?", answer: "Papillary layer and Reticular layer." },
                    { question: "Which dermal layer is made of loose areolar connective tissue and contains dermal papillae?", answer: "Papillary layer." },
                    { question: "What is the function of dermal papillae?", answer: "They increase the strength of the connection between the epidermis and dermis and form fingerprints." },
                    { question: "Which dermal layer is made of dense irregular connective tissue and contains lamellar corpuscles?", answer: "Reticular layer." },
                    { question: "What is the alternative name for the hypodermis?", answer: "Subcutaneous layer or superficial fascia." },
                    { question: "What is the main function of the adipose tissue in the hypodermis?", answer: "Fat storage, insulation, and cushioning." }
                ],
                quiz: [
                    {
                        question: "Fingerprints are formed due to projections from the dermis called:",
                        options: ["Hair follicles", "Lamellar corpuscles", "Dermal papillae", "Sebaceous glands"],
                        answer: 2
                    },
                    {
                        question: "The deeper layer of the dermis, composed of dense irregular connective tissue, is the:",
                        options: ["Papillary layer", "Reticular layer", "Stratum basale", "Hypodermis"],
                        answer: 1
                    },
                    {
                        question: "The hypodermis is primarily composed of:",
                        options: ["Keratinized cells", "Adipose tissue", "Reticular fibers", "Smooth muscle"],
                        answer: 1
                    },
                    {
                        question: "Which structure is found in the dermis?",
                        options: ["Melanocytes", "Stratum corneum", "Hair follicles, sweat glands, nerves", "All of the above"],
                        answer: 2
                    },
                    {
                        question: "The receptors for deep pressure (lamellar corpuscles) are located in the:",
                        options: ["Papillary layer of the dermis", "Reticular layer of the dermis", "Stratum basale of the epidermis", "Hypodermis"],
                        answer: 1
                    }
                ]
            },
            topic3: {
                title: "Skin Pigmentation & Accessory Structures",
                flashcards: [
                    { question: "What are the three pigments that contribute to skin color?", answer: "Melanin, Carotene, Hemoglobin." },
                    { question: "What organelle within melanocytes carries the pigment melanin?", answer: "Melanosome." },
                    { question: "What are the two forms of melanin?", answer: "Eumelanin (black/brown) and Pheomelanin (red)." },
                    { question: "Why does tanning fade over time?", answer: "Because melanosomes are temporary; they are destroyed by lysosomes and melanin-filled keratinocytes are sloughed off." },
                    { question: "What is the name of the structure from which hair grows?", answer: "Hair follicle." },
                    { question: "The actively dividing cells that produce the hair shaft are located in the:", answer: "Hair bulb / hair matrix." },
                    { question: "What are the three phases of the hair growth cycle?", answer: "Anagen (growth), Catagen (transition), Telogen (rest)." },
                    { question: "What is the function of the sebaceous glands?", answer: "To excrete sebum to lubricate and waterproof the skin and hair. It has antibacterial properties." },
                    { question: "What is the main difference between eccrine and apocrine sweat glands?", answer: "Eccrine: widespread, for thermoregulation, watery sweat. Apocrine: associated with hair follicles in hairy areas, thicker sweat that causes odor when decomposed by bacteria." },
                    { question: "The part of the nail where growth occurs is the:", answer: "Nail root / matrix." }
                ],
                quiz: [
                    {
                        question: "The red-yellow pigment that can be converted to Vitamin A and contributes to skin color is:",
                        options: ["Melanin", "Hemoglobin", "Carotene", "Sebum"],
                        answer: 2
                    },
                    {
                        question: "Gray hair is a result of:",
                        options: ["An increase in pheomelanin", "A decrease in melanin production", "Air bubbles in the hair shaft", "Thickening of the cuticle"],
                        answer: 1
                    },
                    {
                        question: "Which of the following glands produces a secretion that is oily and has antibacterial properties?",
                        options: ["Eccrine gland", "Apocrine gland", "Sebaceous gland", "Ceruminous gland"],
                        answer: 2
                    },
                    {
                        question: "The active growth phase of hair is called:",
                        options: ["Anagen", "Catagen", "Telogen", "Melanogen"],
                        answer: 0
                    },
                    {
                        question: "Which type of sweat gland is responsible for thermoregulation through the production of a hypotonic sweat?",
                        options: ["Sebaceous", "Apocrine", "Eccrine", "Ceruminous"],
                        answer: 2
                    }
                ]
            },
            topic4: {
                title: "Functions & Sensory Reception",
                flashcards: [
                    { question: "How does the skin aid in thermoregulation when the body is too hot?", answer: "By activating sweat glands and dilating blood vessels to allow blood to flush into skin capillary beds (heat radiates out)." },
                    { question: "How does the skin aid in vitamin D synthesis?", answer: "Modified cholesterol molecules in the skin are converted to vitamin D by sunlight (UV radiation)." },
                    { question: "What antimicrobial peptide in sweat helps deter microbes?", answer: "Dermicidin." },
                    { question: "The condition in children caused by a lack of Vitamin D is called:", answer: "Rickets." },
                    { question: "Which sensory receptor is responsible for detecting light touch?", answer: "Meissner's corpuscle." },
                    { question: "Which sensory receptor is responsible for detecting deep pressure and vibration?", answer: "Pacinian (Lamellated) corpuscle." }
                ],
                quiz: [
                    {
                        question: "The skin helps with the excretion of small amounts of waste products like urea and uric acid through:",
                        options: ["Sebum", "Keratin", "Perspiration", "Melanin"],
                        answer: 2
                    },
                    {
                        question: "The synthesis of Vitamin D requires modification of cholesterol molecules by what?",
                        options: ["Sebum", "Keratin", "Sunlight (UV radiation)", "Hemoglobin"],
                        answer: 2
                    },
                    {
                        question: "Which receptor is specialized for detecting vibration and deep pressure?",
                        options: ["Merkel disc", "Meissner's corpuscle", "Hair root plexus", "Pacinian corpuscle"],
                        answer: 3
                    },
                    {
                        question: "When body temperature rises, blood vessels in the dermis do this to promote heat loss:",
                        options: ["Constrict", "Dilate", "Release sebum", "Release melanin"],
                        answer: 1
                    },
                    {
                        question: "The \"acid mantle\" of the skin helps with protection by:",
                        options: ["Producing antibodies", "Creating an acidic environment that inhibits bacteria", "Physically blocking UV radiation", "Waterproofing the epidermis"],
                        answer: 1
                    }
                ]
            },
            topic5: {
                title: "Disorders & Injuries",
                flashcards: [
                    { question: "What is the most common type of skin cancer?", answer: "Basal Cell Carcinoma." },
                    { question: "Which type of skin cancer arises from melanocytes and is the most fatal?", answer: "Melanoma." },
                    { question: "What does the \"ABCDE\" rule stand for in evaluating moles?", answer: "Asymmetry, Border irregularity, Color variation, Diameter (>6mm), Evolving." },
                    { question: "What is a decubitus ulcer more commonly known as?", answer: "A bedsore." },
                    { question: "What is the main cause of a decubitus ulcer?", answer: "Constant, unrelieved pressure on a bony area reducing blood flow, leading to tissue death (necrosis)." },
                    { question: "What is a keloid?", answer: "An overproduction of scar tissue where collagen production doesn't stop after the wound heals." },
                    { question: "A first-degree burn affects which layer of the skin?", answer: "Only the epidermis." }
                ],
                quiz: [
                    {
                        question: "Which skin cancer affects the mitotically active stem cells in the stratum basale and is the most common?",
                        options: ["Squamous Cell Carcinoma", "Melanoma", "Basal Cell Carcinoma", "Kaposi's Sarcoma"],
                        answer: 2
                    },
                    {
                        question: "The 'D' in the ABCDE rule for melanoma stands for:",
                        options: ["Dark", "Diameter greater than 6mm", "Dermal", "Dry"],
                        answer: 1
                    },
                    {
                        question: "A third-degree burn is characterized by:",
                        options: ["Blisters and wet, red skin", "Dry, blanching erythema", "Destruction of the entire epidermis and dermis, appearing white or black", "Painful yellow skin"],
                        answer: 2
                    },
                    {
                        question: "Bedsores (decubitus ulcers) are primarily caused by:",
                        options: ["Fungal infections", "Vitamin D deficiency", "Prolonged, unrelieved pressure", "Chemical exposure"],
                        answer: 2
                    },
                    {
                        question: "Stretch marks occur when:",
                        options: ["The epidermis is scratched", "The dermis is stretched beyond its elastic limits", "Sebaceous glands become blocked", "Melanocytes stop functioning"],
                        answer: 1
                    }
                ]
            }
        }
    },
    pmls403: {
        title: "ANAPHY LEC Integumentary - Integumentary System",
        topics: {
            topic1: {
                title: "Introduction & Major Components",
                flashcards: [
                    { question: "What are the two major components of the integumentary system?", answer: "1. Skin, 2. Accessory Structures (Hair, Nails, Sweat Glands, Sebaceous Glands)" },
                    { question: "What are the three primary layers of the skin?", answer: "Epidermis, Dermis, Hypodermis (Subcutaneous Tissue)" }
                ],
                quiz: [
                    {
                        question: "Which of the following is NOT considered an accessory structure of the integumentary system?",
                        options: ["Hair", "Nails", "Dermis", "Sebaceous Glands"],
                        answer: 2
                    },
                    {
                        question: "The subcutaneous layer is also known as the:",
                        options: ["Epidermis", "Dermis", "Hypodermis", "Stratum Corneum"],
                        answer: 2
                    }
                ]
            },
            topic2: {
                title: "The Epidermis & Its Cells",
                flashcards: [
                    { question: "What type of tissue is the epidermis?", answer: "Keratinized, stratified squamous epithelium." },
                    { question: "What does it mean that the epidermis is \"avascular\"?", answer: "It contains no blood vessels." },
                    { question: "Which cell produces the protein keratin and makes up 90% of epidermal cells?", answer: "Keratinocyte." },
                    { question: "Which cell produces the pigment melanin and transfers it to keratinocytes?", answer: "Melanocyte." },
                    { question: "Which epidermal cell is an immune cell that participates in the defense against microbes?", answer: "Langerhans cell (Intraepidermal macrophage)." },
                    { question: "Which cell, located in the deepest layer, works with a sensory nerve ending to detect touch?", answer: "Merkel cell (Tactile epithelial cell)." }
                ],
                quiz: [
                    {
                        question: "The most abundant cell type in the epidermis is the:",
                        options: ["Melanocyte", "Keratinocyte", "Langerhans cell", "Merkel cell"],
                        answer: 1
                    },
                    {
                        question: "The pigment melanin is produced by which cell?",
                        options: ["Keratinocyte", "Melanocyte", "Langerhans cell", "Merkel cell"],
                        answer: 1
                    },
                    {
                        question: "The function of detecting touch sensations is associated with the:",
                        options: ["Keratinocyte", "Melanocyte", "Langerhans cell", "Merkel cell"],
                        answer: 3
                    },
                    {
                        question: "A key characteristic of the epidermis is that it is:",
                        options: ["Highly vascularized", "Avascular", "Composed of adipose tissue", "The deepest skin layer"],
                        answer: 1
                    }
                ]
            },
            topic3: {
                title: "Layers of the Epidermis",
                flashcards: [
                    { question: "How many layers does thick skin have? Where is it found?", answer: "5 layers; found on palms and soles." },
                    { question: "List the layers of the epidermis from deepest to most superficial.", answer: "Stratum Basale, Stratum Spinosum, Stratum Granulosum, Stratum Lucidum, Stratum Corneum." },
                    { question: "Which layer is only present in thick skin?", answer: "Stratum Lucidum." },
                    { question: "Which is the deepest layer where constant cell division occurs?", answer: "Stratum Basale (Stratum Germinativum)." },
                    { question: "In which layer does keratin synthesis begin?", answer: "Stratum Spinosum." },
                    { question: "Which layer is characterized by granules of keratohyalin?", answer: "Stratum Granulosum." },
                    { question: "Which layer contains the clear protein eleidin?", answer: "Stratum Lucidum." },
                    { question: "Which is the outermost, protective layer of dead, keratinized cells?", answer: "Stratum Corneum." }
                ],
                quiz: [
                    {
                        question: "The layer of the epidermis where cells are actively dividing is the:",
                        options: ["Stratum Corneum", "Stratum Lucidum", "Stratum Basale", "Stratum Granulosum"],
                        answer: 2
                    },
                    {
                        question: "The layer that is only found in thick skin (palms, soles) is the:",
                        options: ["Stratum Spinosum", "Stratum Granulosum", "Stratum Lucidum", "Stratum Corneum"],
                        answer: 2
                    },
                    {
                        question: "The outermost layer of the epidermis, which is shed periodically, is the:",
                        options: ["Stratum Basale", "Stratum Spinosum", "Stratum Granulosum", "Stratum Corneum"],
                        answer: 3
                    },
                    {
                        question: "The translucent appearance of the stratum lucidum is due to the presence of:",
                        options: ["Keratin", "Melanin", "Eleidin", "Collagen"],
                        answer: 2
                    }
                ]
            },
            topic4: {
                title: "The Dermis & Hypodermis",
                flashcards: [
                    { question: "Is the dermis vascular or avascular?", answer: "Vascularized." },
                    { question: "What are the two layers of the dermis?", answer: "Papillary layer and Reticular layer." },
                    { question: "Which dermal layer is made of loose areolar connective tissue and contains touch receptors?", answer: "Papillary layer." },
                    { question: "What are the finger-like projections that strengthen the dermal-epidermal connection and form fingerprints?", answer: "Dermal papillae." },
                    { question: "Which dermal layer is made of dense irregular connective tissue and contains deep pressure receptors?", answer: "Reticular layer." },
                    { question: "What is the main type of tissue in the hypodermis, and what is its function?", answer: "Adipose tissue; functions are fat storage, insulation, and cushioning." }
                ],
                quiz: [
                    {
                        question: "Fingerprints are formed by structures located in which layer?",
                        options: ["Reticular layer of dermis", "Papillary layer of dermis", "Hypodermis", "Stratum Basale"],
                        answer: 1
                    },
                    {
                        question: "The deep pressure receptors (Lamellar corpuscles) are found in the:",
                        options: ["Papillary layer", "Reticular layer", "Hypodermis", "Epidermis"],
                        answer: 1
                    },
                    {
                        question: "The primary function of the adipose tissue in the hypodermis is:",
                        options: ["To produce vitamin D", "To sense vibration", "Fat storage, insulation, and cushioning", "To produce sweat"],
                        answer: 2
                    },
                    {
                        question: "The dermis is characterized by all of the following EXCEPT:",
                        options: ["Being vascularized", "Containing hair follicles", "Being avascular", "Containing sweat glands"],
                        answer: 2
                    }
                ]
            },
            topic5: {
                title: "Skin Pigmentation",
                flashcards: [
                    { question: "What are the three pigments that contribute to skin color?", answer: "Melanin, Carotene, Hemoglobin." },
                    { question: "What is the name of the vesicle that transports melanin within cells?", answer: "Melanosome." },
                    { question: "What are the two forms of melanin?", answer: "Eumelanin (black/brown) and Pheomelanin (red)." },
                    { question: "Why is a tan impermanent?", answer: "Because melanosomes are temporary (destroyed by lysosomes) and melanin-filled keratinocytes are eventually sloughed off." }
                ],
                quiz: [
                    {
                        question: "The yellow-orange pigment that can be converted to vitamin A is:",
                        options: ["Melanin", "Hemoglobin", "Carotene", "Keratin"],
                        answer: 2
                    },
                    {
                        question: "The cellular vesicle that contains and transports melanin is called a:",
                        options: ["Lysosome", "Melanosome", "Keratosome", "Liposome"],
                        answer: 1
                    },
                    {
                        question: "The red form of melanin is known as:",
                        options: ["Eumelanin", "Pheomelanin", "Hemoglobin", "Carotene"],
                        answer: 1
                    },
                    {
                        question: "The pinkish hue of fair skin is primarily due to:",
                        options: ["Melanin", "Carotene", "Hemoglobin in blood vessels", "Keratin"],
                        answer: 2
                    }
                ]
            },
            topic6: {
                title: "Accessory Structures - Hair",
                flashcards: [
                    { question: "What type of cells is hair composed of?", answer: "Dead, keratinized cells." },
                    { question: "What is the part of the hair embedded in the skin called?", answer: "Hair root." },
                    { question: "What is the visible part of the hair called?", answer: "Hair shaft." },
                    { question: "What is the structure at the base of the hair that contains actively dividing cells?", answer: "Hair bulb (and hair matrix)." },
                    { question: "What are the three layers of a hair shaft?", answer: "Medulla (core), Cortex (middle), Cuticle (outer)." },
                    { question: "Which layer of the hair shaft determines its texture (straight or curly)?", answer: "Cortex." },
                    { question: "What are the three phases of the hair growth cycle?", answer: "Anagen (growth), Catagen (transition), Telogen (rest)." }
                ],
                quiz: [
                    {
                        question: "The actively dividing cells that produce the hair are located in the:",
                        options: ["Hair shaft", "Hair cuticle", "Hair bulb matrix", "Hair root plexus"],
                        answer: 2
                    },
                    {
                        question: "The growth phase of the hair cycle is called:",
                        options: ["Telogen", "Catagen", "Anagen", "Melanogen"],
                        answer: 2
                    },
                    {
                        question: "The layer of the hair that is composed of very hard, keratinized cells is the:",
                        options: ["Medulla", "Cortex", "Cuticle", "Root sheath"],
                        answer: 2
                    },
                    {
                        question: "Gray hair results from:",
                        options: ["An increase in air bubbles in the medulla", "A decrease in melanin production", "Thickening of the cuticle", "A longer telogen phase"],
                        answer: 1
                    }
                ]
            },
            topic7: {
                title: "Accessory Structures - Nails, Glands, & Sensory",
                flashcards: [
                    { question: "What is the technical name for the nail cuticle?", answer: "Eponychium." },
                    { question: "What is the thickened layer of stratum corneum under the free edge of the nail called?", answer: "Hyponychium." },
                    { question: "What is the white, crescent-shaped area at the base of the nail called?", answer: "Lunula." },
                    { question: "Which type of sweat gland is widespread and used for thermoregulation?", answer: "Eccrine gland." },
                    { question: "Which type of sweat gland is associated with hair follicles and produces a secretion that causes body odor?", answer: "Apocrine gland." },
                    { question: "What is the oily secretion of sebaceous glands called? What is its function?", answer: "Sebum; it lubricates, waterproofs, and has antibacterial properties." },
                    { question: "Which receptor detects light touch?", answer: "Meissner's corpuscle." },
                    { question: "Which receptor detects deep pressure and vibration?", answer: "Pacinian corpuscle (Lamellated corpuscle)." }
                ],
                quiz: [
                    {
                        question: "The sweat glands that are most important for thermoregulation are the:",
                        options: ["Sebaceous glands", "Apocrine glands", "Eccrine glands", "Ceruminous glands"],
                        answer: 2
                    },
                    {
                        question: "The oily secretion that lubricates the skin and hair is produced by:",
                        options: ["Eccrine glands", "Apocrine glands", "Sebaceous glands", "Mammary glands"],
                        answer: 2
                    },
                    {
                        question: "The sensory receptor for deep pressure and vibration is the:",
                        options: ["Meissner's corpuscle", "Hair root plexus", "Merkel disc", "Pacinian corpuscle"],
                        answer: 3
                    },
                    {
                        question: "The cuticle of the nail is technically known as the:",
                        options: ["Lunula", "Hyponychium", "Eponychium", "Nail root"],
                        answer: 2
                    }
                ]
            },
            topic8: {
                title: "Functions of the Integumentary System",
                flashcards: [
                    { question: "How does the skin protect against mechanical damage?", answer: "Physical barrier with keratin, fat for cushioning, and pressure receptors." },
                    { question: "How does the skin protect against bacterial damage?", answer: "Unbroken surface, acidic \"acid mantle,\" and phagocytes that ingest pathogens." },
                    { question: "How does the skin aid in heat loss?", answer: "By sweating and by dilating blood vessels to allow blood to flush to the surface." },
                    { question: "How does the skin aid in vitamin D synthesis?", answer: "UV light converts modified cholesterol molecules in the skin to vitamin D." },
                    { question: "What is the name of the condition in children caused by vitamin D deficiency?", answer: "Rickets." },
                    { question: "What is the name of the condition in adults caused by vitamin D deficiency?", answer: "Osteomalacia." },
                    { question: "What antimicrobial peptide in sweat helps protect the skin?", answer: "Dermicidin." }
                ],
                quiz: [
                    {
                        question: "The \"acid mantle\" of the skin protects against which type of damage?",
                        options: ["Mechanical", "Bacterial", "UV Radiation", "Desiccation"],
                        answer: 1
                    },
                    {
                        question: "Body temperature is regulated through all of the following EXCEPT:",
                        options: ["Dilation of blood vessels", "Constriction of blood vessels", "Production of sebum", "Activation of sweat glands"],
                        answer: 2
                    },
                    {
                        question: "Vitamin D synthesis requires the modification of cholesterol molecules by:",
                        options: ["Sebum", "Keratin", "Sunlight (UV radiation)", "Melanin"],
                        answer: 2
                    },
                    {
                        question: "The condition characterized by \"bow-leggedness\" in children due to vitamin D deficiency is:",
                        options: ["Osteomalacia", "Rickets", "Osteoporosis", "Scurvy"],
                        answer: 1
                    }
                ]
            },
            topic9: {
                title: "Disorders, Injuries, and Cancer",
                flashcards: [
                    { question: "What is the most common type of skin cancer?", answer: "Basal Cell Carcinoma." },
                    { question: "Which skin cancer arises from melanocytes and is the most dangerous?", answer: "Melanoma." },
                    { question: "What does the \"B\" in the ABCDE rule for melanoma stand for?", answer: "Border irregularity." },
                    { question: "A first-degree burn involves which layer(s) of the skin?", answer: "Only the epidermis." },
                    { question: "What is the main cause of a decubitus ulcer (bedsore)?", answer: "Constant, unrelieved pressure on bony areas, reducing blood flow and causing necrosis." },
                    { question: "What is an overproduction of scar tissue called?", answer: "Keloid." }
                ],
                quiz: [
                    {
                        question: "The ABCDE rule is used to evaluate potential:",
                        options: ["Basal cell carcinomas", "Squamous cell carcinomas", "Melanomas", "Decubitus ulcers"],
                        answer: 2
                    },
                    {
                        question: "A burn that blisters and involves the upper dermis is classified as:",
                        options: ["First-degree", "Superficial partial-thickness (second-degree)", "Deep partial-thickness (second-degree)", "Full-thickness (third-degree)"],
                        answer: 1
                    },
                    {
                        question: "Bedsores are officially known as:",
                        options: ["Keloids", "Striae", "Calluses", "Decubitus ulcers"],
                        answer: 3
                    },
                    {
                        question: "The most common type of skin cancer, which rarely metastasizes, is:",
                        options: ["Squamous cell carcinoma", "Basal cell carcinoma", "Melanoma", "Kaposi's sarcoma"],
                        answer: 1
                    }
                ]
            }
        }
    }
};

// Navigation Functions
function showSubject(subjectId) {
    currentSubject = subjectId;
    currentTopic = ''; // Reset current topic when showing subject
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('subjectMenu').classList.remove('hidden');
    
    const subject = courseData[subjectId];
    document.getElementById('subjectTitle').textContent = subject.title;
    
    const topicGrid = document.getElementById('topicGrid');
    topicGrid.innerHTML = '';
    
    Object.keys(subject.topics).forEach((topicKey, index) => {
        const topic = subject.topics[topicKey];
        const button = document.createElement('button');
        button.className = 'topic-btn';
        button.onclick = () => selectTopic(topicKey);
        button.innerHTML = `
            📖 Topic ${index + 1}<br>
            <small>${topic.title}</small>
        `;
        topicGrid.appendChild(button);
    });
}

function selectTopic(topicId) {
    currentTopic = topicId;
    document.getElementById('subjectMenu').classList.add('hidden');
    document.getElementById('modeSelector').classList.remove('hidden');
    
    const subject = courseData[currentSubject];
    const topic = subject.topics[currentTopic];
    
    document.getElementById('selectedCourse').textContent = `Course: ${subject.title}`;
    document.getElementById('selectedTopic').textContent = `Topic: ${topic.title}`;
}

function goToMainMenu() {
    document.querySelectorAll('.menu, .game-mode').forEach(el => el.classList.add('hidden'));
    document.getElementById('mainMenu').classList.remove('hidden');
    resetGameStates();
}

function goToSubjectMenu() {
    document.querySelectorAll('.menu, .game-mode').forEach(el => el.classList.add('hidden'));
    document.getElementById('subjectMenu').classList.remove('hidden');
    resetGameStates();
}

function goToModeSelector() {
    document.querySelectorAll('.menu, .game-mode').forEach(el => el.classList.add('hidden'));
    
    // Check if we're coming from a comprehensive board exam
    if (isComprehensiveBoardExam) {
        document.getElementById('mainMenu').classList.remove('hidden');
        isComprehensiveBoardExam = false; // Reset the flag
    } else {
        // Check if we came from subject practice exam by looking at the topic text
        const topicText = document.getElementById('quizTopic').textContent;
        if (topicText === 'Subject Practice Exam') {
            document.getElementById('subjectMenu').classList.remove('hidden');
        } else {
            document.getElementById('modeSelector').classList.remove('hidden');
        }
    }
    
    resetGameStates();
}

// Clear any running timers and reset board exam state
function resetGameStates() {
    currentFlashcard = 0;
    isFlipped = false;
    currentQuiz = 0;
    quizScore = 0;
    quizAnswered = false;
    currentFlashcards = [];
    currentQuizQuestions = [];
    
    // Clear any running timers
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Remove board exam timer if it exists
    const boardTimer = document.getElementById('boardExamTimer');
    if (boardTimer) {
        boardTimer.remove();
    }
    
    // Reset board exam flag
    isComprehensiveBoardExam = false;
}

// Flashcard Functions
function startFlashcards() {
    document.getElementById('modeSelector').classList.add('hidden');
    document.getElementById('flashcardMode').classList.remove('hidden');
    
    const subject = courseData[currentSubject];
    const topic = subject.topics[currentTopic];
    
    document.getElementById('flashcardCourse').textContent = subject.title;
    document.getElementById('flashcardTopic').textContent = topic.title;
    
    currentFlashcards = [...topic.flashcards];
    currentFlashcard = 0;
    isFlipped = false;
    
    loadFlashcard();
}

function loadFlashcard() {
    if (currentFlashcards.length === 0) return;
    
    const card = currentFlashcards[currentFlashcard];
    const flashcardElement = document.querySelector('.card-content');
    
    flashcardElement.textContent = card.question;
    isFlipped = false;
    
    updateCardCounter();
    updateProgressBar();
    updateCardButtons();
}

function flipCard() {
    if (currentFlashcards.length === 0) return;
    
    const card = currentFlashcards[currentFlashcard];
    const flashcardElement = document.querySelector('.card-content');
    
    if (!isFlipped) {
        flashcardElement.textContent = card.answer;
        isFlipped = true;
    } else {
        flashcardElement.textContent = card.question;
        isFlipped = false;
    }
}

function nextCard() {
    if (currentFlashcard < currentFlashcards.length - 1) {
        currentFlashcard++;
        loadFlashcard();
    }
}

function previousCard() {
    if (currentFlashcard > 0) {
        currentFlashcard--;
        loadFlashcard();
    }
}

function shuffleCards() {
    for (let i = currentFlashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentFlashcards[i], currentFlashcards[j]] = [currentFlashcards[j], currentFlashcards[i]];
    }
    currentFlashcard = 0;
    loadFlashcard();
}

function updateCardCounter() {
    document.getElementById('cardCounter').textContent = 
        `Card ${currentFlashcard + 1} of ${currentFlashcards.length}`;
}

function updateProgressBar() {
    const progress = ((currentFlashcard + 1) / currentFlashcards.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function updateCardButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentFlashcard === 0;
    if (nextBtn) nextBtn.disabled = currentFlashcard === currentFlashcards.length - 1;
}

// Quiz Functions
function startQuiz() {
    document.getElementById('modeSelector').classList.add('hidden');
    document.getElementById('quizMode').classList.remove('hidden');
    
    const subject = courseData[currentSubject];
    const topic = subject.topics[currentTopic];
    
    document.getElementById('quizCourse').textContent = subject.title;
    document.getElementById('quizTopic').textContent = topic.title;
    
    currentQuizQuestions = [...topic.quiz];
    
    // Shuffle the quiz questions every time
    shuffleQuizQuestions();
    
    currentQuiz = 0;
    quizScore = 0;
    
    document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
    
    loadQuestion();
}

// Function to shuffle quiz questions
function shuffleQuizQuestions() {
    for (let i = currentQuizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentQuizQuestions[i], currentQuizQuestions[j]] = [currentQuizQuestions[j], currentQuizQuestions[i]];
    }
}

function loadQuestion() {
    if (currentQuizQuestions.length === 0) return;
    
    const question = currentQuizQuestions[currentQuiz];
    document.getElementById('quizQuestion').innerHTML = `<h3>${question.question}</h3>`;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.onclick = () => selectAnswer(index);
        
        // Reset button styles
        button.style.background = '';
        button.style.borderColor = '';
        button.style.pointerEvents = 'auto';
        button.classList.remove('correct', 'incorrect');
        
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('quizResult').innerHTML = '';
    document.getElementById('nextQuizBtn').classList.add('hidden');
    document.getElementById('restartBtn').classList.add('hidden');
    quizAnswered = false;
    
    updateQuestionCounter();
    updateQuizScore();
}

function selectAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    const question = currentQuizQuestions[currentQuiz];
    const buttons = document.getElementById('quizOptions').children;
    
    quizAnswered = true;
    
    // Check if this is a board exam
    if (isComprehensiveBoardExam) {
        // For board exam: just mark the answer and move on (no immediate feedback)
        if (selectedIndex === question.answer) {
            quizScore++;
        }
        
        // Highlight selected answer only
        buttons[selectedIndex].style.background = '#ffc3d4';
        buttons[selectedIndex].style.borderColor = '#ff6b9d';
        
        // Disable all buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.pointerEvents = 'none';
        }
        
        // Show neutral result message
        const resultDiv = document.getElementById('quizResult');
        resultDiv.innerHTML = '<h3>📝 Answer recorded</h3>';
        
        // Auto-advance after 1 second
        setTimeout(() => {
            if (currentQuiz < currentQuizQuestions.length - 1) {
                currentQuiz++;
                loadQuestion();
            } else {
                showFinalResults();
            }
        }, 1000);
    } else {
        // For regular quizzes: show immediate feedback
        // Color the buttons
        for (let i = 0; i < buttons.length; i++) {
            if (i === question.answer) {
                buttons[i].classList.add('correct');
            } else if (i === selectedIndex && selectedIndex !== question.answer) {
                buttons[i].classList.add('incorrect');
            }
            buttons[i].style.pointerEvents = 'none';
        }
        
        // Show result
        const resultDiv = document.getElementById('quizResult');
        if (selectedIndex === question.answer) {
            resultDiv.innerHTML = '<h3>✅ Correct! Great job! 🎉</h3>';
            quizScore++;
        } else {
            const correctAnswer = question.options[question.answer];
            resultDiv.innerHTML = `<h3>❌ Incorrect!</h3><p>The correct answer is: <strong>${correctAnswer}</strong></p>`;
        }
        
        // Show appropriate button
        if (currentQuiz < currentQuizQuestions.length - 1) {
            document.getElementById('nextQuizBtn').classList.remove('hidden');
        } else {
            showFinalResults();
        }
    }
    
    updateQuizScore();
}

function nextQuestion() {
    currentQuiz++;
    loadQuestion();
}

function restartQuiz() {
    currentQuiz = 0;
    quizScore = 0;
    document.getElementById('resultsMode').classList.add('hidden');
    document.getElementById('quizMode').classList.remove('hidden');
    loadQuestion();
}

function updateQuestionCounter() {
    document.getElementById('questionCounter').textContent = currentQuiz + 1;
}

function updateQuizScore() {
    document.getElementById('scoreDisplay').textContent = `${quizScore}/${currentQuiz + 1}`;
}

function showFinalResults() {
    document.getElementById('quizMode').classList.add('hidden');
    document.getElementById('resultsMode').classList.remove('hidden');
    
    const percentage = Math.round((quizScore / currentQuizQuestions.length) * 100);
    document.getElementById('finalScore').textContent = `${quizScore}/${currentQuizQuestions.length} (${percentage}%)`;
    
    let performance, encouragement;
    
    if (isComprehensiveBoardExam) {
        // Special messages for board exam
        if (percentage >= 75) {
            performance = "🎓 PASSED - Board Ready!";
            encouragement = "Excellent! You're ready for the board exam! This score meets the passing requirement! 🌟";
        } else if (percentage >= 70) {
            performance = "📚 Almost There!";
            encouragement = "You're very close! A little more study and you'll ace the board exam! 💪";
        } else if (percentage >= 60) {
            performance = "📖 More Study Needed";
            encouragement = "Focus on your weak areas. You have the foundation, keep practicing! 🎯";
        } else {
            performance = "🔄 Intensive Review Required";
            encouragement = "Don't give up! Use flashcards and practice more. You can do this! 💗";
        }
    } else {
        // Regular quiz messages
        if (percentage >= 90) {
            performance = "🏆 Excellent!";
            encouragement = "Outstanding work! You've mastered this topic! 🌟";
        } else if (percentage >= 80) {
            performance = "🎉 Great Job!";
            encouragement = "You're doing really well! Keep up the good work! 💪";
        } else if (percentage >= 70) {
            performance = "👍 Good Work!";
            encouragement = "Nice effort! Review a bit more and you'll ace it! 📚";
        } else if (percentage >= 60) {
            performance = "📖 Keep Studying!";
            encouragement = "You're on the right track! A little more practice will help! 💗";
        } else {
            performance = "🔄 Try Again!";
            encouragement = "Don't give up! Review the flashcards and try again! You got this! 💪";
        }
    }
    
    document.getElementById('performance').textContent = performance;
    document.getElementById('encouragement').textContent = encouragement;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Make sure we start at the main menu
    document.querySelectorAll('.menu, .game-mode').forEach(el => el.classList.add('hidden'));
    document.getElementById('mainMenu').classList.remove('hidden');
    
    // Load saved notes
    loadNotes();
    
    // Load dark mode preference
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').textContent = '☀️ Light Mode';
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    const root = document.documentElement;
    const body = document.body;
    const toggle = document.getElementById('themeToggle');
    
    root.classList.toggle('dark-mode');
    body.classList.toggle('dark-mode');
    
    if (root.classList.contains('dark-mode')) {
        toggle.textContent = '☀️ Light Mode';
        localStorage.setItem('darkMode', 'true');
    } else {
        toggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('darkMode', 'false');
    }
}

// Notes functionality
function toggleNotes() {
    const notesTextarea = document.getElementById('cardNotes');
    const toggle = document.querySelector('.notes-toggle');
    
    if (notesTextarea.classList.contains('hidden')) {
        notesTextarea.classList.remove('hidden');
        toggle.textContent = '✖️ Hide';
        loadCardNote();
    } else {
        saveCardNote();
        notesTextarea.classList.add('hidden');
        toggle.textContent = '📝 Notes';
    }
}

function loadCardNote() {
    const cardKey = `${currentSubject}_${currentTopic}_${currentFlashcard}`;
    const savedNote = cardNotes[cardKey] || '';
    document.getElementById('cardNotes').value = savedNote;
}

function saveCardNote() {
    const cardKey = `${currentSubject}_${currentTopic}_${currentFlashcard}`;
    const noteText = document.getElementById('cardNotes').value;
    cardNotes[cardKey] = noteText;
    localStorage.setItem('cardNotes', JSON.stringify(cardNotes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem('cardNotes');
    if (savedNotes) {
        cardNotes = JSON.parse(savedNotes);
    }
}

// Mixed Quiz Functions
function showMixedQuizSelector() {
    document.getElementById('modeSelector').classList.add('hidden');
    document.getElementById('mixedQuizSelector').classList.remove('hidden');
    
    const subject = courseData[currentSubject];
    const topicList = document.getElementById('mixedTopicList');
    topicList.innerHTML = '';
    
    Object.keys(subject.topics).forEach((topicKey, index) => {
        const topic = subject.topics[topicKey];
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="topic_${topicKey}" value="${topicKey}">
            <label for="topic_${topicKey}">Topic ${index + 1}: ${topic.title}</label>
        `;
        topicList.appendChild(checkboxItem);
    });
}

// Subject Mixed Quiz Functions
function showSubjectMixedQuizSelector() {
    document.getElementById('subjectMenu').classList.add('hidden');
    document.getElementById('mixedQuizSelector').classList.remove('hidden');
    
    const subject = courseData[currentSubject];
    const topicList = document.getElementById('mixedTopicList');
    topicList.innerHTML = '';
    
    Object.keys(subject.topics).forEach((topicKey, index) => {
        const topic = subject.topics[topicKey];
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';
        checkboxItem.innerHTML = `
            <input type="checkbox" id="topic_${topicKey}" value="${topicKey}" checked>
            <label for="topic_${topicKey}">Topic ${index + 1}: ${topic.title}</label>
        `;
        topicList.appendChild(checkboxItem);
    });
}

function startMixedQuiz() {
    const selectedTopics = [];
    const checkboxes = document.querySelectorAll('#mixedTopicList input[type="checkbox"]:checked');
    const questionCount = parseInt(document.getElementById('mixedQuestionCount').value);
    
    if (checkboxes.length === 0) {
        alert('Please select at least one topic!');
        return;
    }
    
    checkboxes.forEach(cb => selectedTopics.push(cb.value));
    
    // Collect questions from selected topics
    let allQuestions = [];
    const subject = courseData[currentSubject];
    
    selectedTopics.forEach(topicKey => {
        const topic = subject.topics[topicKey];
        topic.quiz.forEach(question => {
            allQuestions.push({ ...question, topicTitle: topic.title });
        });
    });
    
    // Shuffle and limit questions
    shuffleArray(allQuestions);
    currentQuizQuestions = allQuestions.slice(0, Math.min(questionCount, allQuestions.length));
    
    // Start mixed quiz
    document.getElementById('mixedQuizSelector').classList.add('hidden');
    document.getElementById('quizMode').classList.remove('hidden');
    
    document.getElementById('quizCourse').textContent = subject.title;
    document.getElementById('quizTopic').textContent = 'Mixed Topics Quiz';
    
    currentQuiz = 0;
    quizScore = 0;
    document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
    
    loadQuestion();
}

// Smart back button for mixed quiz selector
function goBackFromMixedQuiz() {
    document.getElementById('mixedQuizSelector').classList.add('hidden');
    
    // Check if we came from subject menu or mode selector
    // We'll use a simple check - if currentTopic is empty/undefined, we came from subject menu
    if (!currentTopic || currentTopic === '') {
        document.getElementById('subjectMenu').classList.remove('hidden');
    } else {
        document.getElementById('modeSelector').classList.remove('hidden');
    }
}

// Timed Challenge Functions
function showTimedChallengeSelector() {
    document.getElementById('modeSelector').classList.add('hidden');
    document.getElementById('timedChallengeSelector').classList.remove('hidden');
}

function startTimedChallenge(timeLimit) {
    timePerQuestion = timeLimit;
    
    const subject = courseData[currentSubject];
    const topic = subject.topics[currentTopic];
    
    currentQuizQuestions = [...topic.quiz];
    shuffleQuizQuestions();
    
    document.getElementById('timedChallengeSelector').classList.add('hidden');
    document.getElementById('timedQuizMode').classList.remove('hidden');
    
    currentQuiz = 0;
    quizScore = 0;
    
    document.getElementById('timedTotalQuestions').textContent = currentQuizQuestions.length;
    
    loadTimedQuestion();
}

function loadTimedQuestion() {
    if (currentQuizQuestions.length === 0 || currentQuiz >= currentQuizQuestions.length) {
        showTimedResults();
        return;
    }
    
    const question = currentQuizQuestions[currentQuiz];
    document.getElementById('timedQuizQuestion').innerHTML = `<h3>${question.question}</h3>`;
    
    const optionsContainer = document.getElementById('timedQuizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        button.onclick = () => selectTimedAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('timedQuizResult').innerHTML = '';
    quizAnswered = false;
    
    updateTimedCounters();
    startTimer();
}

function selectTimedAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    clearInterval(timerInterval);
    const question = currentQuizQuestions[currentQuiz];
    const buttons = document.getElementById('timedQuizOptions').children;
    
    quizAnswered = true;
    
    // Color the buttons
    for (let i = 0; i < buttons.length; i++) {
        if (i === question.answer) {
            buttons[i].classList.add('correct');
        } else if (i === selectedIndex && selectedIndex !== question.answer) {
            buttons[i].classList.add('incorrect');
        }
        buttons[i].style.pointerEvents = 'none';
    }
    
    if (selectedIndex === question.answer) {
        quizScore++;
        document.getElementById('timedQuizResult').innerHTML = '<h3>✅ Correct! 🎉</h3>';
    } else {
        const correctAnswer = question.options[question.answer];
        document.getElementById('timedQuizResult').innerHTML = `<h3>❌ ${selectedIndex === -1 ? 'Time\'s up!' : 'Incorrect!'}</h3><p>Correct: <strong>${correctAnswer}</strong></p>`;
    }
    
    updateTimedCounters();
    
    // Auto advance after 2 seconds
    setTimeout(() => {
        currentQuiz++;
        loadTimedQuestion();
    }, 2000);
}

function startTimer() {
    let timeLeft = timePerQuestion;
    const timerElement = document.getElementById('timeRemaining');
    
    // Reset timer display classes
    timerElement.classList.remove('warning');
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            timerElement.classList.remove('warning');
            selectTimedAnswer(-1); // Time's up
            return;
        }
        
        timeLeft--;
    }, 1000);
}

function updateTimedCounters() {
    document.getElementById('timedQuestionCounter').textContent = currentQuiz + 1;
    document.getElementById('timedScoreDisplay').textContent = `${quizScore}/${currentQuiz + 1}`;
}

function showTimedResults() {
    clearInterval(timerInterval);
    document.getElementById('timedQuizMode').classList.add('hidden');
    document.getElementById('resultsMode').classList.remove('hidden');
    
    const percentage = Math.round((quizScore / currentQuizQuestions.length) * 100);
    document.getElementById('finalScore').textContent = `${quizScore}/${currentQuizQuestions.length} (${percentage}%)`;
    
    let performance, encouragement;
    if (percentage >= 90) {
        performance = "🏆 Lightning Fast!";
        encouragement = "Amazing speed and accuracy! You're a quiz master! ⚡";
    } else if (percentage >= 80) {
        performance = "🔥 Speedy Gonzales!";
        encouragement = "Great job under pressure! Keep up the momentum! 🚀";
    } else if (percentage >= 70) {
        performance = "⏱️ Good Pace!";
        encouragement = "Nice work! Practice more to improve your speed! 💪";
    } else {
        performance = "🐌 Need More Speed!";
        encouragement = "Don't worry! Speed comes with practice. Try again! 🎯";
    }
    
    document.getElementById('performance').textContent = performance;
    document.getElementById('encouragement').textContent = encouragement;
}

// Practice Exam Functions
function showPracticeExamSelector() {
    document.getElementById('modeSelector').classList.add('hidden');
    document.getElementById('practiceExamSelector').classList.remove('hidden');
}

function startPracticeExam(type) {
    let allQuestions = [];
    
    if (type === 'subject') {
        // Get all questions from current subject
        const subject = courseData[currentSubject];
        Object.keys(subject.topics).forEach(topicKey => {
            const topic = subject.topics[topicKey];
            topic.quiz.forEach(question => {
                allQuestions.push({ ...question, topicTitle: topic.title });
            });
        });
        shuffleArray(allQuestions);
        currentQuizQuestions = allQuestions.slice(0, 50);
        
        document.getElementById('practiceExamSelector').classList.add('hidden');
        document.getElementById('quizMode').classList.remove('hidden');
        
        document.getElementById('quizCourse').textContent = courseData[currentSubject].title;
        document.getElementById('quizTopic').textContent = 'Subject Practice Exam';
        
        currentQuiz = 0;
        quizScore = 0;
        document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
        
        loadQuestion();
    }
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Subject Practice Exam from Subject Menu
function startSubjectPracticeExam() {
    let allQuestions = [];
    
    // Get all questions from current subject
    const subject = courseData[currentSubject];
    Object.keys(subject.topics).forEach(topicKey => {
        const topic = subject.topics[topicKey];
        topic.quiz.forEach(question => {
            allQuestions.push({ ...question, topicTitle: topic.title });
        });
    });
    
    // Shuffle and limit to 50 questions
    shuffleArray(allQuestions);
    currentQuizQuestions = allQuestions.slice(0, 50);
    
    // Hide subject menu and show quiz mode
    document.getElementById('subjectMenu').classList.add('hidden');
    document.getElementById('quizMode').classList.remove('hidden');
    
    // Set up quiz display
    document.getElementById('quizCourse').textContent = subject.title;
    document.getElementById('quizTopic').textContent = 'Subject Practice Exam';
    
    currentQuiz = 0;
    quizScore = 0;
    document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
    
    loadQuestion();
}

// Comprehensive Board Exam from Homepage
function showBoardExamBriefing() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('boardExamBriefing').classList.remove('hidden');
}

function startComprehensiveBoardExam() {
    isComprehensiveBoardExam = true; // Set flag to indicate board exam mode
    let allQuestions = [];
    
    // Get questions from all subjects and topics
    Object.keys(courseData).forEach(subjectKey => {
        const subject = courseData[subjectKey];
        Object.keys(subject.topics).forEach(topicKey => {
            const topic = subject.topics[topicKey];
            topic.quiz.forEach(question => {
                allQuestions.push({ 
                    ...question, 
                    topicTitle: topic.title, 
                    subjectTitle: subject.title 
                });
            });
        });
    });
    
    // Shuffle and limit to 100 questions
    shuffleArray(allQuestions);
    currentQuizQuestions = allQuestions.slice(0, 100);
    
    // Hide briefing and show quiz mode
    document.getElementById('boardExamBriefing').classList.add('hidden');
    document.getElementById('quizMode').classList.remove('hidden');
    
    // Set up quiz display
    document.getElementById('quizCourse').textContent = 'All Subjects';
    document.getElementById('quizTopic').textContent = 'Comprehensive Board Exam (1 Hour)';
    
    currentQuiz = 0;
    quizScore = 0;
    document.getElementById('totalQuestions').textContent = currentQuizQuestions.length;
    
    // Start 1-hour timer for board exam
    startBoardExamTimer();
    
    loadQuestion();
}

// Board Exam Timer (1 hour = 3600 seconds)
function startBoardExamTimer() {
    let timeLeft = 3600; // 1 hour in seconds
    const breadcrumbElement = document.querySelector('#quizMode .breadcrumb');
    
    // Create timer display for board exam
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'boardExamTimer';
    timerDisplay.className = 'board-exam-timer';
    timerDisplay.innerHTML = `
        <div class="timer-text">⏰ Time Remaining: <span id="boardTimeRemaining">01:00:00</span></div>
    `;
    breadcrumbElement.after(timerDisplay);
    
    const timerElement = document.getElementById('boardTimeRemaining');
    
    timerInterval = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning when less than 10 minutes
        if (timeLeft <= 600) {
            timerElement.classList.add('warning');
            timerElement.parentElement.classList.add('warning');
        }
        
        // Auto-submit when time is up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '00:00:00';
            alert('⏰ Time\'s up! Your exam will be submitted automatically.');
            showFinalResults();
            return;
        }
        
        timeLeft--;
    }, 1000);
}