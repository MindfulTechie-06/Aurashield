import { db } from '../firebase-admin.js';
import { analyzeEmergency } from '../services/ai.service.js';
import { calculatePriorityScore } from '../services/priority.service.js';

export const handleSOS = async (req, res) => {
  try {
    const { room, category, message } = req.body;

    if (!room || !category) {
      return res.status(400).json({ error: 'Room and Category are required' });
    }

    // 1. AI Analysis
    const aiResult = await analyzeEmergency(room, category, message);

    // 2. Compute Priority
    const priority_score = calculatePriorityScore(aiResult.severity, aiResult.category);

    // 3. Assemble Alert Object
    const alertData = {
      room,
      type: aiResult.severity.toLowerCase(), // 'critical', 'warning', 'safe' for frontend mapping
      category: aiResult.category.toLowerCase(), // 'fire', 'medical', 'security'
      originalMessage: message || '',
      englishTranslation: aiResult.english_translation,
      confidence: aiResult.confidence,
      recommendedActions: aiResult.recommended_actions,
      priorityScore: priority_score,
      status: 'pending', // 'pending', 'acknowledged', 'in_progress', 'resolved'
      timestamp: new Date().toISOString(),
    };

    // 4. Save to Firestore
    const docRef = await db.collection('alerts').add(alertData);
    const savedAlert = { id: docRef.id, ...alertData };

    console.log('[SOS Controller] Processed new alert:', savedAlert.id);

    return res.status(201).json({
      success: true,
      message: 'SOS received and processed successfully',
      data: savedAlert
    });
  } catch (error) {
    console.error('[SOS Controller] Error handling SOS:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default { handleSOS };
