import { Select, Space, DatePicker } from 'antd'
import React from 'react'
import cl from './FiltersComponent.module.scss'

function FiltersComponent({onFilterChange}) {
    const { RangePicker } = DatePicker;
  return (
    <div className={cl.filtersComponent}>
        <div className={cl.filtersComponent__selects}>
            <Select
                defaultValue="Все" 
                style={{width: 120}}
                options={[ 
                    { value: 'Все', label: 'Все' }, 
                    { value: 'Доходы', label: 'Доходы' }, 
                    { value: 'Расходы', label: 'Расходы' }, 
                ]}
                onChange={(value) => onFilterChange('type', value)}
            />
            <Select 
                defaultValue="Важные" 
                style={{width: 120}}
                options={[ 
                    { value: 'Важные', label: 'Важные' }, 
                    { value: 'Обычные', label: 'Обычные' }, 
                    { value: 'Неважные', label: 'Неважные' }, 
                ]}
                onChange={(value) => onFilterChange('priority', value)}
            />
        </div>
        <Space direction="vertical" className={cl.filtersComponent__calendar}>
            <RangePicker 
                onChange={(dates) => onFilterChange('dateRange', dates)} 
                style={{width: 256}}
            />
        </Space>
    </div>
  )
}

export default FiltersComponent