import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface SimulationTarifData {
  project_type: string;
  pages: number;
  features: string[];
  timeline: string;
  support: string;
  estimated_price: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const useSimulateurTarif = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const soumettreSimulation = async (formData: SimulationTarifData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Insérer la simulation de tarif
      const { data, error: insertError } = await supabase
        .from('simulations_tarifs')
        .insert([{
          project_type: formData.project_type,
          pages: formData.pages,
          features: formData.features,
          timeline: formData.timeline,
          support: formData.support,
          estimated_price: formData.estimated_price,
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
        const { error: functionError } = await supabase.functions.invoke('send-pricing-notification', {
          body: { record: data }
        });

        if (functionError) {
          console.error('Error sending notification:', functionError);
          // Ne pas lever d'erreur ici - la simulation a été sauvegardée avec succès
        }
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Continuer - la soumission principale a réussi
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Erreur lors de la soumission de la simulation:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    soumettreSimulation,
    loading,
    error
  };
};