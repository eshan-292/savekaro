/**
 * WhatsApp Bot for ThaaliScore
 * Send a meal photo on WhatsApp -> get instant nutrition analysis
 *
 * Setup:
 * 1. Create Twilio account (free sandbox: https://www.twilio.com/console/sms/whatsapp/sandbox)
 * 2. Set env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER
 * 3. Set webhook URL to: https://savekaro.in/api/whatsapp/webhook
 */

const MESSAGES = {
  welcome: `🍽️ *ThaaliScore on WhatsApp*\n\nNamaste! Send me a photo of your Indian meal and I'll analyze its nutrition instantly!\n\n📸 *Send a meal photo* → Calories, protein, health score\n💬 *Type a dish name* → Quick nutrition lookup\n❓ *"help"* → How to use\n\nPowered by SaveKaro.in`,

  analyzing: `🔍 Analyzing your meal...\nIdentifying dishes in your photo 🍛`,

  noFood: `😅 Couldn't identify Indian dishes in this photo.\n\nTips:\n• Clear, well-lit photo\n• Show food from above\n• Make sure dishes are visible\n\nTry again! 📸`,

  error: `⚠️ Something went wrong. Try again in a minute.\nOr visit savekaro.in/thaali-score`,

  rateLimited: `⏳ Daily free limit reached! Try again tomorrow.\nOr visit savekaro.in/thaali-score`,

  noApiKey: `📸 Photo analysis is not available right now. Our AI service is being configured.\n\nIn the meantime, you can:\n• Type a *dish name* for nutrition info\n• Visit savekaro.in/thaali-score`,

  apiError: `⚠️ Our AI service is temporarily down. Please try again in a few minutes.\nOr visit savekaro.in/thaali-score`,

  parseError: `🤔 Couldn't read the AI response for your photo. Please try again with a clearer image.\nOr visit savekaro.in/thaali-score`,

  help: `📖 *ThaaliScore Bot:*\n\n1️⃣ Take a clear meal photo\n2️⃣ Send it here\n3️⃣ Get instant nutrition analysis!\n\n*Commands:*\n• Photo → Full analysis\n• Dish name → Quick lookup\n• "help" → This message\n\n🌐 savekaro.in/thaali-score`
};

function formatAnalysis(dishes) {
  if (!dishes || dishes.length === 0) return MESSAGES.noFood;

  const totalCal = dishes.reduce((s, d) => s + d.cal, 0);
  const totalProtein = dishes.reduce((s, d) => s + (d.protein || 0), 0);
  const avgScore = Math.round(dishes.reduce((s, d) => s + d.healthScore, 0) / dishes.length * 10) / 10;

  const emoji = avgScore >= 8 ? '🌟' : avgScore >= 6 ? '😊' : avgScore >= 4 ? '🤔' : '⚠️';

  let msg = `${emoji} *ThaaliScore: ${avgScore}/10*\n\n`;
  msg += `📊 ${totalCal} cal | ${totalProtein}g protein\n\n`;
  msg += `🍽️ *Dishes:*\n`;

  dishes.forEach(d => {
    const v = d.veg ? '🟢' : '🔴';
    const gi = d.gi === 'low' ? 'LGI' : d.gi === 'medium' ? 'MGI' : 'HGI';
    msg += `${v} ${d.name} — ${d.cal}cal (${d.healthScore}/10) ${gi}\n`;
  });

  msg += `\n🚶 ~${Math.round(totalCal / 5)} min walking to burn`;
  if (avgScore >= 8) msg += `\n\n✅ Great meal! Well balanced.`;
  else if (avgScore < 5) msg += `\n\n💡 Add dal or sabzi for better balance!`;
  msg += `\n\n🔗 savekaro.in/thaali-score`;

  return msg;
}

function formatDishLookup(dish) {
  if (!dish) return `❌ Dish not found. Try another name or send a photo!`;

  const v = dish.veg ? '🟢 Veg' : '🔴 Non-Veg';
  const gi = dish.gi === 'low' ? '🟢 Low GI' : dish.gi === 'medium' ? '🟡 Medium GI' : '🔴 High GI';

  return `🍽️ *${dish.name}*\n${v} | ${dish.category} | ${dish.serving}\n\n📊 ${dish.cal} cal | P:${dish.protein}g | C:${dish.carbs}g | F:${dish.fat}g | Fiber:${dish.fiber}g\n\n🏆 Score: ${dish.healthScore}/10 | ${gi}${dish.swap ? '\n\n💡 ' + dish.swap : ''}`;
}

/**
 * Map error types from analyzePhoto result to user-facing messages
 */
