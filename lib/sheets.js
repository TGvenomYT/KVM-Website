"use client";

import Papa from "papaparse";
import {
  Crown,
  Trophy,
  Medal,
  Star,
  Award,
  Users,
  TrendingUp,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  PenLine,
  Globe2,
} from "lucide-react";

const SHEET_ID = "19mpzpDIPuMs9_aG5SXyQkqPAodvu_EEeTal0pGIfBdQ";

const TOPPER_ICONS = { Crown, Trophy, Medal, Star };
const STAT_ICONS = { Award, Users, TrendingUp, BookOpen };
const COURSE_ICONS = { Atom, FlaskConical, Calculator, BookOpen, PenLine, Globe2 };

const memCache = new Map();

export async function fetchTab(tabName) {
  if (memCache.has(tabName)) return memCache.get(tabName);

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch tab "${tabName}": ${res.status}`);
  const text = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        const rows = result.data
          .map((r) => {
            const cleaned = {};
            for (const k of Object.keys(r)) cleaned[k] = (r[k] ?? "").toString().trim();
            return cleaned;
          })
          .filter((r) => Object.values(r).some((v) => v));

        rows.sort((a, b) => (parseInt(a.Order) || 0) - (parseInt(b.Order) || 0));

        memCache.set(tabName, rows);
        resolve(rows);
      },
      error: reject,
    });
  });
}

function getSpan(size, isFeatured) {
  const s = (size || "").toLowerCase().trim();

  if (isFeatured) {
    return "row-span-2 md:row-span-2";
  }

  if (s === "big" || s === "feature") return "row-span-2 md:col-span-2 md:row-span-2";
  if (s === "wide") return "md:col-span-2";
  if (s === "tall") return "md:row-span-2";
  return "";
}

export async function getToppers() {
  const rows = await fetchTab("Toppers");
  return rows.map((r) => {
    const isFeatured = String(r.Featured).toUpperCase() === "TRUE";
    return {
      name: r.Name,
      grade: r.Grade,
      class: r.Class || "Class 10",
      marks: r.Marks,
      subject: r.Subject,
      img: r["Image URL"],
      icon: TOPPER_ICONS[r.Icon] || Trophy,
      featured: isFeatured,
      span: getSpan(r.Size, isFeatured),
    };
  });
}

export async function getFaculty() {
  const rows = await fetchTab("Faculty");
  return rows.map((r) => ({
    name: r.Name,
    role: r.Role,
    qualification: r.Qualification,
    experience: r.Experience,
    img: r["Image URL"],
  }));
}

export async function getCourses() {
  const [courses, courseFaculty, faculty] = await Promise.all([
    fetchTab("Courses"),
    fetchTab("CourseFaculty"),
    fetchTab("Faculty"),
  ]);

  const facultyByName = new Map(faculty.map((f) => [f.Name, f]));

  return courses.map((c) => {
    const staff = courseFaculty
      .filter((cf) => cf.Course === c.Title)
      .map((cf) => {
        const f = facultyByName.get(cf.Faculty);
        return {
          name: cf.Faculty,
          subject: cf.Subject,
          img: f ? f["Image URL"] : "",
          qualification: f ? f.Qualification : "",
        };
      });

    return {
      title: c.Title,
      badge: c.Badge,
      icon: COURSE_ICONS[c.Icon] || BookOpen,
      description: c.Description,
      subjects: (c.Subjects || "").split(",").map((s) => s.trim()).filter(Boolean),
      duration: c.Duration,
      students: c.Students,
      staff,
    };
  });
}

export async function getTestimonials() {
  const rows = await fetchTab("Testimonials");
  return rows.map((r) => ({
    quote: r.Quote,
    author: r.Author,
    relation: r.Relation,
    img: r["Image URL"],
    rating: parseInt(r.Rating) || 5,
  }));
}

export async function getStats() {
  const rows = await fetchTab("Stats");
  return rows.map((r) => ({
    icon: STAT_ICONS[r.Icon] || Award,
    value: parseInt(r.Value) || 0,
    suffix: r.Suffix || "",
    label: r.Label,
    subtitle: r.Subtitle,
  }));
}

export async function getContact() {
  const rows = await fetchTab("Contact");
  const out = {};
  for (const r of rows) {
    const key = (r.Key || "").trim().toLowerCase();
    if (!key) continue;
    out[key] = (r.Value || "").trim();
  }
  return out;
}
