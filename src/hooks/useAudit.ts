import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface AuditFormData {
  website: string;
  business_sector: string;
  goals: string[];
  budget: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const useAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAudit = async (formData: AuditFormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Insert audit request
      const { data, error: insertError } = await supabase
        .from('audit_requests')
        .insert([{
          website: formData.website || null,
          business_sector: formData.business_sector,
          goals: formData.goals,
          budget: formData.budget,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone || null,
          status: 'pending'
        }])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Trigger email notification
      try {
        const { error: functionError } = await supabase.functions.invoke('send-audit-notification', {
          body: { record: data }
        });

        if (functionError) {
          console.error('Error sending notification:', functionError);
          // Don't throw here - the audit was saved successfully
        }
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Continue - the main audit submission was successful
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Error submitting audit:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitAudit,
    loading,
    error
  };
};