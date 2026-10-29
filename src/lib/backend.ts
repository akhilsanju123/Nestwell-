import { supabase } from './supabase';

export type EnquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  project?: string;
  visit_date?: string;
  message?: string;
  source?: string;
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!supabase) throw new Error('Enquiry service is not available right now.');
  const { error } = await supabase.from('nestwell_enquiries').insert(payload);
  if (error) throw new Error('We could not send your enquiry. Please try again.');
}
