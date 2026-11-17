// TODO: importeer z uit 'zod'
import {z} from 'zod';
// TODO: maak hier vacatureSchema met z.object(): functietitel, bedrijf (nullable), niveau (enum), salarisMin (int, nullable), vaardigheden (array) en remote (boolean)
export const vacatureSchema = z.object ({
    functietitel: z.string().describe('De functietitel van de vacature'),
    bedrijf: z.string().nullable().describe('Het bedrijf met de vacature'),
    locatie: z.string().nullable().describe('vestiging waar de vacature is geplaatst'),
    niveau: z.enum(['junior','medior','senior','onbekend']).describe('Het ervaringsniveau van de functie'),
    salarisMax: z.number().int().nullable().describe('Het maximale bruto salarais in euros'),
    salarisMin: z.number().int().nullable().describe('Het minimale brutos salaris in euros') ,
    vaardigheden: z.array(z.string()).describe('Een lijst van vereiste vaardigheden'),

});
// TODO: vervang dit tijdelijke type door: export type Vacature = z.infer<typeof vacatureSchema>;
/*export type Vacature = {
    functietitel: string;
    bedrijf: string | null;
    niveau: 'junior' | 'medior' | 'senior' | 'onbekend';
    salarisMin: number | null;
    vaardigheden: string[];
    remote: boolean;
};*/
export type Vacature = z.infer<typeof vacatureSchema>
