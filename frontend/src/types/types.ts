export type TPrescription = {
  medicationName?: string,
  dose?: number,
  unit?: string,
  duration?: number, 
  frequency?: number,
  mlDosage?: number,
  restrictions: string[] | undefined,
  severity?: string
}