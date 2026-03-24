export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    price?: string;
  };
}

export const validateForm = (name: string, price: string): ValidationResult => {
  const errors: { name?: string; price?: string } = {};

  if (!name.trim()) {
    errors.name = 'Название услуги обязательно';
  } else if (name.trim().length < 2) {
    errors.name = 'Название должно содержать минимум 2 символа';
  }

  if (!price.trim()) {
    errors.price = 'Цена обязательна';
  } else {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      errors.price = 'Введите корректное число';
    } else if (priceNum <= 0) {
      errors.price = 'Цена должна быть больше 0';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};