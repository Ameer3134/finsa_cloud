// PRIVATE content. Only logged-in users ever receive this.
// Edit the text, names and links below to match your department.
import "server-only";
import type { HandbookSection, Level, PeopleGroup } from "@/lib/types";

// ----- Study materials: one Google Drive folder per level -----
export const levels: Level[] = [
  { id: "100", label: "100 Level", driveUrl: "https://drive.google.com/drive/folders/154Nwr_irg3fxNoefg0oz1Ze4FOcHcLLp", blurb: "Lecture notes, PDFs and resources for 100 level courses." },
  { id: "200", label: "200 Level", driveUrl: "https://drive.google.com/drive/folders/1DskXNBlNBH6TGlXiNGzFReZZZSnkDp37", blurb: "Lecture notes, PDFs and resources for 200 level courses." },
  { id: "300", label: "300 Level", driveUrl: "https://drive.google.com/drive/folders/1u3szPHgjqFZzpyvaizZ1-nSk2bRxKEpp", blurb: "Lecture notes, PDFs and resources for 300 level courses." },
  { id: "400", label: "400 Level", driveUrl: "https://drive.google.com/drive/folders/1ZqNVqPKsr5lW6QzajHnUgVy3c-6YvmvP", blurb: "Lecture notes, PDFs and resources for 400 level courses." },
];

// ----- People page -----
// To add a photo: put the file in public/people and add  photo: "/people/president.jpg"
// Phone numbers are optional. Use the international format with no + or spaces.
export const leader = "Face Study";

