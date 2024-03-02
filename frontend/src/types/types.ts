export type TPrescription = {
  medicationName?: string,
  duration?: number, 
  frequency?: number,
  mlDosage?: number,
  restrictions: string[] | undefined,
  severity?: string
}