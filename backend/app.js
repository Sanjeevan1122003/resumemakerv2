require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const postgres = require("postgres");
const cors = require("cors")

const PORT = process.env.PORT || 1050;

if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL is not set in .env");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, {
  transform: { undefined: null }
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

/* ---------------------- 🔐 JWT AUTH MIDDLEWARE ---------------------- */
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) return res.status(401).json({ message: "Invalid JWT Token" });

    req.email = payload.email;
    next();
  });
};

/* ----------------------------- SIGNUP ----------------------------- */
app.post("/usersignup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email and password are required." });
    }

    const hashedPassword = await argon2.hash(password);

    // Check existing
    const existingUser = await sql`
      SELECT email FROM users_credentials WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists. Please log in." });
    }

    // Insert new user
    await sql`
      INSERT INTO users_credentials
        (username, email, password, secretdata)
      VALUES
        (${username}, ${email}, ${hashedPassword}, ${password})
    `;

    return res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Signup failed." });
  }
});

/* ----------------------------- LOGIN ------------------------------ */
app.post("/userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required." });
    }

    const userData = await sql`
      SELECT email, password
      FROM users_credentials
      WHERE email = ${email}
      LIMIT 1
    `;

    if (userData.length === 0) {
      return res.status(404).json({ error: "Invalid login." });
    }

    const user = userData[0];

    // verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "90d" });

    return res.status(200).json({
      message: "Login successful",
      token,
      userEmail: `${user.email}`
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed." });
  }
});

/* ------------------------- USER DETAILS -------------------------- */
app.get("/userdetails", authenticate, async (req, res) => {
  try {
    const result = await sql`
      SELECT username, email
      FROM users_credentials
      WHERE email = ${req.email}
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = result[0]

    return res.json({ username: data.username, email: data.email });
  } catch (err) {
    console.error("Fetch user error:", err);
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
});

/* ------------------------- SAVE RESUME DATA ------------------------- */
app.post("/resumedata", authenticate, async (req, res) => {
  try {
    const emailID = req.email;
    const body = req.body ?? {};

    // normalize/validate common fields and arrays to avoid undefined
    const fullname = body.fullname ?? null;
    const phone_number = body.phone_number ?? null;
    const job_role = body.job_role ?? null;
    const formEmail = body.formemail ?? null;
    const linkedin = body.linkedin ?? null;
    const github = body.github ?? null;
    const summary = body.summary ?? null;
    const template_id = body.template_id ?? null;

    const school_name = body.school_name ?? null;
    const school_marks = body.school_marks ?? null;
    const school_year = body.school_year ?? null;
    const school_degree = body.school_degree ?? null;
    const school_qualification = body.school_qualification ?? null;

    const intermediate_name = body.intermediate_name ?? null;
    const intermediate_degree = body.intermediate_degree ?? null;
    const intermediate_course = body.intermediate_course ?? null;
    const intermediate_marks = body.intermediate_marks ?? null;
    const intermediate_year = body.intermediate_year ?? null;

    const college_name = body.college_name ?? null;
    const college_degree = body.college_degree ?? null;
    const college_course = body.college_course ?? null;
    const college_marks = body.college_marks ?? null;
    const college_year = body.college_year ?? null;

    // Arrays: if strings (from form) try parse, else ensure arrays
    const softskills = Array.isArray(body.softskills) ? body.softskills
      : typeof body.softskills === "string" && body.softskills.length ? JSON.parse(body.softskills) : [];
    const technicalskills = Array.isArray(body.technicalskills) ? body.technicalskills
      : typeof body.technicalskills === "string" && body.technicalskills.length ? JSON.parse(body.technicalskills) : [];

    const achievements = Array.isArray(body.achievements) ? body.achievements
      : typeof body.achievements === "string" && body.achievements.length ? JSON.parse(body.achievements) : [];

    const certificates = Array.isArray(body.certificates) ? body.certificates
      : typeof body.certificates === "string" && body.certificates.length ? JSON.parse(body.certificates) : [];

    const experiences = Array.isArray(body.experiences) ? body.experiences
      : typeof body.experiences === "string" && body.experiences.length ? JSON.parse(body.experiences) : [];

    const projects = Array.isArray(body.projects) ? body.projects
      : typeof body.projects === "string" && body.projects.length ? JSON.parse(body.projects) : [];



    // Insert into DB (JSONB columns use sql.json to ensure correct casting)
    await sql`
      INSERT INTO user_details (
        emailid, fullname, phone_number, email, linkedin, github, summary, job_role,
        school_name, school_marks, school_year, school_degree,school_qualification,
        intermediate_name, intermediate_degree, intermediate_course, intermediate_marks, intermediate_year,
        college_name, college_degree, college_course, college_marks, college_year,
        softskills, technicalskills,
        achievements, certificates, experiences, projects, template_id
      ) VALUES (
        ${emailID}, ${fullname}, ${phone_number}, ${formEmail}, ${linkedin}, ${github}, ${summary}, ${job_role},
        ${school_name}, ${school_marks}, ${school_year}, ${school_degree}, ${school_qualification},
        ${intermediate_name}, ${intermediate_degree}, ${intermediate_course}, ${intermediate_marks}, ${intermediate_year},
        ${college_name}, ${college_degree}, ${college_course}, ${college_marks}, ${college_year},
        ${sql.json(softskills)}, ${sql.json(technicalskills)},
        ${sql.json(achievements)}, ${sql.json(certificates)}, ${sql.json(experiences)}, ${sql.json(projects)},${template_id}
      )
    `;

    return res.status(200).json({ message: "Form data saved successfully." });
  } catch (err) {
    console.error("Error saving form data:", err);
    return res.status(500).json({ error: "Error saving form data." });
  }
});

