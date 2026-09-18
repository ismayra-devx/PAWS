// ==========================================================================
// PAWS AI - Server-Side Medical Report Analysis API (/api/analyze-report)
// Compatible with Vercel Serverless Functions & Node.js HTTP runtime
// Security: Keeps all API keys strictly server-side. Zero browser visibility.
// ==========================================================================

const SAMPLE_VERIFIED_DATA = {
  animal: {
    name: "Bruno",
    species: "Canine (Golden Retriever)"
  },
  report_date: "2026-08-28",
  vet_facility: "Green Paws Veterinary Clinic (Dr. Ananya Sen)",
  medications: [
    {
      name: "Cetirizine 10mg",
      frequency: "once daily",
      dosage: "1 tablet (10mg)",
      instructions: "1 tablet once daily after meal for 14 days"
    }
  ],
  measurements: [
    { name: "Haemoglobin (Hb)", value: "12.8 g/dL", reference_range: "12.0 – 18.0 g/dL", status: "Normal" },
    { name: "Packed Cell Volume (PCV)", value: "38.5 %", reference_range: "37.0 – 55.0 %", status: "Normal" },
    { name: "Total RBC Count", value: "6.1 × 10⁶/µL", reference_range: "5.5 – 8.5 × 10⁶/µL", status: "Normal" },
    { name: "Total WBC Count", value: "9.2 × 10³/µL", reference_range: "6.0 – 17.0 × 10³/µL", status: "Normal" },
    { name: "Neutrophils", value: "68 %", reference_range: "60 – 77 %", status: "Normal" },
    { name: "Lymphocytes", value: "22 %", reference_range: "12 – 30 %", status: "Normal" },
    { name: "Eosinophils", value: "1.4 × 10³/µL", reference_range: "0.1 – 1.2 × 10³/µL", status: "Mild Elevation (Allergy / Pruritus)" },
    { name: "Serum Creatinine", value: "1.5 mg/dL", reference_range: "0.5 – 1.4 mg/dL", status: "Borderline (Hydration discussion)" },
    { name: "Blood Urea Nitrogen (BUN)", value: "22 mg/dL", reference_range: "7 – 27 mg/dL", status: "Normal" },
    { name: "Total Platelet Count", value: "280 × 10³/µL", reference_range: "175 – 500 × 10³/µL", status: "Normal" },
    { name: "Total Serum Protein", value: "6.8 g/dL", reference_range: "5.4 – 7.5 g/dL", status: "Normal" },
    { name: "Serum Albumin", value: "3.2 g/dL", reference_range: "2.3 – 4.0 g/dL", status: "Normal" },
    { name: "Alanine Aminotransferase (ALT)", value: "45 U/L", reference_range: "10 – 100 U/L", status: "Normal" },
    { name: "Blood Glucose (Fasting)", value: "95 mg/dL", reference_range: "70 – 143 mg/dL", status: "Normal" }
  ],
  vaccinations: [
    {
      name: "Rabies Booster",
      status: "Due in 20 days",
      due_date: "2026-09-17"
    }
  ],
  conditions_mentioned: [
    "Environmental allergic dermatitis / skin pruritus",
    "Mild sub-hydration"
  ],
  follow_up: "Clinical recheck scheduled in 14 days on 11 Sep 2026 for allergy assessment and hydration check.",
  follow_up_date: "2026-09-11"
};

const SYSTEM_PROMPT = `You are organising information from a veterinary medical document.
Extract only information explicitly present in the supplied document.

Return structured JSON containing, where available:
* animal (object with name and species/breed, or null)
* report_date (YYYY-MM-DD or readable string, or null)
* vet_facility (clinic name or attending vet, or null)
* medications (array of objects: { name, frequency, dosage, instructions })
* vaccinations (array of objects: { name, status, due_date })
* measurements (array of objects: { name, value, reference_range, status })
* conditions_mentioned (array of string descriptions)
* follow_up (summary string of explicit follow-up instructions, or null)
* follow_up_date (YYYY-MM-DD or explicit date mentioned for next check-in, or null)

CRITICAL RULES:
- Do NOT infer missing information.
- Do NOT diagnose the animal.
- Do NOT provide medical advice.
- If a field is not present, return null or an empty array.
- Output ONLY valid JSON matching this schema, without markdown formatting or code fences.`;

