export const isProfessional = (req, res, next) => {
  console.log("🧠 req.user:", req.user);

  if (req.user.cargo !== "Veterinario") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
