/**
 * Zentrale Passwort-Policy — EINE Quelle für Server- (zod) und Client-Validierung (HTML pattern).
 * Regel: mindestens 6 Zeichen, mit mindestens einem Buchstaben UND einer Ziffer.
 */
export const PASSWORD_MIN = 6;

/** HTML-`pattern`-Wert (implizit verankert): >=1 Buchstabe, >=1 Ziffer, min. 6 Zeichen. */
export const PASSWORD_PATTERN = "(?=.*[A-Za-z])(?=.*[0-9]).{6,}";

/** Serverseitige Prüfung derselben Regel. */
export const passwordPolicyRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/;

export function isValidPassword(pw: string): boolean {
  return passwordPolicyRegex.test(pw);
}
