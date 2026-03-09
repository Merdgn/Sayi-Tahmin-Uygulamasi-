export const validateScore = (req, res, next) => {
  const { username, rounds } = req.body;
  
  if (!username || username.trim().length === 0) {
    res.status(400);
    return next(new Error("Lütfen bir kullanıcı adı girin."));
  }
  
  if (rounds <= 0) {
    res.status(400);
    return next(new Error("Geçersiz hamle sayısı."));
  }
  
  next(); // Her şey yolundaysa controller'a geç
};