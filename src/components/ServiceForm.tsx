import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setFormField,
  cancelEditing,
  clearForm,
  setValidationError,
} from "../store/slices/formSlice";
import { addService, updateService } from "../store/slices/servicesSlice";
import { validateForm } from "../utils/validation";
import "./ServiceForm.css";

const ServiceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, price, editingId, errors } = useAppSelector(
    (state) => state.form,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(name, price);

    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, error]) => {
        if (error) {
          dispatch(setValidationError({ field, error }));
        }
      });
      return;
    }

    if (editingId) {
      dispatch(
        updateService({
          id: editingId,
          name: name.trim(),
          price: parseFloat(price),
        }),
      );
      dispatch(cancelEditing());
    } else {
      dispatch(
        addService({
          name: name.trim(),
          price: parseFloat(price),
        }),
      );
      dispatch(clearForm());
    }
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  return (
    <div
      className={`form-container ${editingId ? "editing-mode" : "adding-mode"}`}
    >
      <form onSubmit={handleSubmit} className="horizontal-form">
        <div className="form-row">
          <div className="form-field">
            <input
              type="text"
              value={name}
              onChange={(e) =>
                dispatch(setFormField({ field: "name", value: e.target.value }))
              }
              className={errors.name ? "error" : ""}
              placeholder="Название услуги"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-field">
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) =>
                dispatch(
                  setFormField({ field: "price", value: e.target.value }),
                )
              }
              className={errors.price ? "error" : ""}
              placeholder="Цена"
            />
            {errors.price && (
              <div className="error-message">{errors.price}</div>
            )}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      {editingId && <div className="editing-badge">Редактирование: {name}</div>}
    </div>
  );
};

export default ServiceForm;
