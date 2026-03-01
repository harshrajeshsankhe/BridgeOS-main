import { useTranslation } from "react-i18next";
import { Briefcase, Award, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  { title: "Anganwadi Worker", location: "Block Level", type: "Government", salary: "₹8,000/month" },
  { title: "ASHA Health Worker", location: "Village Level", type: "Government", salary: "₹6,000/month" },
  { title: "Gram Rozgar Sahayak", location: "Panchayat Level", type: "Government", salary: "₹7,500/month" },
  { title: "Data Entry Operator", location: "District Office", type: "Contract", salary: "₹12,000/month" },
];

const skills = [
  { name: "Computer Basics", duration: "3 months", free: true },
  { name: "Tailoring & Stitching", duration: "6 months", free: true },
  { name: "Electrician Course", duration: "4 months", free: true },
  { name: "Mobile Repair", duration: "2 months", free: true },
];

const Jobs = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t("jobs_skills")}</h1>

        {/* Jobs */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">District Job Listings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-soft"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-saffron-light text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-card-foreground">{j.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {j.location} · {j.type}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-secondary">{j.salary}</p>
                </div>
                <button className="h-12 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground">
                  {t("apply_now")}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-foreground">Skill Development Programs (PMKVY)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-light text-secondary">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-card-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="mr-1 inline h-3 w-3" /> {s.duration} · {s.free ? "Free" : "Paid"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Job Fairs */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Upcoming Job Fairs</h2>
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-saffron text-primary-foreground">
                <Calendar className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground">Rozgar Mela — March 2026</h3>
                <p className="text-sm text-muted-foreground">District Collectorate, Pune · 500+ vacancies</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Jobs;
