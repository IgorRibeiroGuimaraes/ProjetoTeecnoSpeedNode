export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
