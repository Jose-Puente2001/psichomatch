export const handleButtonVerPsicologos = (jwt, navigate) => {
  if (jwt && jwt.jwt.role === 'patient') {
    // Redirige a /psicologos si el rol es 'patient'
    navigate(`/psicologos/${jwt?.id}`);
  } else {
    // Redirige a /login si el rol no es 'patient'
    navigate('/login');
  }
};
