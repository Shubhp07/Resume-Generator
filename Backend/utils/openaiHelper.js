import dotenv from "dotenv";
dotenv.config();
import OpenAI from 'openai';


const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
	console.warn('OPENAI_API_KEY not set. openai helper will fail until it is set.');
}

const client = new OpenAI({ apiKey });

/**
 * Generate a resume string using OpenAI from a profile object.
 * Profile is expected to include at minimum: name, email, summary, experience (array), education (array), skills (array)
 */
export async function generateResume(profile = {}) {
	const prompt = buildPrompt(profile);

	try {
		const resp = await client.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are an expert resume writer. Produce a clean, concise, ATS-friendly resume in plain text. Use bullet points for responsibilities and achievements, include headings for Summary, Experience, Education, and Skills.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 900,
		});

		const text = resp?.choices?.[0]?.message?.content ?? '';
		return text.trim();
	} catch (err) {
		console.error('OpenAI generateResume error:', err?.message || err);
		throw err;
	}
}

function buildPrompt(profile) {
	const parts = [];
	parts.push(`Name: ${profile.name || ''}`);
	if (profile.title) parts.push(`Title: ${profile.title}`);
	if (profile.summary) parts.push(`Summary: ${profile.summary}`);

	if (Array.isArray(profile.experience) && profile.experience.length) {
		parts.push('Experience:');
		profile.experience.forEach((e, i) => {
			parts.push(`${i + 1}. ${e.title || ''} at ${e.company || ''} (${e.startDate || ''} - ${e.endDate || 'Present'})`);
			if (e.description) parts.push(`   Description: ${e.description}`);
			if (e.achievements) parts.push(`   Achievements: ${Array.isArray(e.achievements) ? e.achievements.join('; ') : e.achievements}`);
		});
	}

	if (Array.isArray(profile.education) && profile.education.length) {
		parts.push('Education:');
		profile.education.forEach((ed) => {
			parts.push(`${ed.degree || ''}, ${ed.institution || ''} ${ed.year || ''}`);
		});
	}

	if (Array.isArray(profile.skills) && profile.skills.length) {
		parts.push(`Skills: ${profile.skills.join(', ')}`);
	}

	parts.push('Produce a resume in English. Keep it concise and focused on achievements.');

	return parts.join('\n');
}

export default { generateResume };
