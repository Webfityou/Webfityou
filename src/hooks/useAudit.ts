import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface DemandeAuditData {
  website: string;
  business_sector: string;
  goals: string[];
  budget: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const useDemandeAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const soumettreDemandeAudit = async (formData: DemandeAuditData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Insérer la demande d'audit
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

      // Déclencher la notification email
      try {
        const { error: functionError } = await supabase.functions.invoke('send-audit-notification', {
          body: { record: data }
        });

        if (functionError) {
          console.error('Error sending notification:', functionError);
          // Ne pas lever d'erreur ici - l'audit a été sauvegardé avec succès
        }
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Continuer - la soumission principale de l'audit a réussi
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la soumission de l\'audit:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    soumettreDemandeAudit,
    loading,
    error
  };
};