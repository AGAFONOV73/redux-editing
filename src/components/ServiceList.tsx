// src/components/ServiceList.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteService } from '../store/slices/servicesSlice';
import { startEditing, cancelEditing } from '../store/slices/formSlice';
import { selectFilteredServices, selectFilterStats } from '../store/selectors/servicesSelectors';
import './ServiceList.css';

const ServiceList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredServices = useAppSelector(selectFilteredServices);
  const stats = useAppSelector(selectFilterStats);
  const searchTerm = useAppSelector(state => state.filter.searchTerm);
  const { editingId } = useAppSelector(state => state.form);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  // Функция для подсветки найденных символов
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return <span>{text}</span>;
    
    const lowerText = text.toLowerCase();
    const lowerSearch = search.toLowerCase();
    const index = lowerText.indexOf(lowerSearch);
    
    if (index === -1) return <span>{text}</span>;
    
    return (
      <span>
        {text.substring(0, index)}
        <mark className="highlight">
          {text.substring(index, index + search.length)}
        </mark>
        {text.substring(index + search.length)}
      </span>
    );
  };

  const handleEdit = (service: any) => {
    dispatch(startEditing(service));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteService(id));
    if (editingId === id) {
      dispatch(cancelEditing());
    }
    const newSelected = new Set(selectedServices);
    newSelected.delete(id);
    setSelectedServices(newSelected);
  };

  const handleCheckboxChange = (id: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedServices(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedServices.size === filteredServices.length) {
      setSelectedServices(new Set());
    } else {
      setSelectedServices(new Set(filteredServices.map(s => s.id)));
    }
  };

  const handleDeleteSelected = () => {
    selectedServices.forEach(id => {
      dispatch(deleteService(id));
      if (editingId === id) {
        dispatch(cancelEditing());
      }
    });
    setSelectedServices(new Set());
  };

  return (
    <div className="services-list">
      <div className="list-header">
        <h2>Список услуг</h2>
        <div className="services-count">
          Всего услуг: {stats.total}
        </div>
      </div>
      
      {filteredServices.length > 0 && (
        <div className="list-actions">
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectedServices.size === filteredServices.length && filteredServices.length > 0}
              onChange={handleSelectAll}
            />
            Выбрать все
          </label>
          {selectedServices.size > 0 && (
            <button className="btn-delete-selected" onClick={handleDeleteSelected}>
              Удалить выбранные ({selectedServices.size})
            </button>
          )}
        </div>
      )}
      
      {filteredServices.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? '🔍 Услуги не найдены' : '📋 Нет добавленных услуг'}
        </div>
      ) : (
        <div className="services-list-items">
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              className={`service-item ${editingId === service.id ? 'editing' : ''}`}
            >
              <div className="service-checkbox">
                <input
                  type="checkbox"
                  checked={selectedServices.has(service.id)}
                  onChange={() => handleCheckboxChange(service.id)}
                />
              </div>
              <div className="service-info">
                <span className="service-name">
                  {highlightText(service.name, searchTerm)}
                </span>
                <span className="service-price">{service.price.toFixed(0)} ₽</span>
              </div>
              <div className="service-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(service)}
                >
                  Редактировать
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(service.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;