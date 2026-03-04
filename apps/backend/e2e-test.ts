// 🚀 E2E Test Suite Pro (Zero Dependencies)
// Basado en el flujo sugerido para validar dominio, enums y creación recursiva.

const API = "https://performanceos.onrender.com/api/v1";
// Cambia a http://localhost:3000/api para test local

async function run() {
  try {
    console.log("\n🔐 [1/4] Autenticando Coach...");

    // Nota: Usamos las credenciales reales del seed
    const loginRes = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@performanceos.com",
        password: "Admin123!",
      }),
    });

    const loginData = await loginRes.json();
    if (!loginRes.ok)
      throw new Error(`Login fallo: ${JSON.stringify(loginData)}`);

    // En auth.service.ts devolvemos 'access_token'
    const token = loginData.access_token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    console.log("✅ Coach logueado con éxito.");

    console.log("\n👤 [2/4] Creando Atleta con Enum 'INTERMEDIATE'...");

    const athleteRes = await fetch(`${API}/athletes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: "E2E Athlete Tester",
        email: `e2e_user_${Date.now()}@performanceos.com`,
        password: "password123",
        level: "INTERMEDIATE",
      }),
    });

    const athleteData = await athleteRes.json();
    if (!athleteRes.ok)
      throw new Error(
        `Creación de Atleta fallo: ${JSON.stringify(athleteData)}`,
      );

    console.log(`✅ Atleta creado. ID: ${athleteData.id}`);

    console.log("\n📦 [3/4] Creando Plantilla con Enum 'STRENGTH'...");

    const templateRes = await fetch(`${API}/templates`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: "Poder Real E2E",
        description: "Test de validación estructural",
        durationWeeks: 4,
        microcycles: [
          {
            weekNumber: 1,
            sessions: [
              {
                title: "Empuje Explosivo",
                blocks: [
                  {
                    type: "STRENGTH",
                    exercises: [
                      {
                        // Squat ID del seed anterior
                        exerciseId: "32640ec4-7f99-488f-bda9-7fd8ae66e0b6",
                        targetSets: 5,
                        targetReps: 5,
                        targetRpe: 8.5,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    const templateData = await templateRes.json();
    if (!templateRes.ok)
      throw new Error(
        `Creación de Plantilla fallo: ${JSON.stringify(templateData)}`,
      );

    console.log(`✅ Plantilla creada. ID: ${templateData.id}`);

    console.log("\n🚀 [4/4] Asignando Programa (Generación de Sesiones)...");

    const assignRes = await fetch(`${API}/programs/assign`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        athleteId: athleteData.id,
        templateId: templateData.id,
        startDate: new Date().toISOString(),
      }),
    });

    const assignData = await assignRes.json();
    if (!assignRes.ok)
      throw new Error(
        `Asignación de Programa fallo: ${JSON.stringify(assignData)}`,
      );

    console.log("\n🎉 ¡EL MOTOR DE PERFORMANCE-OS FUNCIONA PERFECTAMENTE!");
    console.log(`🔥 Program ID: ${assignData.id}`);
    console.log("------------------------------------------");
  } catch (err) {
    console.error("\n❌ ERROR CRÍTICO EN FLUJO E2E:");
    console.error(err);
    process.exit(1);
  }
}

run();
