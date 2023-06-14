/**
 * Per the W3C HTML5 specification: https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
 * - Note: This requirement is a willful violation of RFC 5322, which defines a syntax for e-mail addresses that is simultaneously too strict (before the “@” character), too vague (after the “@” character), and too lax (allowing comments, whitespace characters, and quoted strings in manners unfamiliar to most users) to be of practical use here.
 *
 * - [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]  Captures one or more characters that are allowed in the username part of the email address. This includes alphanumeric characters, special characters, and certain punctuation marks.
 * - @ Matches the @ symbol that separates the username and domain.
 * - [a-zA-Z0-9] Captures a single alphanumeric character, representing the first character of the domain name.
 * - (?: Starts a non-capturing group for optional domain sections.
 * - [a-zA-Z0-9-]{0,61}[a-zA-Z0-9]  Captures a domain section that consists of alphanumeric characters and hyphens. It allows between 0 and 61 characters, ensuring that the total length does not exceed 63 characters.
 * - )?  Ends the non-capturing group for the optional domain section, making it optional.
 * - (?:  Starts a non-capturing group for optional subdomains.
 * - \.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?  Captures a subdomain section that starts with a dot (.) followed by an alphanumeric character. It allows between 0 and 61 characters of alphanumeric characters and hyphens. The entire subdomain section is optional.
 * - )*  Ends the non-capturing group for the optional subdomains. This allows for zero or more occurrences of subdomain sections.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * - (?=.{3,20}$) enforces a minimum of 3 characters and a maximum of 20 characters.
 * - (?![-_.]) ensures that the username does not start with a hyphen, underscore, or period.
 * - (?!.*[-_.]{2}) ensures that the username does not contain two hyphens, underscores, or periods in a row.
 * - [a-zA-Z0-9-_.]+ matches any alphanumeric character, hyphen, underscore, or period.
 * - (?<![-_.]) ensures that the username does not end with a hyphen, underscore, or period.
 */
const USERNAME_REGEX =
  /^(?=.{3,20}$)(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9-_.]+(?<![-_.])$/;

/**
 * - (?=.*[A-Z]) ensures that there is at least one uppercase letter.
 * - (?=.*[a-z]) ensures that there is at least one lowercase letter.
 * - (?=.*[0-9]) ensures that there is at least one number.
 * - (?=.*[!@#$%^&*]) ensures that there is at least one special character.
 * - (?!.*\s) ensures that there are no spaces.
 * - .{8,32} ensures that the password is between 8 and 32 characters long.
 */
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,32}$/;

const REGISTER_URL = '/users';

export { EMAIL_REGEX, USERNAME_REGEX, PASSWORD_REGEX, REGISTER_URL };
