<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  

</head>
<body>

  <h1>📊 Excel Analytics Platform</h1>
  <p>
    A full-stack MERN-based web application that allows users to upload Excel/CSV files,
    generate insightful charts, analyze data using AI, and manage upload history — with role-based access for Admins and Users.
  </p>

  <h2>🚀 Features</h2>

  <h3>✅ User Side</h3>
  <ul>
    <li>🔐 <strong>Authentication</strong>: JWT-based Login & Signup (User/Admin roles)</li>
    <li>📤 <strong>Upload Excel/CSV Files</strong> (<code>.xlsx</code>, <code>.xls</code>, <code>.csv</code>)</li>
    <li>📊 <strong>Chart Builder</strong>:
      <ul>
        <li>Dynamic selection of chart type (Bar, Line, Pie, Radar)</li>
        <li>Dynamic axis selection (X-axis and Y-axis dropdown)</li>
        <li>Export charts as <code>.png</code> image</li>
      </ul>
    </li>
    <li>🧠 <strong>AI-Powered Insights</strong>:
      <ul>
        <li>Generate a 100+ word summary of uploaded data using OpenAI</li>
      </ul>
    </li>
    <li>📁 <strong>Upload History</strong>: View personal file upload history</li>
    <li>📌 <strong>User Dashboard</strong>:
      <ul>
        <li>Dynamic cards: Total files uploaded, last upload date, charts generated</li>
        <li>Activity logs with recent actions</li>
      </ul>
    </li>
  </ul>

  <h3>✅ Admin Side</h3>
  <ul>
    <li>👨‍💼 <strong>Admin Panel</strong>:
      <ul>
        <li>View all uploaded files from all users</li>
        <li>View all registered users</li>
        <li>Promote users to admin</li>
        <li>Delete users</li>
      </ul>
    </li>
    <li>📊 <strong>/stats Page</strong>: Show key platform statistics like total users, uploads, popular file types</li>
    <li>🧾 <strong>Audit Logs & History</strong>: View detailed upload history of all users</li>
  </ul>

  <h2>🛠️ Tech Stack</h2>

  <h3>Frontend</h3>
  <ul>
    <li>React.js (Vite)</li>
    <li>Tailwind CSS</li>
    <li>Recharts</li>
    <li>Axios</li>
    <li>jwt-decode</li>
    <li>html2canvas</li>
  </ul>

  <h3>Backend</h3>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB + Mongoose</li>
    <li>Multer (for file upload)</li>
    <li>OpenAI API (for insights)</li>
    <li>dotenv, jsonwebtoken, bcryptjs</li>
  </ul>

  <h2>📂 Project Structure</h2>
  <pre><code>Excel-Analytics-Platform/
├── backend/
│   ├── models/
│   ├── routers/
│   ├── middlewares/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
├── .gitignore
└── README.md
</code></pre>

  <h2>🔐 Role-Based Access Flow</h2>
  <ul>
    <li>Users choose role at login (admin/user)</li>
    <li>Admins have access to <code>/admin</code>, <code>/admin/users</code>, <code>/stats</code>, etc.</li>
    <li>Users have access to <code>/upload</code>, <code>/dashboard</code>, and personal history</li>
  </ul>

  <h2>📈 Charts Available</h2>
  <ul>
    <li>Bar Chart</li>
    <li>Pie Chart</li>
    <li>Line Chart</li>
    <li>Radar Chart</li>
    <li>🔀 Dynamic X/Y Axis Selection</li>
    <li>📤 Export Chart as Image</li>
  </ul>

  <h2>🤖 AI Insights</h2>
  <ul>
    <li>Use OpenAI's GPT to summarize uploaded Excel data</li>
    <li>Summary includes:
      <ul>
        <li>Key metrics</li>
        <li>Trends, outliers</li>
        <li>Column-wise patterns</li>
        <li>At least 100 words insight</li>
      </ul>
    </li>
    <li>Requires valid OpenAI API key in backend <code>.env</code> file</li>
  </ul>

  <h2>📦 Installation & Setup</h2>

  <h3>Backend</h3>
  <pre><code>cd backend
npm install
touch .env
# Add the following:
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
npm run dev
</code></pre>

  <h3>Frontend</h3>
  <pre><code>cd frontend
npm install
touch .env
# Add:
VITE_API_BASE_URL=http://localhost:5000
npm run dev
</code></pre>

  <h2>✨ Future Enhancements</h2>
  <ul>
    <li>Export full report as PDF</li>
    <li>Add role audit logs</li>
    <li>Email-based invite for admin role</li>
    <li>Improve mobile UI further</li>
  </ul>

</body>
</html>
