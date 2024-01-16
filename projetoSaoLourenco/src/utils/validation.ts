const isValidEmail = (email: string): boolean => {
  // Lógica para validar o formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  // Lógica para validar a força da senha
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  // Lógica para validar a força da senha
  // Exemplo simples: A senha deve ter pelo menos 8 caracteres(numero e letras maiúscula/minúscula)
  return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
};

export { isValidEmail, isValidPassword };