export const peopleGroups: PeopleGroup[] = [
  {
    id: "executives",
    label: "Executives",
    blurb: "The leaders running the association this session.",
    members: [
      { name: "Jamiu Muheebulah Ayinde", role: "President", photo: "/people/presido.jpg", },
      
      { name: "Akinbuli Ruth Abisola", role: "Vice President", photo: "/people/exec-vp.jpg", },

      { name: "Adepoju Abdul-Malik Moni", role: "General Secretary", },

       { name: "Adedoyin Daniel Oluwole", role: "Assistant General Secretary", photo: "/people/exec-asstgen.jpg", },

      { name: "Adedokun Jamiu Olasunkanmi", role: "Financial Secretary", photo: "/people/exec-finsec.jpg", },

      { name: "Okunola Aminat Adunni", role: "Welfare Director", photo: "/people/exec-welfare.jpg", },

      { name: "Owodunni Quadri Olamilekan", role: "Public Relations Officer", photo: "/people/exec-pro.jpg", },

      { name: "Jamiu Mutmainnah Morenikeji", role: "Social Director", photo: "/people/exec-social.jpg", },
      
      { name: "Bello Abdul-Malik Adebayo", role: "Sports Director", photo: "/people/exec-sport.jpg", } 
     
      
    ],
  },
  {
    id: "src",
    label: "SRC",
    blurb: "Student Representatives.",
    members: [

      { name: "Ajayi Elizabeth", role: "Speaker", photo: "/people/src-speaker.jpg", },

      { name: "Oyunkunle David", role: "Clerk", photo: "/people/src-clerk.jpg", },

      { name: "Quadri Ameerah", role: "Student Representative", photo: "/people/src-quadri.jpg", },

      { name: "Ogunleye Abdul-Malik", role: "Student Representative", photo: "/people/src-student.jpg", },

      { name: "Imran Ademola", role: "Student Representative", photo: "/people/src-imran.jpg", },

      { name: "Oguntimileyin Latifat Jadesola", role: "Student Representative", photo: "/people/src-0guntimeyin.jpg", },

      { name: "Balogun Ganiyah Adebisi", role: "Student Representative", photo: "/people/src-balogun.jpg", },

      { name: "Fakunle Ayomide", role: "Student Representative", photo: "/people/src-fakunle.jpg", }








    ],
  },
  {
    id: "tutors",
    label: "Tutors",
    blurb: "Students who run tutorials and help with hard courses.",
    members: [
      { name: "Abdulwahab O. Robiah", role: "Head of Academics, 300 Level", photo: "/people/tutor-robiah.jpg", },
      { name: "Fakunle Ayomide Paul", role: "Tutor, 200 Level", photo: "/people/tutor-fakunle.jpg", },
      { name: "Emmanuel Adedokun", role: "Tutor, 300 Level", photo: "/people/tutor-adedokun.jpg", },

      { name: "Bello Kabirat O.", role: "Tutor, 300 Level", photo: "/people/tutor-bello.jpg", },
      { name: "Alli Aishat", role: "Tutor, 300 Level", photo: "/people/tutor-alli.jpg", },
      { name: "Rofiat Abidemi", role: "Tutor", photo: "/people/tutor-rofiat.jpg", },
      { name: "David Omobolaji Sami", role: "Tutor, 300 Level", photo: "/people/tutor-david.jpg", },
      { name: "Popoola Abduljawad", role: "Tutor", photo: "/people/tutor-popoola.jpg", },
    ]
  },
  {
    id: "editorial",
    label: "Editorial Board",
    blurb: "The team behind the association’s publications.",
    members: [
      { name: "Samad Kazeem", role: "Editor-in-Chief", photo: "/people/ed-samad.jpg", },
      { name: "Jamiu Olasunkanmi Adedokun", role: "Member", photo: "/people/editorial-jamiu.jpg", },
      { name: "Emmanuel Kanyinsola Suzan", role: "Member", photo: "/people/editorial-emmanuel.jpg",  },
      { name: "Owodunni Quadri Olamilekan", role: "Member" },
      { name: "Abdul-Rasak Zainab Omolabake", role: "Member", photo:"people/ed-zainab" },
      { name: "AbdulKareem Abdulgafar", role: "Member" },
      { name: "Abdulsalam Abdulazeem", role: "Member" },
      { name: "Imran Abimbola", role: "Member" },

    ],
  },
  {
    id: "lecturers",
    label: "Lecturers",
    blurb: "Academic staff of the Department of Finance.",
    members: [
      { name: "Dr. Bilqees Ayoola Abdulmumin", role: "Head of Department" },
       { name: "Prof.Muftau Adeniyi Ijaiya ", role: "" },
      { name: "Prof. Ibrahim Bello Abdullahi", role: "" },
      { name: "Prof. Micheal Adebayo Ajayi", role: "" },
      { name: "Prof. Rihanat Idowu Abdulkadir", role: "" },
      { name: "Dr. Oyebola Fatima Etudaiye-Muhtar", role: "" },
      { name: "Dr. Abdulrazaq Taiye Jimoh", role: "" },
      { name: "Dr. kayode David Kolawole", role: "" },
      { name: "Mr. Wasiu Oluwatoyin Ibrahim", role: "" },
      { name: "Mr. Nurudeeen Adeshola Haliru", role: "" },
      { name: "Mr. Nurudeeen Adeshola Haliru", role: "" },


     

    ],
  },
];

// ----- Handbook -----
export const handbookPdfUrl = "https://drive.google.com/file/d/1RFd-HWKmV4YqN2muxpW-15tWNpbAUyDG/view?usp=drivesdk";

export const handbookSections: HandbookSection[] = [
  { title: "Welcome to the Department", items: ["Replace this with the department’s welcome message.", "Add a short history or mission statement here."] },
  { title: "Registration & Course Registration", items: ["Explain when and how students register each session.", "List the documents or approvals needed."] },
  { title: "Attendance & Examinations", items: ["State the minimum attendance required to sit exams.", "Explain exam rules and what happens with misconduct."] },
  { title: "Grading System", items: ["Add the grading table: score ranges and grade points.", "Add the class of degree boundaries."] },
  { title: "Course Structure", items: ["List core and elective courses for each level.", "Note any prerequisites or carry-over rules."] },
  { title: "Code of Conduct", items: ["Describe expected behaviour in class and on campus.", "Explain the disciplinary process."] },
  { title: "Important Contacts", items: ["Add office locations and official contact details."] },
];
