export function generateAlias(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let alias = '';
  for (let i = 0; i < length; i++) {
    alias += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return alias;
}