function getErrorMessage(errorType) {
  switch (errorType) {
    case 'no_api_key': return MESSAGES.noApiKey;
    case 'rate_limited': return MESSAGES.rateLimited;
    case 'parse_error': return MESSAGES.parseError;
    case 'api_error': return MESSAGES.apiError;
    default: return MESSAGES.error;
  }
}

function handleWebhook(req, res, { dishes, analyzePhoto }) {
  try {
    const from = req.body.From || '';
    const body = (req.body.Body || '').trim().toLowerCase();
    const numMedia = parseInt(req.body.NumMedia || '0');
    const mediaUrl = req.body.MediaUrl0 || '';

    console.log(`[WhatsApp] Webhook received: from=${from}, body="${body}", numMedia=${numMedia}`);

    // Photo received
    if (numMedia > 0 && mediaUrl) {
      console.log(`[WhatsApp] Photo received from ${from}, mediaUrl=${mediaUrl}`);

      // Bug 1 fix: Check for API key availability BEFORE sending "analyzing" message
      const apiKeys = (process.env.GEMINI_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
      const singleKey = process.env.GEMINI_API_KEY || '';
      const allKeys = apiKeys.length > 0 ? apiKeys : (singleKey ? [singleKey] : []);

      if (allKeys.length === 0) {
        console.log('[WhatsApp] No API keys available, skipping photo analysis');
        sendTwilioReply(res, MESSAGES.noApiKey);
        return;
      }

      // Check Twilio credentials before promising async follow-up
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioToken = process.env.TWILIO_AUTH_TOKEN;
      if (!twilioSid || !twilioToken) {
        console.error('[WhatsApp] Twilio credentials missing - cannot send async follow-up message');
        // Fall back to sync-only: we can't send the result later, so don't promise "analyzing"
        // Instead, respond with an error
        sendTwilioReply(res, MESSAGES.error + '\n\n(Bot configuration incomplete)');
        return;
      }

      // API key exists and Twilio creds exist - safe to send "analyzing" and process async
      sendTwilioReply(res, MESSAGES.analyzing);

      analyzePhoto(mediaUrl).then(result => {
        let msg;
        if (result.error) {
          console.log(`[WhatsApp] Photo analysis returned error: ${result.error}`);
          msg = getErrorMessage(result.error);
        } else if (result.dishes && result.dishes.length > 0) {
          console.log(`[WhatsApp] Photo analysis success: ${result.dishes.length} dishes found`);
          msg = formatAnalysis(result.dishes);
        } else {
          console.log('[WhatsApp] Photo analysis: no dishes identified');
          msg = MESSAGES.noFood;
        }
        sendTwilioMessage(from, msg);
      }).catch((err) => {
        console.error('[WhatsApp] Photo analysis promise rejected:', err.message || err);
        sendTwilioMessage(from, MESSAGES.error);
      });
      return;
    }

    // Text commands
    let reply;
    if (['hi','hello','start','namaste','hola'].includes(body)) {
      reply = MESSAGES.welcome;
    } else if (body === 'help') {
      reply = MESSAGES.help;
    } else if (body.startsWith('score ')) {
      const name = body.replace('score ', '').trim();
      const found = dishes.find(d => d.name.toLowerCase().includes(name));
      reply = formatDishLookup(found);
    } else {
      // Try dish lookup
      const found = dishes.find(d => d.name.toLowerCase().includes(body));
      if (found) {
        reply = formatDishLookup(found);
      } else {
        reply = `I didn't get that. Try:\n• Send a *meal photo* 📸\n• Type a *dish name* (e.g., "dal makhani")\n• Type *"help"*`;
      }
    }

    console.log(`[WhatsApp] Sending text reply to ${from}`);
    sendTwilioReply(res, reply);
  } catch(err) {
    console.error('[WhatsApp] Webhook error:', err);
    sendTwilioReply(res, MESSAGES.error);
  }
}

function sendTwilioReply(res, message) {
  res.set('Content-Type', 'text/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>\n<Response>\n  <Message>${escapeXml(message)}</Message>\n</Response>`);
}

async function sendTwilioMessage(to, message) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

  if (!sid || !token) {
    console.error('[WhatsApp] Cannot send message: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN missing');
    return;
  }

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: from, To: to, Body: message })
    });
    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`[WhatsApp] Twilio API error ${resp.status}:`, errText);
    } else {
      console.log(`[WhatsApp] Message sent to ${to}`);
    }
  } catch(err) {
    console.error('[WhatsApp] Send failed:', err.message);
  }
}

function escapeXml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}

module.exports = { handleWebhook, formatAnalysis, formatDishLookup, MESSAGES };
