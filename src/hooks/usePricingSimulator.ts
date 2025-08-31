import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface PricingSimulationData {
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

export const usePricingSimulator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSimulation = async (formData: PricingSimulationData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Insert pricing simulation
      const { data, error: insertError } = await supabase
        .from('pricing_simulations')
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

      // Trigger email notification
      try {
        const { error: functionError } = await supabase.functions.invoke('send-pricing-notification', {
          body: { record: data }
        });

        if (functionError) {
          console.error('Error sending notification:', functionError);
          // Don't throw here - the simulation was saved successfully
        }
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Continue - the main submission was successful
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Error submitting pricing simulation:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitSimulation,
    loading,
    error
  };
};