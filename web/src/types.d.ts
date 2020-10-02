interface RegistrationForm {
  email: string;
  username: string;
  password: string;
  password2: string;
}

interface LoginForm {
  usernameOrEmail: string;
  password: string;
}

interface FileForm {
  title: string;
  pdfFile: Blob | null;
}
