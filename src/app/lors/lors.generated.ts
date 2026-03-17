export type LorPerson = {
  name?: string;
  title?: string;
  company?: string;
  description?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  imageUrl?: string;
};

export type LorItem = {
  slug: string;
  title: string;
  kind: string;
  blurb: string;
  fileUrl: string;
  // Back-compat: older metadata uses 'person'
  person?: LorPerson;
  // Preferred: allow multiple people for a single document
  people?: LorPerson[];
};

export const lors: LorItem[] = [
  {
    "slug": "proof-of-internship-performance-report",
    "title": "Computer vision research internship",
    "kind": "Performance report",
    "blurb": "Ca' Foscari University",
    "fileUrl": "/lors/proof-of-internship-performance-report.pdf",
    "people": [
      {
        "name": "Dr. Prof. Marcello Pelillo",
        "title": "FIEEE, FIAPR, FAAIA",
        "company": "Professor of Computer Science · Ca’ Foscari University of Venice, Italy",
        "description": "IEEE SMC Distinguished Lecturer. Specialty Chief Editor, Computer Vision - Frontiers in Computer Science.",
        "links": [
          {
            "label": "Website",
            "url": "https://www.unive.it/data/people/5592849"
          }
        ]
      },
      {
        "name": "Dr. Prof. Alessandro Torcinovich",
        "title": "",
        "company": "",
        "description": "Assistant professor at the Free University of Bozen-Bolzano - Faculty of Engineering. Academic researcher at ETH Zürich - Institute for Machine Learning.",
        "links": [
          {
            "label": "Website",
            "url": "https://www.aretor.it/"
          }
        ]
      }
    ]
  },
  {
    "slug": "vamsi-performance-report-na-sustainability-team",
    "title": "Rabo North American Sustainability platform project",
    "kind": "Performance report",
    "blurb": "Performance report, recommendation and feedback for:",
    "fileUrl": "/lors/vamsi-performance-report-na-sustainability-team.pdf",
    "people": [
      {
        "name": "Ryan Findlay",
        "title": "Head of Sustainable Food and Agriculture",
        "company": "Rabobank North America",
        "description": "",
        "links": [
          {
            "label": "LinkedIn",
            "url": "https://www.linkedin.com/in/ryanpfindlay/"
          }
        ]
      },
      {
        "name": "Clay Metzger",
        "title": "Senior Sustainaibility Policy and Risk Manager",
        "company": "Rabobank North America",
        "description": "",
        "links": [
          {
            "label": "LinkedIn",
            "url": "https://www.linkedin.com/in/clay-metzger/"
          }
        ]
      }
    ]
  },
  {
    "slug": "vamsi-recommendationletter-annemieke-general",
    "title": "LOR from Talent Manager",
    "kind": "Letter of Recommendation",
    "blurb": "Rabobank",
    "fileUrl": "/lors/vamsi-recommendationletter-annemieke-general.pdf",
    "person": {
      "name": "Annemieke Van Nuland",
      "title": "Senior Talent Manager",
      "company": "Rabobank",
      "description": "",
      "links": [
        {
          "label": "LinkedIn",
          "url": "https://www.linkedin.com/in/avnuland/"
        }
      ]
    }
  },
  {
    "slug": "dr-prof-willem-lor",
    "title": "LOR from Honours Academy of Science supervisor",
    "kind": "Letter of Recommendation",
    "blurb": "Honors Academy of Science at Radboud University",
    "fileUrl": "/lors/dr-prof-willem-lor.pdf",
    "person": {
      "name": "Dr. Prof. Willem Velema",
      "title": "Assistant Professor - Physical Organic Chemistry",
      "company": "Principal Investigator of Velemalab\nRadboud University Nijmegen",
      "description": "",
      "links": [
        {
          "label": "Website",
          "url": "https://www.ru.nl/personen/velema-w"
        }
      ]
    }
  },
  {
    "slug": "lorr-s-s-team",
    "title": "Automated loan prospecting project",
    "kind": "Letter of Recommendation",
    "blurb": "Rabobank Startup and Scaleup (S&S)",
    "fileUrl": "/lors/lorr-s-s-team.pdf",
    "person": {
      "name": "Jos Van Zante",
      "title": "Senior start up and scale up banker",
      "company": "Rabobank",
      "description": "",
      "links": [
        {
          "label": "LinkedIn",
          "url": "https://www.linkedin.com/in/josvanzante/"
        }
      ]
    }
  },
  {
    "slug": "laudatio-vamsi",
    "title": "Thesis laudation by thesis supervisor",
    "kind": "Laudation",
    "blurb": "Data Science group at Radboud University",
    "fileUrl": "/lors/laudatio-vamsi.pdf",
    "person": {
      "name": "Dr.Prof Elena Marchiori",
      "title": "Professor of Machine Learning",
      "company": "Radboud University Nijmegen",
      "description": "Head of the Data Science Group, Institute for Computing and Information Sciences (iCIS).",
      "links": [
        {
          "label": "Website",
          "url": "https://www.cs.ru.nl/~elenam/"
        }
      ]
    }
  }
];
