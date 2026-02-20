import doctorPriya from "@/assets/doctor-priya.jpg";
import doctorAnita from "@/assets/doctor-anita.jpg";
import doctorMeera from "@/assets/doctor-meera.jpg";
import testimonialPriya from "@/assets/testimonial-priya.jpg";
import testimonialAnanya from "@/assets/testimonial-ananya.jpg";
import testimonialDeepa from "@/assets/testimonial-deepa.jpg";
import testimonialKavitha from "@/assets/testimonial-kavitha.jpg";
import testimonialMeera from "@/assets/testimonial-meera.jpg";

export interface DoctorReview {
  name: string;
  area: string;
  rating: number;
  quote: string;
  image: string;
}

export interface Doctor {
  slug: string;
  name: string;
  designation: string;
  experience: string;
  image: string;
  bio: string;
  qualifications: string[];
  specializations: string[];
  surgeries: string[];
  hospitals: string[];
  cities: string[];
  languages: string[];
  consultationFee: string;
  reviews: DoctorReview[];
}

export const doctors: Doctor[] = [
  {
    slug: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    designation: "Senior Fertility Specialist",
    experience: "15+ years",
    image: doctorPriya,
    bio: "Dr. Priya Sharma is one of South India's leading fertility specialists with over 15 years of experience in reproductive medicine. She has helped over 2,000 couples achieve their dream of parenthood through advanced IVF and IUI techniques. Known for her compassionate approach and high success rates, Dr. Sharma combines cutting-edge medical technology with personalized patient care.",
    qualifications: [
      "MBBS – Bangalore Medical College",
      "MD (Obstetrics & Gynaecology) – AIIMS, New Delhi",
      "Fellowship in Reproductive Medicine – Singapore General Hospital",
      "Certified in Advanced Laparoscopic Surgery",
    ],
    specializations: [
      "In-Vitro Fertilization (IVF)",
      "Intrauterine Insemination (IUI)",
      "Egg Freezing & Fertility Preservation",
      "ICSI Treatment",
      "Recurrent Pregnancy Loss Management",
    ],
    surgeries: ["IVF", "IUI", "Egg Freezing", "ICSI", "Fertility Assessment"],
    hospitals: ["Apollo Hospitals", "Manipal Hospital"],
    cities: ["Bangalore"],
    languages: ["English", "Hindi", "Kannada"],
    consultationFee: "₹800",
    reviews: [
      {
        name: "Priya S.",
        area: "Whitefield, Bangalore",
        rating: 4.9,
        quote: "Dr. Sharma made our IVF journey so much easier. Her patience and expertise gave us confidence throughout the process. We are now proud parents thanks to her!",
        image: testimonialPriya,
      },
      {
        name: "Deepa M.",
        area: "HSR Layout, Bangalore",
        rating: 4.8,
        quote: "After two failed IVF attempts elsewhere, Dr. Priya's personalized approach finally worked for us. She truly cares about her patients.",
        image: testimonialDeepa,
      },
      {
        name: "Meera L.",
        area: "Koramangala, Bangalore",
        rating: 5.0,
        quote: "The best fertility specialist in Bangalore. Dr. Sharma explains everything clearly and makes you feel at ease during a very emotional journey.",
        image: testimonialMeera,
      },
    ],
  },
  {
    slug: "dr-anita-reddy",
    name: "Dr. Anita Reddy",
    designation: "Consultant Gynecologist",
    experience: "12+ years",
    image: doctorAnita,
    bio: "Dr. Anita Reddy is a highly skilled gynecologist specializing in minimally invasive surgical procedures. With 12+ years of experience, she has performed over 3,000 successful surgeries including hysterectomies, fibroid removals, and laparoscopic procedures. She is recognized for her precision in surgery and dedication to ensuring the fastest recovery times for her patients.",
    qualifications: [
      "MBBS – Osmania Medical College, Hyderabad",
      "MS (Obstetrics & Gynaecology) – JIPMER, Puducherry",
      "DNB in Gynaecological Endoscopy",
      "Fellowship in Minimally Invasive Surgery – Germany",
    ],
    specializations: [
      "Laparoscopic Hysterectomy",
      "Fibroid Removal (Myomectomy)",
      "Ovarian Cyst Surgery",
      "Endometriosis Treatment",
      "PCOS Management",
    ],
    surgeries: ["Hysterectomy", "Fibroid Surgery", "Laparoscopy", "Ovarian Cyst Removal", "Endometriosis"],
    hospitals: ["Fortis Healthcare", "Manipal Hospital", "Rainbow Hospital"],
    cities: ["Hyderabad", "Bangalore"],
    languages: ["English", "Hindi", "Telugu"],
    consultationFee: "₹700",
    reviews: [
      {
        name: "Ananya R.",
        area: "Kukatpally, Hyderabad",
        rating: 4.7,
        quote: "Dr. Anita performed my hysterectomy laparoscopically. I was back on my feet in just 5 days. Her skill is truly remarkable.",
        image: testimonialAnanya,
      },
      {
        name: "Kavitha J.",
        area: "Gachibowli, Hyderabad",
        rating: 4.8,
        quote: "I was terrified of surgery, but Dr. Reddy explained every step and made me feel safe. The fibroid removal went perfectly.",
        image: testimonialKavitha,
      },
      {
        name: "Deepa M.",
        area: "HSR Layout, Bangalore",
        rating: 4.9,
        quote: "Dr. Anita is extremely thorough. She diagnosed my endometriosis when two other doctors missed it. Grateful for her expertise.",
        image: testimonialDeepa,
      },
    ],
  },
  {
    slug: "dr-meera-krishnan",
    name: "Dr. Meera Krishnan",
    designation: "Obstetrician & Surgeon",
    experience: "18+ years",
    image: doctorMeera,
    bio: "Dr. Meera Krishnan is a senior obstetrician and surgeon with over 18 years of experience in managing high-risk pregnancies and performing complex surgical deliveries. She has delivered over 5,000 babies and is known for her calm demeanor during emergencies. Her expertise in both normal and surgical deliveries makes her one of the most sought-after obstetricians in the region.",
    qualifications: [
      "MBBS – Madras Medical College, Chennai",
      "MD (Obstetrics & Gynaecology) – CMC Vellore",
      "FRCOG (Fellow of the Royal College of Obstetricians, UK)",
      "Advanced Training in High-Risk Obstetrics – Johns Hopkins, USA",
    ],
    specializations: [
      "High-Risk Pregnancy Management",
      "Cesarean Section (C-Section)",
      "Normal Delivery Care",
      "Prenatal Screening & Diagnostics",
      "Postpartum Care & Recovery",
    ],
    surgeries: ["C-Section", "Normal Delivery", "High-Risk Pregnancy", "Prenatal Care"],
    hospitals: ["Narayana Health", "Rainbow Hospital"],
    cities: ["Bangalore", "Hyderabad"],
    languages: ["English", "Hindi", "Tamil", "Kannada"],
    consultationFee: "₹900",
    reviews: [
      {
        name: "Meera L.",
        area: "Koramangala, Bangalore",
        rating: 4.9,
        quote: "Dr. Meera handled my high-risk pregnancy with such care and expertise. My baby and I are healthy thanks to her. She's an angel.",
        image: testimonialMeera,
      },
      {
        name: "Priya S.",
        area: "Whitefield, Bangalore",
        rating: 4.8,
        quote: "I had a very smooth C-section with Dr. Krishnan. She was with me through every step and made the entire experience comfortable.",
        image: testimonialPriya,
      },
      {
        name: "Ananya R.",
        area: "Kukatpally, Hyderabad",
        rating: 5.0,
        quote: "Dr. Meera is the most caring doctor I've ever met. She answered all my questions patiently and ensured a safe delivery.",
        image: testimonialAnanya,
      },
    ],
  },
];

export const getDoctorBySlug = (slug: string) => doctors.find((d) => d.slug === slug);
