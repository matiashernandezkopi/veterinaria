export const isProfessional = (req, res, next) => {
  if (req.user?.cargo !== "veterinario") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
