import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouvelle simulation de prix - WebFitYou</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #0d9488); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; }
            .field { margin-bottom: 15px; }
            .label { font-weight: 600; color: #374151; }
            .value { color: #6b7280; }
            .price { background: #dbeafe; color: #1d4ed8; padding: 12px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
            .features { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
            .feature-tag { background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Nouvelle simulation de prix</h1>
              <p>Un prospect a utilisé le simulateur de prix</p>
            </div>
            
            <div class="content">
              <div class="price">
                Prix estimé : ${record.estimated_price}€
              </div>
              
              <div class="field">
                <div class="label">👤 Contact :</div>
                <div class="value">${record.first_name} ${record.last_name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email :</div>
                <div class="value">${record.email}</div>
              </div>
              
              ${record.phone ? `
              <div class="field">
                <div class="label">📱 Téléphone :</div>
                <div class="value">${record.phone}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">🎯 Type de projet :</div>
                <div class="value">${record.project_type}</div>
              </div>
              
              <div class="field">
                <div class="label">📄 Nombre de pages :</div>
                <div class="value">${record.pages} pages</div>
              </div>
              
              <div class="field">
                <div class="label">⚡ Fonctionnalités :</div>
                <div class="features">
                  ${record.features.map((feature: string) => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
              </div>
              
              <div class="field">
                <div class="label">⏰ Délai :</div>
                <div class="value">${record.timeline}</div>
              </div>
              
              <div class="field">
                <div class="label">🎧 Support :</div>
                <div class="value">${record.support}</div>
              </div>
              
              <div class="field">
                <div class="label">📅 Date de simulation :</div>
                <div class="value">${new Date(record.created_at).toLocaleString('fr-FR')}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>Connectez-vous à votre dashboard Supabase pour voir tous les détails</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email using a service like Resend, SendGrid, etc.
    // For now, we'll just log the email content
    console.log('Pricing simulation email to send:', emailHtml)

    return new Response(
      JSON.stringify({ success: true, message: 'Pricing notification sent' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})