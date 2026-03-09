import pool from '../config/db.js';

// Yeni skor kaydetme
export const saveScore = async (req, res, next) => {
  const { username, rounds, targetNumber } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO scores (username, rounds, target_number) VALUES($1, $2, $3) RETURNING *",
      [username, rounds, targetNumber]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    next(err); // Hatayı merkezi hata middleware'ine gönderir
  }
};

// Liderlik tablosunu getirme
export const getLeaderboard = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM scores ORDER BY rounds ASC LIMIT 10"
    );
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    next(err);
  }
};