/* ------------------------- GET RESUME DATA ------------------------- */
app.get("/userresumedata", authenticate, async (req, res) => {
  try {
    const data = await sql`
      SELECT * FROM user_details
      WHERE emailid = ${req.email}
      ORDER BY id DESC
      LIMIT 1
    `;

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found." });
    }

    const resumeData = data[0]

    return res.json({ resumeData, message: "Data fetched successfully!" });
  } catch (err) {
    console.error("Fetch resume error:", err);
    return res.status(500).json({ error: "Failed to load resume data" });
  }
});


app.get("/userresumesdetails", authenticate, async (req, res) => {
  try {
    const data = await sql`
  SELECT 
    COUNT(emailid) AS resumes_count,
   COUNT(DISTINCT template_id) AS templates_count,
   TO_CHAR(MAX(created_at), 'DD-MM-YYYY') AS latest_date
  FROM user_details
  WHERE emailid = ${req.email};
`;

    if (data.length === 0) {
      return res.status(404).json({ data });
    }


    return res.status(200).json({ data: data[0] })
  } catch (err) {
    console.error("Fetch resume count:", err);
    return res.status(500).json({ error: "Failed to load resume count" });
  }
})

app.get("/resumesdata", authenticate, async (req, res) => {
  try {
    const data = await sql`
  SELECT
  id,
  summary,
  job_role,
  template_id,
  TO_CHAR(created_at, 'DD-MM-YYYY') AS created_at
FROM user_details
WHERE emailid = ${req.email}
GROUP BY id, summary,job_role, template_id, TO_CHAR(created_at, 'DD-MM-YYYY');

`;

    if (data.length === 0) {
      return res.status(404).json({ message: "No resumes data found" });
    }


    return res.status(200).json({ data: data })
  } catch (err) {
    console.error("Fetch resumes data:", err);
    return res.status(500).json({ error: "Failed to load resumes data" });
  }

})

app.get("/resume", authenticate, async (req, res) => {
  const { name, template, resumeId } = req.query;
  const email = req.email

  try {
    const data = await sql`
      SELECT * FROM user_details
      WHERE emailId = ${req.email}
      AND job_role = ${name}
      AND template_id = ${template}
      AND id = ${resumeId}
    `;

    if (data.length === 0) {
      return res.status(404).json({ message: "No data found.", email, name, template, resumeId });
    }

    return res.json({
      resumeData: data[0],
      message: "Data fetched successfully!",
      name, template, resumeId
    });
  } catch (err) {
    console.error("Fetch resume data:", err);
    return res.status(500).json({ error: "Failed to load resume data" });
  }
});

app.delete("/delresume/:resumeId", authenticate, async (req, res) => {
  const { resumeId } = req.params;
  console.log(">::",resumeId)
  const userEmail = req.email;

  if (!resumeId) {
    return res.status(400).json({ error: "resumeId is required" });
  }

  try {
    const result = await sql`
      DELETE FROM user_details 
      WHERE id = ${resumeId} AND email = ${userEmail}
      RETURNING id;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Resume not found or not authorized" });
    }

    res.status(200).json({ message: "Resume has been deleted successfully!" });
  } catch (err) {
    console.error("Delete resume error:", err);
    return res.status(500).json({ error: "Failed to delete the resume" });
  }
});

/* ----------------------------- START SERVER ----------------------------- */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

