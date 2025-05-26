import React from "react";

export const normalizeLetter = (letter) => {
  return letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
};

export const isAlphabet = (char) => /^[A-Z]$/.test(char);