async function callGemini(apiKey, text) {
  const models = [
    'gemini-flash-lite-latest',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-2.5-flash-lite'
  ];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: SYSTEM_PROMPT },
              { text: `Document to organise:\n\n${text}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Gemini ${model} HTTP ${resp.status}: ${errText}`);
      }

      const data = await resp.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Empty response from Gemini API");

      const parsed = JSON.parse(content.trim());
      return { success: true, data: parsed, model, provider: "Google Gemini" };
    } catch (err) {
      lastError = err;
      // Continue to try next model if quota or 404
    }
  }

  throw lastError || new Error("Failed to query Gemini API");
}

async function callOpenAI(apiKey, text) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Document to organise:\n\n${text}` }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`OpenAI HTTP ${resp.status}: ${errText}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI API");

  const parsed = JSON.parse(content.trim());
  return { success: true, data: parsed, model: 'gpt-4o-mini', provider: "OpenAI" };
}

module.exports = async function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method === 'GET') {
    // Health check endpoint
    const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      status: 'online',
      service: 'PAWS AI Report Organiser API',
      configuredProviders: {
        gemini: hasGemini,
        openai: hasOpenAI
      },
      demoFallbackAvailable: true
    }));
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    // Parse JSON body if not already parsed by serverless runtime
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    } else if (!body) {
      body = {};
    }

    const { text, fileName, isDemo } = body;

    // Check if explicitly requested demo mode or sample report fallback
    if (isDemo || fileName === 'blood_report_august.pdf' || fileName === 'Bruno_Blood_Report.pdf') {
      const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      const openaiKey = process.env.OPENAI_API_KEY;

      // If text and key are present, attempt genuine AI analysis on the sample report
      if (text && text.trim().length > 30 && (geminiKey || openaiKey)) {
        try {
          let aiResult;
          if (geminiKey) {
            aiResult = await callGemini(geminiKey, text);
          } else {
            aiResult = await callOpenAI(openaiKey, text);
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            success: true,
            isDemo: false,
            source: 'genuine_ai',
            provider: aiResult.provider,
            model: aiResult.model,
            data: aiResult.data,
            fileName: fileName || 'Bruno_Blood_Report.pdf'
          }));
        } catch (sampleAiErr) {
          console.warn('Sample AI call encountered error, falling back to verified sample data:', sampleAiErr.message);
        }
      }

      // If no API key or AI call failed on sample, return verified sample data with clear demo flag
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: true,
        isDemo: true,
        source: 'sample_verified',
        note: 'Demo mode: Processed using verified veterinary sample report (Bruno_Blood_Report.pdf).',
        data: SAMPLE_VERIFIED_DATA,
        fileName: fileName || 'Bruno_Blood_Report.pdf'
      }));
    }

    // Step 2 & 9: Verify extracted document text
    if (!text || typeof text !== 'string' || text.trim().length < 20) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: false,
        error: 'EMPTY_OR_UNREADABLE',
        message: "We couldn't extract readable information from this document."
      }));
    }

    // Server-Side AI Key Selection
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!geminiKey && !openaiKey) {
      // Step 9 & 10: Never show fake successful results when processing actually failed.
      // Inform client that external AI service is unconfigured, and provide demo mode option.
      res.statusCode = 503;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: false,
        error: 'AI_KEY_MISSING',
        message: "We couldn't process this report right now. Please try again.",
        canUseDemo: true,
        details: 'Server AI API key is not configured. Set GEMINI_API_KEY or OPENAI_API_KEY in server environment.'
      }));
    }

    // Execute Genuine AI Analysis
    let result;
    if (geminiKey) {
      result = await callGemini(geminiKey, text);
    } else {
      result = await callOpenAI(openaiKey, text);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: true,
      isDemo: false,
      source: 'genuine_ai',
      provider: result.provider,
      model: result.model,
      data: result.data,
      fileName: fileName || 'Uploaded_Report.pdf'
    }));

  } catch (error) {
    console.error('AI Report Analysis Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: false,
      error: 'AI_EXECUTION_FAILURE',
      message: "We couldn't process this report right now. Please try again.",
      canUseDemo: true
    }));
  }
};
