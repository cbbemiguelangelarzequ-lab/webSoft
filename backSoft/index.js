// index.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
// Puedes dejar 3000 para que sea igual al otro proyecto
const port = 3000;

// =======================
// CONTEXTO PARA OLLAMA
// =======================
const CONTEXTO_SOFT_ROBOTICS = `
Eres un asistente virtual experto en desarrollo de software, robótica e IoT.
Nombre de la Empresa: Soft & Robotics Lab.
Ubicación: Av. Tecnológica 123, Cochabamba, Bolivia.
Servicios principales:
- Desarrollo de software a medida (aplicaciones web, APIs, paneles de administración).
- Plataformas y kits de robótica educativa.
- Automatización e IoT (sensores, dashboards, telemetría).
- Visión por computador e inteligencia artificial aplicada.
Debes responder de forma clara y cercana, enfocándote en cómo la empresa puede ayudar
a resolver proyectos de software, robótica, automatización y análisis de datos.
Si la pregunta no está relacionada con tecnología, software, robótica o proyectos
de innovación, responde amablemente que solo puedes ayudar con temas de desarrollo
de software, robótica e IoT.
`;

// =======================
// MIDDLEWARE
// =======================
app.use(bodyParser.json());
app.use(cors());

// =======================
// CONFIGURACIÓN MYSQL
// =======================
// *** CAMBIA password y database A LO QUE TÚ TENGAS ***
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "micvis02",   
  database: "softrobotics",        
  port: 3306,
};

const dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos MySQL establecida");
});

// =======================
// CHAT IA CON OLLAMA
// =======================

// Handler común para generar respuesta con Ollama
async function generarRespuestaIA(promptUsuario, res) {
  if (!promptUsuario) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const promptConContexto = `${CONTEXTO_SOFT_ROBOTICS}\nPregunta del usuario: ${promptUsuario}`;

  try {
    const ollamaResponse = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "gemma3",
        prompt: promptConContexto,
        stream: true,
      },
      { responseType: "stream" }
    );

    let result = "";

    ollamaResponse.data.on("data", (chunk) => {
      const lines = chunk.toString().split("\n").filter(Boolean);
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) result += json.response;
        } catch (e) {
        }
      }
    });

    ollamaResponse.data.on("end", () => {
      res.json({ response: result.trim() });
    });

    ollamaResponse.data.on("error", (err) => {
      console.error("Error en stream de Ollama:", err);
      res.status(500).json({ error: err.message });
    });
  } catch (error) {
    console.error("Error al llamar a Ollama:", error);
    res.status(500).json({ error: error.message });
  }
}

// Ruta compatible con tu estilo anterior
app.post("/ollama-prompt", async (req, res) => {
  const { prompt } = req.body;
  generarRespuestaIA(prompt, res);
});

// Alias más REST (por si en el frontend usas /api/chat)
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  generarRespuestaIA(message, res);
});

// =======================
// ENDPOINTS PARA LA WEB
// =======================

// Info de la empresa (Inicio + Acerca de)
app.get("/api/company", (req, res) => {
  const query = "SELECT * FROM company_info LIMIT 1";
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener company_info:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener datos de company_info." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No hay información de empresa." });
    }
    res.status(200).json(results[0]);
  });
});

// Servicios de la empresa
app.get("/api/services", (req, res) => {
  const query = "SELECT * FROM services ORDER BY id";
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener services:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener los servicios." });
    }
    res.status(200).json(results);
  });
});

// Información de contacto
app.get("/api/contact", (req, res) => {
  const query = "SELECT * FROM contact_info LIMIT 1";
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener contact_info:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener los datos de contacto." });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay información de contacto registrada." });
    }
    res.status(200).json(results[0]);
  });
});

app.post("/api/contact-messages", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Nombre y email son campos requeridos." });
  }

  const query =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

  dbConnection.query(query, [name, email, message], (error, results) => {
    if (error) {
      console.error("Error al insertar en contact_messages:", error);
      return res
        .status(500)
        .json({ error: "Error al guardar el mensaje en la base de datos." });
    }

    res.status(201).json({
      message: "Mensaje guardado correctamente.",
      id: results.insertId,
    });
  });
});

// =======================
// RUTAS BÁSICAS
// =======================
app.get("/", (req, res) => {
  res.send("Backend Soft & Robotics Lab funcionando");
});

app.get("/servicio", (req, res) => {
  res.send("Ejemplo de otro servicio en el backend Soft & Robotics Lab");
});

// =======================
// INICIAR SERVIDOR
// =======================
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
