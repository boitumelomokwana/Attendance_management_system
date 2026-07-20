export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return password && password.length >= 6;
}

export function isValidStudentNo(studentNo) {
  return /^\d{8,10}$/.test(studentNo);
}

export function isValidYear(year) {
  const num = parseInt(year, 10);
  return num >= 1 && num <= 6;
}

export function isValidOTP(otp) {
  return /^\d{6}$/.test(otp);
}
