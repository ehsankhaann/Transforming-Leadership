import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SITE_CONFIG } from '../content';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || '';

const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes('[SUPABASE_URL]') &&
  supabaseUrl.startsWith('http');

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface MastermindApplicationPayload {
  name: string;
  email: string;
  phone: string;
  titleAndCompany: string;
  peopleYouLead: string;
  circle: string;
  biggestChallenge: string;
  referralSource?: string;
}

export interface CallRequestPayload {
  name: string;
  email: string;
  role: string;
  interest: string;
  notes?: string;
}

export async function submitMastermindApplication(
  payload: MastermindApplicationPayload
): Promise<{ mode: 'supabase' | 'endpoint' | 'preview' }> {
  if (payload.email.toLowerCase().includes('error@')) {
    throw new Error('Simulated submission failure. Please check your connection or email Steve directly.');
  }

  // 1. Live Supabase insert when VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY are configured
  if (supabase) {
    const { error } = await supabase.from(SITE_CONFIG.supabaseTableApplications).insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        title_and_company: payload.titleAndCompany,
        people_you_lead: payload.peopleYouLead,
        which_circle: payload.circle,
        biggest_challenge: payload.biggestChallenge,
        how_did_you_hear: payload.referralSource || '',
        submitted_at: new Date().toISOString()
      }
    ]);
    if (error) throw new Error(error.message);
    return { mode: 'supabase' };
  }

  // 2. Live POST to [FORM_ENDPOINT] once replaced with a real URL
  if (SITE_CONFIG.formEndpoint && !SITE_CONFIG.formEndpoint.includes('[FORM_ENDPOINT]')) {
    const response = await fetch(SITE_CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('Unable to submit application right now. Please try again.');
    }
    return { mode: 'endpoint' };
  }

  // 3. Sensible dummy/preview mode before credentials are supplied
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { mode: 'preview' };
}

export async function submitCallRequest(
  payload: CallRequestPayload
): Promise<{ mode: 'supabase' | 'endpoint' | 'preview' }> {
  if (payload.email.toLowerCase().includes('error@')) {
    throw new Error('Unable to send call request. Please try again.');
  }

  if (supabase) {
    const { error } = await supabase.from(SITE_CONFIG.supabaseTableCalls).insert([
      {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        interest: payload.interest,
        notes: payload.notes || '',
        submitted_at: new Date().toISOString()
      }
    ]);
    if (error) throw new Error(error.message);
    return { mode: 'supabase' };
  }

  if (SITE_CONFIG.formEndpoint && !SITE_CONFIG.formEndpoint.includes('[FORM_ENDPOINT]')) {
    const response = await fetch(SITE_CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ type: 'call_request', ...payload })
    });
    if (!response.ok) throw new Error('Request failed.');
    return { mode: 'endpoint' };
  }

  await new Promise((resolve) => setTimeout(resolve, 550));
  return { mode: 'preview' };
}
