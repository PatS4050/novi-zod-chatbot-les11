'use server';
import { generateText, Output, NoObjectGeneratedError } from 'ai';
import { openai } from '@ai-sdk/openai';
import { vacatureSchema } from '@/lib/vacature/schema';
import type { Vacature } from '@/lib/vacature/schema';

export type VacatureResultaat = {
  vacature?: Vacature;
  error?: string;
};

export async function extractVacature(tekst: string): Promise<VacatureResultaat> {
  // TODO: controleer de input: de tekst mag niet leeg zijn en niet langer dan een maximum
  if (typeof tekst !== 'string' || tekst.trim().length === 0) {
    return { error: 'Vul eerst een vacaturetekst in.' };
  }

  if (tekst.length > 10000) {
    return { error: 'De vacaturetekst mag maximaal 10.000 tekens bevatten.' };
  }
  // TODO: roep generateText() aan met openai('gpt-4o-mini'), een instructie, de tekst als prompt en output: Output.object({ schema: vacatureSchema })
  try {
    const { output } = await generateText({
      model: openai('gpt-4o-mini'),

      system: 'Je bent een assistent die vacatureteksten analyseert. Gebruik alleen informatie uit de tekst. Verzin geen gegevens. Gebruik null als informatie ontbreekt.',

      prompt: `Analyseer deze vacaturetekst:\n\n${tekst}`,

      output: Output.object({
        schema: vacatureSchema
      })
    });
    // TODO: geef { vacature: output } terug

    return { vacature: output };
// TODO: vang NoObjectGeneratedError af en geef een begrijpelijke foutmelding terug
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      return {
        error: 'Het is niet gelukt om een vacature te analyseren.'
      };
    }

    console.error('Fout bij vacature-analyse:', error);

    return {
      error: 'Er is iets misgegaan tijdens het analyseren.'
    };
  }

  return { error: `Nog niet geïmplementeerd. De server heeft ${tekst.length} tekens ontvangen.` };
}
