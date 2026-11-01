// PRIVATE content. Only logged-in users ever receive this.
// Edit the text, names and links below to match your department.
import "server-only";
import type { HandbookSection, Level, PeopleGroup } from "@/lib/types";

// ----- Study materials: one Google Drive folder per level -----
export const levels: Level[] = [
  { id: "100", label: "100 Level", driveUrl: "https://drive.google.com/drive/folders/REPLACE_100", blurb: "Lecture notes, PDFs and resources for 100 level courses." },
  { id: "200", label: "200 Level", driveUrl: "https://drive.google.com/drive/folders/REPLACE_200", blurb: "Lecture notes, PDFs and resources for 200 level courses." },
  { id: "300", label: "300 Level", driveUrl: "https://drive.google.com/drive/folders/REPLACE_300", blurb: "Lecture notes, PDFs and resources for 300 level courses." },
  { id: "400", label: "400 Level", driveUrl: "https://drive.google.com/drive/folders/REPLACE_400", blurb: "Lecture notes, PDFs and resources for 400 level courses." },
];

// ----- People page -----
// To add a photo: put the file in public/people and add  photo: "/people/president.jpg"
// Phone numbers are optional. Use the international format with no + or spaces.
export const leader = "Full Name";

export const peopleGroups: PeopleGroup[] = [
  {
    id: "executives",
    label: "Executives",
    blurb: "The leaders running the association this session.",
    members: [
      { name: "Jamiu Muheebulah Ayinde", role: "President", photo: "/people/presido.jpg", },
      
      { name: "Akinbuli Ruth Abisola", role: "Vice President", photo: "/people/exec-vp.jpg", },

      { name: "Adepoju Abdul-Malik Moni", role: "General Secretary", },

      { name: "Adedokun Jamiu Olasunkanmi", role: "Financial Secretary", photo: "/people/exec-finsec.jpg", },

      { name: "Okunola Aminat Adunni", role: "Welfare Director", photo: "/people/exec-welfare.jpg", },

      { name: "Owodunni Quadri Olamildkan", role: "Public Relations Officer", photo: "/people/exec-pro.jpg", },

      { name: "Jamiu Mutmainnah Morenikeji", role: "Social Director", photo: "/people/exec-social.jpg", },
      
      { name: "Bello Abdul-Malik Adebayo", role: "Sports Director", photo: "/people/exec-sport.jpg", } 
     
      
    ],
  },
  {
    id: "src",
    label: "SRC",
    blurb: "Your student representatives on the council.",
    members: [
      { name: "Full Name", role: "SRC Member", photo: "/people/src-fakunle.jpg", },
      { name: "Full Name", role: "SRC Member" },
      { name: "Full Name", role: "SRC Member" },
    ],
  },
  {
    id: "tutors",
    label: "Tutors",
    blurb: "Students who run tutorials and help with hard courses.",
    members: [
      { name: "Full Name", role: "Tutor, 100 Level" },
      { name: "Full Name", role: "Tutor, 200 Level" },
      { name: "Full Name", role: "Tutor, 300 Level" },
    ],
  },
  {
    id: "editorial",
    label: "Editorial Board",
    blurb: "The team behind the association’s publications.",
    members: [
      { name: "Full Name", role: "Editor-in-Chief" },
      { name: "Full Name", role: "Associate Editor" },
      { name: "Full Name", role: "Graphics Editor" },
    ],
  },
  {
    id: "lecturers",
    label: "Lecturers",
    blurb: "Academic staff of the Department of Finance.",
    members: [
      { name: "Prof. Full Name", role: "Head of Department" },
      { name: "Dr. Full Name", role: "Lecturer" },
      { name: "Dr. Full Name", role: "Lecturer" },
      { name: "Mr. Full Name", role: "Assistant Lecturer" },
    ],
  },
];

// ----- Handbook -----
export const handbookPdfUrl = "https://drive.google.com/file/d/REPLACE_HANDBOOK";

export const handbookSections: HandbookSection[] = [
  { title: "Welcome to the Department", items: ["Replace this with the department’s welcome message.", "Add a short history or mission statement here."] },
  { title: "Registration & Course Registration", items: ["Explain when and how students register each session.", "List the documents or approvals needed."] },
  { title: "Attendance & Examinations", items: ["State the minimum attendance required to sit exams.", "Explain exam rules and what happens with misconduct."] },
  { title: "Grading System", items: ["Add the grading table: score ranges and grade points.", "Add the class of degree boundaries."] },
  { title: "Course Structure", items: ["List core and elective courses for each level.", "Note any prerequisites or carry-over rules."] },
  { title: "Code of Conduct", items: ["Describe expected behaviour in class and on campus.", "Explain the disciplinary process."] },
  { title: "Important Contacts", items: ["Add office locations and official contact details."] },
];
